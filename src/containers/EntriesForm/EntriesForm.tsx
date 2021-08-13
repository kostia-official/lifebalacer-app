import React, { useState, useCallback, useEffect, useMemo } from 'react';
import ObjectId from 'bson-objectid';
import {
  ActivityType,
  useCreateEntryMutation,
  refetchGetBalanceQuery,
  refetchGetEntriesByDayQuery,
  useGetEntriesByOneDayQuery,
  useUpdateEntryMutation,
  refetchGetDaysStatisticQuery,
  refetchGetActivitiesExtremesQuery
} from '../../generated/apollo';
import { useApolloError } from '../../hooks/useApolloError';
import * as R from 'remeda';
import _ from 'lodash';
import { Card } from '@material-ui/core';
import styled from 'styled-components';
import { CardModal } from '../../components/CardModal';
import { ActivityResult, SelectedEntry, EntryResult } from '../../common/types';
import { EntryPickButton } from './EntryPickButton';
import { useActivities } from '../../hooks/useActivities';
import { DateTime } from 'luxon';
import { EntryModalContent } from './EntryModalContent';
import { getIsToday } from '../../helpers/date';
import { FabButton } from '../../components/FabButton';
import { useActivitiesByCategory, ARCHIVED_CATEGORY } from '../../hooks/useActivitiesByCategory';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { useDeleteEntry } from '../../hooks/useDeleteEntry';
import { useOnActivityUpdate } from '../../hooks/useOnActivityUpdate';
import { DayHeader } from './DayHeader';
import { calcPoints } from '../../helpers/calcPoints';
import { ExpandableCard } from '../../components/ExpandableCard';
import { useRoute, RouteProp } from '@react-navigation/native';
import { NavigationParams } from '../App/App';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { FabWrapper } from '../../components/FabWrapper';
import { useDeleteFieldFromCache } from '../../hooks/useDeleteFieldFromCache';

const CategoryWrapper = styled(Card)`
  margin-bottom: 8px;
`;

const showDelay = 300;

const EntriesForm = () => {
  const { goBackCb } = useNavigationHelpers();

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

  const { params } = useRoute<RouteProp<NavigationParams, 'EntriesForm'>>();

  const dayDate = params.date ? new Date(params.date).toISOString() : DateTime.local().toISO();
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

  // useOnEntryUpdate([refetch]);
  useOnActivityUpdate([refetch]);

  const [selectedEntries, setSelectedEntries] = useState<SelectedEntry[]>(entriesByDay || []);

  useEffect(() => {
    if (!_.isEmpty(entriesByDay)) {
      setSelectedEntries(entriesByDay!);
    }
  }, [entriesByDay]);

  const { allActivities, getActivityById } = useActivities({ onError });

  const { activitiesByCategory } = useActivitiesByCategory({
    activities: allActivities,
    entries: selectedEntries
  });

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

  const deleteField = useDeleteFieldFromCache();

  const mutationOptions = {
    onError,
    onCompleted() {
      deleteField('journal');
    },
    refetchQueries: [
      refetchGetDaysStatisticQuery(),
      refetchGetEntriesByDayQuery(),
      refetchGetBalanceQuery(),
      refetchGetActivitiesExtremesQuery()
    ]
  };
  const [deleteEntryMutation] = useDeleteEntry(mutationOptions);
  const [createEntryMutation] = useCreateEntryMutation(mutationOptions);
  const [updateEntryMutation] = useUpdateEntryMutation(mutationOptions);

  const createEntry = useCallback(
    async (activityId: string, data = {}) => {
      if (!_.isEmpty(getEntriesByActivityId(activityId))) return;

      const activity = getActivityById(activityId)!;

      const entry: SelectedEntry = {
        _id: new ObjectId().toString(),
        activityId,
        completedAt: getCompletedAt(),
        ...data
      };

      const points = calcPoints(activity, data.value);

      if (modalEntry) setModalEntry(entry);
      setSelectedEntries((prev) => [...prev, { ...entry, points }]);

      await createEntryMutation({ variables: { data: entry } });
    },
    [getEntriesByActivityId, getActivityById, getCompletedAt, modalEntry, createEntryMutation]
  );

  const updateEntry = useCallback(
    async (entryId: string, toUpdate: Partial<SelectedEntry>) => {
      const entry = getEntryById(entryId);
      if (!entry) return;

      const activity = getActivityById(entry.activityId)!;
      const points = calcPoints(activity, toUpdate?.value);

      setSelectedEntries((prev) =>
        prev.map((entry) => {
          if (entry._id !== entryId) return entry;

          return { ...entry, ...toUpdate, points };
        })
      );
      await updateEntryMutation({ variables: { _id: entryId, data: toUpdate } });
    },
    [getEntryById, getActivityById, updateEntryMutation]
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
          activityId: activity._id,
          points: activity.points
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

  const modalActivity = useMemo(
    () => R.find(allActivities || [], (activity) => activity._id === modalEntry?.activityId),
    [allActivities, modalEntry]
  );

  return useMemo(() => {
    return (
      <ScreenWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={!allActivities}>
        <DayHeader date={dayDate} />

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
            <CategoryWrapper key={category}>
              <ExpandableCard title={category} defaultExpanded={category !== ARCHIVED_CATEGORY}>
                {activities.map((activity) => {
                  const entries = getEntriesByActivityId(activity._id);
                  const isMissing = !!getMissingByActivityId(activity._id);

                  if (_.isEmpty(entries)) {
                    return (
                      <EntryPickButton
                        key={activity._id}
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
              </ExpandableCard>
            </CategoryWrapper>
          );
        })}

        <FabWrapper hideOnKeyboardOpen>
          <FabButton onClick={goBackCb('EntriesByDay')} icon="keyboard_return" />
        </FabWrapper>
      </ScreenWrapper>
    );
  }, [
    activitiesByCategory,
    allActivities,
    closeModal,
    dayDate,
    errorMessage,
    errorTime,
    getEntriesByActivityId,
    getMissingByActivityId,
    goBackCb,
    isForceDescription,
    isModalOpen,
    modalActivity,
    modalEntry,
    onDeleteFromModal,
    onLongPress,
    toggleSelection,
    upsertEntry
  ]);
};

export default EntriesForm;
