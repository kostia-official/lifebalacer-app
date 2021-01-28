import React, { useState, useCallback, useEffect, useMemo } from 'react';
import ObjectId from 'bson-objectid';
import {
  ActivityType,
  useCreateEntryMutation,
  refetchGetBalanceQuery,
  Entry,
  refetchGetEntriesByDayQuery,
  useGetEntriesByOneDayQuery,
  useUpdateEntryMutation,
  refetchGetDaysStatisticQuery,
  refetchGetActivitiesExtremesQuery
} from '../../generated/apollo';
import { useApolloError } from '../../hooks/useApolloError';
import * as R from 'remeda';
import _ from 'lodash';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CardModal } from '../../components/CardModal';
import { ActivityResult, SelectedEntry, EntriesResult, EntryResult } from '../../common/types';
import { EntryPickButton } from './EntryPickButton';
import { useActivities } from '../../hooks/useActivities';
import { DateTime } from 'luxon';
import { EntryModalContent } from './EntryModalContent';
import { getIsToday } from '../../helpers/date';
import { FabButton } from '../../components/FabButton';
import { useActivitiesByCategory } from '../../hooks/useActivitiesByCategory';
import { PageWrapper } from '../../components/PageWrapper';
import { useHistoryNavigation } from '../../hooks/useHistoryNavigation';
import { useOnEntryUpdate } from '../../hooks/useOnEntryUpdate';
import { useDeleteEntry } from '../../hooks/useDeleteEntry';
import { useOnActivityUpdate } from '../../hooks/useOnActivityUpdate';
import { DayHeader } from './DayHeader';

const CardStyled = styled(Card)`
  margin-bottom: 10px;
`;

const showDelay = 300;

const EntriesForm = () => {
  const [modalEntry, setModalEntry] = useState<SelectedEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isForceDescription, setIsForceDescription] = useState(false);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsForceDescription(false);
    setTimeout(() => setModalEntry(null), showDelay + 200);
  }, []);

  const openModal = useCallback((entry: SelectedEntry) => {
    setModalEntry(entry);
    setIsModalOpen(true);
  }, []);

  const params = useParams<{ date: string }>();
  const dayDate = params.date || DateTime.local().toISO();
  const endOfDay = DateTime.fromISO(dayDate).set({ hour: 23 }).toISO();

  const getCompletedAt = useCallback(
    () => (getIsToday(DateTime.fromISO(dayDate)) ? DateTime.local().toISO() : endOfDay),
    [dayDate, endOfDay]
  );

  const { errorMessage, errorTime, onError } = useApolloError();

  const { data: entriesData, refetch } = useGetEntriesByOneDayQuery({
    variables: { date: dayDate },
    onError
  });
  const entriesByDay = entriesData?.entriesByOneDay?.entries;
  const missingEntries = entriesData?.entriesByOneDay?.missing;

  useOnEntryUpdate([refetch]);
  useOnActivityUpdate([refetch]);

  const [selectedEntries, setSelectedEntries] = useState<EntriesResult>(entriesByDay || []);

  useEffect(() => {
    if (!_.isEmpty(entriesByDay)) {
      setSelectedEntries(entriesByDay!);
    }
  }, [entriesByDay]);

  const { activities, getActivityById } = useActivities({ onError });

  const getEntriesByActivityId = useCallback(
    (activityId: string) => {
      return selectedEntries?.filter((entry) => entry.activityId === activityId);
    },
    [selectedEntries]
  );
  const getMissingByActivityId = useCallback(
    (activityId: string) => {
      return missingEntries?.find((entry) => entry.activityId === activityId);
    },
    [missingEntries]
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
      refetchGetBalanceQuery(),
      refetchGetActivitiesExtremesQuery()
    ]
  };
  const [deleteEntryMutation] = useDeleteEntry(mutationOptions, { date: dayDate });
  const [createEntryMutation] = useCreateEntryMutation(mutationOptions);
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

      if (modalEntry) setModalEntry(entry);
      setSelectedEntries((prev) => [...prev, entry]);

      await createEntryMutation({ variables: { data: entry } });
    },
    [getEntriesByActivityId, getCompletedAt, modalEntry, createEntryMutation]
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
        activity.isWithDescription ||
        entry.description
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

  const onLongPress = useCallback(
    (entry?) => {
      setIsForceDescription(true);
      openModal(entry);
    },
    [openModal]
  );

  const upsertEntry = useCallback(
    async (data: Partial<EntryResult>) => {
      if (!modalEntry) return;

      const existingEntry = getEntryById(modalEntry._id);

      return existingEntry
        ? updateEntry(existingEntry._id, data)
        : createEntry(modalEntry.activityId, data);
    },
    [updateEntry, getEntryById, createEntry, modalEntry]
  );

  const onDeleteFromModal = useCallback(() => {
    if (!modalEntry) return;
    const existingEntry = getEntryById(modalEntry._id);

    closeModal();

    if (existingEntry) {
      return deleteEntry(existingEntry._id);
    }
  }, [getEntryById, deleteEntry, modalEntry, closeModal]);

  const { goBackCb } = useHistoryNavigation();

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
      <DayHeader day={entriesData?.entriesByOneDay} />

      <CardModal isShow={isModalOpen} onClose={closeModal} showDelay={showDelay}>
        <EntryModalContent
          onDelete={onDeleteFromModal}
          onDone={closeModal}
          onUpdate={upsertEntry}
          entry={modalEntry!}
          activity={modalActivity!}
          isForceDescription={isForceDescription}
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
                const isMissing = !!getMissingByActivityId(activity._id);

                if (_.isEmpty(entries)) {
                  return (
                    <EntryPickButton
                      activity={activity}
                      toggleSelection={toggleSelection}
                      onLongPress={onLongPress}
                      isShowBadge={isMissing}
                      badgeColor={getIsToday(dayDate) ? 'primary' : 'secondary'}
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
                      onLongPress={onLongPress}
                    />
                  );
                });
              })}
            </CardContent>
          </CardStyled>
        );
      })}

      <FabButton onClick={goBackCb()} icon="keyboard_return" />
    </PageWrapper>
  );
};

export default EntriesForm;
