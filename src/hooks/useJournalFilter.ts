import createPersistedState from 'use-persisted-state';

const useActivitiesIdsState = createPersistedState('journalActivities');

export const useJournalFilter = () => {
  const [activitiesIds, setActivitiesIds] = useActivitiesIdsState<string[]>([]);

  return { activitiesIds, setActivitiesIds };
};
