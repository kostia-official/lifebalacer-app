import React, { useState, useCallback, useEffect, useMemo } from 'react';
import ObjectId from 'bson-objectid';
import {
  useGetActivitiesQuery,
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
import * as _ from 'remeda';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { CardModal } from '../components/CardModal';
import { EntryValueModalContent } from '../components/EntryValueModalContent';
import { ActivityResult } from '../types';

const CardStyled = styled(Card)`
  margin-bottom: 10px;
`;

const ButtonStyled = styled(Button)`
  height: 40px;
`;

const DoneButton = styled(Button)`
  width: 100%;
`;

type SelectedEntry = Pick<Entry, '_id' | 'activityId' | 'completedAt' | 'value'>;

export const EntriesForm = () => {
  const [modalEntry, setModalEntry] = useState<SelectedEntry | null>(null);

  const history = useHistory();
  const { date } = useParams();
  const completedAt = date || new Date().toISOString;

  const { errorMessage, errorTime, onError } = useApolloError();

  const { data: entriesData } = useGetEntriesByOneDayQuery({
    variables: { date: completedAt },
    onError
  });
  const entriesByDay = entriesData?.entriesByOneDay?.entries;

  const getSelectedEntriesFromEntriesByDay = useCallback(() => {
    if (!entriesByDay) return [];

    return entriesByDay.map(({ _id, value, completedAt, activity }) => {
      return { _id, value, completedAt, activityId: activity._id };
    });
  }, [entriesByDay]);

  const [selectedEntries, setSelectedEntries] = useState<SelectedEntry[]>(
    getSelectedEntriesFromEntriesByDay()
  );

  useEffect(() => {
    setSelectedEntries(getSelectedEntriesFromEntriesByDay());
  }, [getSelectedEntriesFromEntriesByDay]);

  const { data: getActivitiesData, loading: activitiesLoading } = useGetActivitiesQuery({
    onError
  });
  const activities = getActivitiesData?.activities || [];

  const getEntryByActivityId = useCallback(
    (activityId: string) => {
      return selectedEntries.find((entry) => entry.activityId === activityId);
    },
    [selectedEntries]
  );

  const mutationOptions = {
    onError,
    refetchQueries: [
      refetchGetDaysStatisticQuery(),
      refetchGetEntriesByDayQuery(),
      refetchGetEntriesByOneDayQuery({ date: completedAt }),
      refetchGetBalanceQuery()
    ]
  };
  const [createEntryMutation] = useCreateEntryMutation(mutationOptions);
  const [deleteEntryMutation] = useDeleteEntryMutation(mutationOptions);
  const [updateEntryMutation] = useUpdateEntryMutation(mutationOptions);

  const createEntry = useCallback(
    async (activityId: string, value?: Entry['value']) => {
      if (getEntryByActivityId(activityId)) return;

      const entry: SelectedEntry = {
        _id: new ObjectId().toString(),
        activityId,
        completedAt,
        value
      };

      setSelectedEntries((prev) => [...prev, entry]);
      await createEntryMutation({ variables: { data: entry } });
    },
    [getEntryByActivityId, completedAt, createEntryMutation]
  );

  const selectEntry = useCallback(
    async (activity: ActivityResult) => {
      switch (activity.valueType) {
        case ActivityType.Range:
        case ActivityType.Value: {
          return setModalEntry({
            _id: new ObjectId().toString(),
            completedAt,
            activityId: activity._id
          });
        }
        default: {
          await createEntry(activity._id);
        }
      }
    },
    [completedAt, createEntry]
  );

  const unselectEntry = useCallback(
    async (entry: SelectedEntry) => {
      if (entry.value) {
        return setModalEntry(entry);
      }

      const { _id } = entry;
      await deleteEntryMutation({ variables: { _id } });

      setSelectedEntries((prev) => {
        return prev.filter((entry) => entry._id !== _id);
      });
    },
    [deleteEntryMutation]
  );

  const closeModal = useCallback(() => {
    setModalEntry(null);
  }, []);

  const onValueSave = useCallback(
    async (value: number) => {
      if (!modalEntry) return;

      const existingEntry = selectedEntries.find((entry) => entry._id === modalEntry._id);

      if (existingEntry) {
        closeModal();

        return updateEntryMutation({
          variables: { _id: existingEntry._id, data: { value } }
        });
      }

      setModalEntry(null);
      await createEntry(modalEntry.activityId, value);
    },
    [updateEntryMutation, closeModal, selectedEntries, createEntry, modalEntry]
  );

  const onDeleteFromModal = useCallback(() => {
    if (!modalEntry) return;
    const existingEntry = selectedEntries.find((entry) => entry._id === modalEntry._id);

    if (!existingEntry) {
      return closeModal();
    }

    deleteEntryMutation({ variables: { _id: existingEntry._id } }).then();
    closeModal();
  }, [selectedEntries, deleteEntryMutation, modalEntry, closeModal]);

  const onDoneClick = useCallback(async () => {
    history.replace('/');
  }, [history]);

  const activitiesByCategory = useMemo(
    () => _.groupBy(activities, (activity) => activity.category),
    [activities]
  );
  const modalActivity = useMemo(
    () => _.find(activities, (activity) => activity._id === modalEntry?.activityId),
    [activities, modalEntry]
  );

  if (activitiesLoading) return <Spinner />;

  return (
    <div>
      <ErrorMessage errorMessage={errorMessage} errorTime={errorTime}/>

      <CardModal isShow={!!modalEntry} onClose={closeModal}>
        <EntryValueModalContent
          onDelete={onDeleteFromModal}
          onSave={onValueSave}
          value={modalEntry?.value}
          activity={modalActivity}
        />
      </CardModal>

      {Object.entries(activitiesByCategory).map(([category, activities]) => {
        return (
          <CardStyled key={category}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {category}
              </Typography>

              {activities.map((activity) => {
                const entry = getEntryByActivityId(activity._id);

                return (
                  <ButtonStyled
                    key={activity._id}
                    variant={entry ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => (entry ? unselectEntry(entry) : selectEntry(activity))}
                    startIcon={<Typography variant="h5">{activity.emoji}</Typography>}
                    disableRipple
                    disableElevation
                  >
                    {activity.name} {entry?.value && `(${entry.value})`}
                  </ButtonStyled>
                );
              })}
            </CardContent>
          </CardStyled>
        );
      })}

      <DoneButton variant="contained" color="primary" onClick={onDoneClick}>
        Done
      </DoneButton>
    </div>
  );
};
