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
  refetchGetEntriesByOneDayQuery,
  refetchGetDaysStatisticQuery
} from '../generated/apollo';
import { useApolloError } from '../hooks/useApolloError';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import * as R from 'remeda';
import _ from 'lodash';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { CardModal } from '../components/CardModal';
import { ActivityResult, SelectedEntry, EntriesResult } from '../common/types';
import { EntryPickButton } from '../components/EntryPickButton';
import { useActivities } from '../hooks/useActivities';
import { DateTime } from 'luxon';
import { useDeviceDetect } from '../hooks/useDeviceDetect';
import { EntryValueModalContent } from '../components/EntryValueModalContent/EntryValueModalContent';
import { isSwipeHandlersEnabledVar } from '../reactiveState';
import { isToday } from '../helpers/date';
import { FabButton } from '../components/FabButton';
import { useActivitiesByCategory } from '../hooks/useActivitiesByCategory';

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

export const EntriesForm = () => {
  const { isMobile } = useDeviceDetect();
  const [modalEntry, setModalEntry] = useState<SelectedEntry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showDelay = 300;

  const closeModal = useCallback(() => {
    isSwipeHandlersEnabledVar(true);
    setIsModalOpen(false);
    setTimeout(() => setModalEntry(null), showDelay);
  }, []);

  const openModal = useCallback((entry: SelectedEntry) => {
    isSwipeHandlersEnabledVar(false);
    setModalEntry(entry);
    setIsModalOpen(true);
  }, []);

  const history = useHistory<{ isPush: boolean }>();

  const params = useParams<{ date: string }>();
  const dayDate = params.date || DateTime.local().toISODate();

  const getCompletedAt = useCallback(
    () => (isToday(DateTime.fromISO(dayDate)) ? DateTime.local().toISO() : dayDate),
    [dayDate]
  );

  const { errorMessage, errorTime, onError } = useApolloError();

  const { data: entriesData } = useGetEntriesByOneDayQuery({
    variables: { date: dayDate },
    onError
  });
  const entriesByDay = entriesData?.entriesByOneDay?.entries;

  const [selectedEntries, setSelectedEntries] = useState<EntriesResult>(entriesByDay || []);

  useEffect(() => {
    if (!_.isEmpty(entriesByDay)) {
      const isPush = history.location.state?.isPush;

      setSelectedEntries((prev) => {
        // if it's push data can be updated
        if (isPush) return entriesByDay!;

        // set data for the first time
        if (_.isEmpty(prev)) return entriesByDay!;

        return prev;
      });
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
      refetchGetEntriesByOneDayQuery({ date: dayDate }),
      refetchGetBalanceQuery()
    ]
  };
  const [createEntryMutation] = useCreateEntryMutation(mutationOptions);
  const [deleteEntryMutation] = useDeleteEntryMutation(mutationOptions);
  const [updateEntryMutation] = useUpdateEntryMutation(mutationOptions);

  const createEntry = useCallback(
    async (activityId: string, value?: Entry['value']) => {
      if (!_.isEmpty(getEntriesByActivityId(activityId))) return;

      const entry: SelectedEntry = {
        _id: new ObjectId().toString(),
        activityId,
        completedAt: getCompletedAt(),
        value
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
      switch (activity.valueType) {
        case ActivityType.Range:
        case ActivityType.Value: {
          return openModal({
            _id: new ObjectId().toString(),
            completedAt: getCompletedAt(),
            activityId: activity._id
          });
        }
        default: {
          await createEntry(activity._id);
        }
      }
    },
    [createEntry, openModal, getCompletedAt]
  );

  const unselectEntry = useCallback(
    async (entry: SelectedEntry) => {
      const activity = getActivityById(entry.activityId);
      if (!activity) return;

      switch (activity.valueType) {
        case ActivityType.Todoist:
        case ActivityType.Range:
        case ActivityType.Value: {
          return openModal(entry);
        }
        default: {
          return deleteEntry(entry._id);
        }
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

  const onValueSave = useCallback(
    async (value: number) => {
      if (!modalEntry) return;

      const existingEntry = getEntryById(modalEntry._id);

      closeModal();

      return existingEntry
        ? updateEntry(existingEntry._id, { value })
        : createEntry(modalEntry.activityId, value);
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

  const onDoneClick = useCallback(async () => {
    history.replace('/');
  }, [history]);

  const { activitiesByCategory } = useActivitiesByCategory({ activities });

  const modalActivity = useMemo(
    () => R.find(activities || [], (activity) => activity._id === modalEntry?.activityId),
    [activities, modalEntry]
  );

  if (!activities) return <Spinner />;

  return (
    <div>
      <ErrorMessage errorMessage={errorMessage} errorTime={errorTime} />

      <DateTitleWrapper isCenter={isMobile}>
        <Typography color="textSecondary" gutterBottom>
          {DateTime.fromISO(dayDate).toLocaleString(DateTime.DATE_HUGE)}
        </Typography>
      </DateTitleWrapper>

      <CardModal isShow={isModalOpen} onClose={closeModal} showDelay={showDelay}>
        <EntryValueModalContent
          onDelete={onDeleteFromModal}
          onSave={onValueSave}
          value={modalEntry?.value}
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
    </div>
  );
};
