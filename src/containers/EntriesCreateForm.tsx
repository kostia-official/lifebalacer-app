import React, { useState, useCallback, useEffect } from 'react';
import ObjectId from 'bson-objectid';
import {
  useGetActivitiesQuery,
  ActivityType,
  useCreateEntryMutation,
  useDeleteEntryMutation,
  refetchGetBalanceQuery,
  Entry,
  GetActivitiesQuery,
  refetchGetEntriesByDayQuery,
  useGetEntriesByOneDayQuery
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

type ActivityResult = GetActivitiesQuery['activities'][0];

export const EntriesCreateForm = () => {
  const [activityIdForModal, setActivityIdForModal] = useState<string | null>(null);

  const history = useHistory();
  const { date } = useParams();
  const completedAt = date || new Date().toISOString;

  const { errorMessage, onError } = useApolloError();

  const { data: entriesData } = useGetEntriesByOneDayQuery({
    variables: { date: completedAt },
    onError
  });
  const entriesByDay = entriesData?.entriesByOneDay?.entries || [];

  const getSelectedEntriesFromEntriesByDay = useCallback(() => {
    return entriesByDay.map(({ _id, value, completedAt, activity }) => {
      return { _id, value, completedAt, activityId: activity._id };
    });
  }, [entriesByDay]);

  const [selectedEntries, setSelectedEntries] = useState<SelectedEntry[]>(
    getSelectedEntriesFromEntriesByDay()
  );

  useEffect(() => {
    setSelectedEntries(getSelectedEntriesFromEntriesByDay())
  }, [entriesByDay, setSelectedEntries, getSelectedEntriesFromEntriesByDay]);

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
    refetchQueries: [refetchGetEntriesByDayQuery(), refetchGetBalanceQuery()]
  };
  const [createEntryMutation] = useCreateEntryMutation(mutationOptions);
  const [deleteEntryMutation] = useDeleteEntryMutation(mutationOptions);

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

  const isSelectedEntry = useCallback(
    (activityId: string) => {
      return selectedEntries.map(({ activityId }) => activityId).includes(activityId);
    },
    [selectedEntries]
  );

  const selectEntry = useCallback(
    async (activity: ActivityResult) => {
      if (isSelectedEntry(activity._id)) {
        const entry = getEntryByActivityId(activity._id);
        if (!entry?._id) return;

        await deleteEntryMutation({ variables: { _id: entry._id } });

        setSelectedEntries((prev) => {
          return prev.filter((entry) => entry.activityId !== activity._id);
        });
      } else {
        switch (activity.valueType) {
          case ActivityType.Value: {
            return setActivityIdForModal(activity._id);
          }
          default: {
            await createEntry(activity._id);
          }
        }
      }
    },
    [isSelectedEntry, deleteEntryMutation, createEntry, getEntryByActivityId]
  );

  const onValueSave = useCallback(
    async (value: number) => {
      if (!activityIdForModal) return;

      await createEntry(activityIdForModal, value);
      setActivityIdForModal(null);
    },
    [createEntry, activityIdForModal]
  );

  const onCloseModal = useCallback(() => {
    setActivityIdForModal(null);
  }, []);

  const onDoneClick = useCallback(async () => {
    history.replace('/');
  }, [history]);

  const activitiesByCategory = _.groupBy(activities, (activity) => activity.category);

  if (activitiesLoading) return <Spinner />;

  return (
    <div>
      <ErrorMessage errorMessage={errorMessage} />

      <CardModal isShow={!!activityIdForModal} onClose={onCloseModal}>
        <EntryValueModalContent onSave={onValueSave} />
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
                    variant={isSelectedEntry(activity._id) ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => selectEntry(activity)}
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
