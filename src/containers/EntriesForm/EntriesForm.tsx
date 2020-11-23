import React, { useState, useCallback, useEffect, useMemo } from 'react';
import ObjectId from 'bson-objectid';
import {
  ActivityType,
  useCreateEntryMutation,
  useDeleteEntryMutation,
  refetchGetBalanceQuery,
  Entry,
  refetchGetEntriesByDayQuery,
  useGetEntriesByOneDayQuery,
  useUpdateEntryMutation,
  refetchGetDaysStatisticQuery
} from '../../generated/apollo';
import { useApolloError } from '../../hooks/useApolloError';
import * as R from 'remeda';
import _ from 'lodash';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { CardModal } from '../../components/CardModal';
import { ActivityResult, SelectedEntry, EntriesResult, EntryResult } from '../../common/types';
import { EntryPickButton } from './EntryPickButton';
import { useActivities } from '../../hooks/useActivities';
import { DateTime } from 'luxon';
import { useDeviceDetect } from '../../hooks/useDeviceDetect';
import { EntryModalContent } from './EntryModalContent';
import { isSwipeHandlersEnabledVar } from '../../reactiveState';
import { isToday } from '../../helpers/date';
import { FabButton } from '../../components/FabButton';
import { useActivitiesByCategory } from '../../hooks/useActivitiesByCategory';
import { PageWrapper } from '../../components/PageWrapper';
import { useHistoryNavigation } from '../../hooks/useHistoryNavigation';
import { useOnEntryUpdate } from '../../hooks/useOnEntryUpdate';

const CardStyled = styled(Card)`
  margin-bottom: 10px;
`;

const DateTitleWrapper = styled.div<{ isCenter: boolean }>`
  ${(props) =>
    props.isCenter
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : ''}
`;

const showDelay = 300;

export const EntriesForm = () => {
  const { isMobile } = useDeviceDetect();
  const [modalEntry, setModalEntry] = useState<SelectedEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    isSwipeHandlersEnabledVar(true);
    setIsModalOpen(false);
    setTimeout(() => setModalEntry(null), showDelay + 200);
  }, []);

  const openModal = useCallback((entry: SelectedEntry) => {
    isSwipeHandlersEnabledVar(false);
    setModalEntry(entry);
    setIsModalOpen(true);
  }, []);

  const history = useHistory<{ isPush: boolean }>();

  const params = useParams<{ date: string }>();
  const dayDate = params.date || DateTime.local().toISO();
  const endOfDay = DateTime.fromISO(dayDate).set({ hour: 23 }).toISO();

  const getCompletedAt = useCallback(
    () => (isToday(DateTime.fromISO(dayDate)) ? DateTime.local().toISO() : endOfDay),
    [dayDate, endOfDay]
  );

  const { errorMessage, errorTime, onError } = useApolloError();

  const { data: entriesData, refetch } = useGetEntriesByOneDayQuery({
    variables: { date: dayDate },
    onError
  });
  const entriesByDay = entriesData?.entriesByOneDay?.entries;

  useOnEntryUpdate([refetch]);

  const [selectedEntries, setSelectedEntries] = useState<EntriesResult>(entriesByDay || []);

  useEffect(() => {
    if (!_.isEmpty(entriesByDay)) {
      setSelectedEntries(entriesByDay!);
    }
  }, [entriesByDay, history]);

  const { activities, getActivityById } = useActivities({ onError });

  const getEntriesByActivityId = useCallback(
    (activityId: string) => {
      return selectedEntries?.filter((entry) => entry.activityId === activityId);
    },
    [selectedEntries]
  );

  const getEntryById = useCallback(
    (_id: string) => {
      return selectedEntries?.find((entry) => entry._id === _id);
    },
    [selectedEntries]
  );

  const mutationOptions = {
    onError,
    refetchQueries: [
      refetchGetDaysStatisticQuery(),
      refetchGetEntriesByDayQuery(),
      refetchGetBalanceQuery()
    ]
  };
  const [createEntryMutation] = useCreateEntryMutation(mutationOptions);
  const [deleteEntryMutation] = useDeleteEntryMutation(mutationOptions);
  const [updateEntryMutation] = useUpdateEntryMutation(mutationOptions);

  const createEntry = useCallback(
    async (activityId: string, data = {}) => {
      if (!_.isEmpty(getEntriesByActivityId(activityId))) return;

      const entry: SelectedEntry = {
        _id: new ObjectId().toString(),
        activityId,
        completedAt: getCompletedAt(),
        ...data
      };

      setSelectedEntries((prev) => [...prev, entry]);
      await createEntryMutation({ variables: { data: entry } });
    },
    [getEntriesByActivityId, createEntryMutation, getCompletedAt]
  );

  const updateEntry = useCallback(
    async (entryId: string, toUpdate: Partial<Entry>) => {
      if (!getEntryById(entryId)) return;

      setSelectedEntries((prev) =>
        prev.map((entry) => {
          if (entry._id !== entryId) return entry;

          return { ...entry, ...toUpdate };
        })
      );
      await updateEntryMutation({ variables: { _id: entryId, data: toUpdate } });
    },
    [updateEntryMutation, getEntryById]
  );

  const deleteEntry = useCallback(
    async (entryId: string) => {
      if (!getEntryById(entryId)) return;

      setSelectedEntries((prev) => {
        return prev.filter((entry) => entry._id !== entryId);
      });
      await deleteEntryMutation({ variables: { _id: entryId } });
    },
    [deleteEntryMutation, getEntryById]
  );

  const selectEntry = useCallback(
    async (activity: ActivityResult) => {
      if (
        activity.valueType === ActivityType.Range ||
        activity.valueType === ActivityType.Value ||
        activity.isWithDescription
      ) {
        return openModal({
          _id: new ObjectId().toString(),
          completedAt: getCompletedAt(),
          activityId: activity._id
        });
      } else {
        return createEntry(activity._id);
      }
    },
    [createEntry, openModal, getCompletedAt]
  );

  const unselectEntry = useCallback(
    async (entry: SelectedEntry) => {
      const activity = getActivityById(entry.activityId);
      if (!activity) return;

      if (
        activity.valueType === ActivityType.Range ||
        activity.valueType === ActivityType.Value ||
        activity.isWidget ||
        activity.isWithDescription
      ) {
        return openModal(entry);
      } else {
        return deleteEntry(entry._id);
      }
    },
    [deleteEntry, getActivityById, openModal]
  );

  const toggleSelection = useCallback(
    (activity, entry?) => {
      return entry ? unselectEntry(entry) : selectEntry(activity);
    },
    [unselectEntry, selectEntry]
  );

  const upsertEntry = useCallback(
    async (data: Partial<EntryResult>) => {
      if (!modalEntry) return;

      const existingEntry = getEntryById(modalEntry._id);

      closeModal();

      return existingEntry
        ? updateEntry(existingEntry._id, data)
        : createEntry(modalEntry.activityId, data);
    },
    [updateEntry, closeModal, getEntryById, createEntry, modalEntry]
  );

  const onDeleteFromModal = useCallback(() => {
    if (!modalEntry) return;
    const existingEntry = getEntryById(modalEntry._id);

    closeModal();

    if (existingEntry) {
      return deleteEntry(existingEntry._id);
    }
  }, [getEntryById, deleteEntry, modalEntry, closeModal]);

  const { goBack } = useHistoryNavigation();
  const onDoneClick = goBack('/');

  const { activitiesByCategory } = useActivitiesByCategory({
    activities,
    entries: selectedEntries
  });

  const modalActivity = useMemo(
    () => R.find(activities || [], (activity) => activity._id === modalEntry?.activityId),
    [activities, modalEntry]
  );

  return (
    <PageWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={!activities}>
      <DateTitleWrapper isCenter={isMobile}>
        <Typography color="textSecondary" gutterBottom>
          {DateTime.fromISO(dayDate).toLocaleString(DateTime.DATE_HUGE)}
        </Typography>
      </DateTitleWrapper>

      <CardModal isShow={isModalOpen} onClose={closeModal} showDelay={showDelay}>
        <EntryModalContent
          onDelete={onDeleteFromModal}
          onSave={upsertEntry}
          entry={modalEntry!}
          activity={modalActivity!}
        />
      </CardModal>

      {activitiesByCategory.map(({ category, activities }) => {
        return (
          <CardStyled key={category}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {category}
              </Typography>

              {activities.map((activity) => {
                const entries = getEntriesByActivityId(activity._id);

                if (_.isEmpty(entries)) {
                  return (
                    <EntryPickButton
                      key={activity._id}
                      activity={activity}
                      toggleSelection={toggleSelection}
                    />
                  );
                }

                return entries?.map((entry) => {
                  return (
                    <EntryPickButton
                      key={entry._id}
                      entry={entry}
                      activity={activity}
                      toggleSelection={toggleSelection}
                    />
                  );
                });
              })}
            </CardContent>
          </CardStyled>
        );
      })}

      <FabButton onClick={onDoneClick} icon="save" />
    </PageWrapper>
  );
};
