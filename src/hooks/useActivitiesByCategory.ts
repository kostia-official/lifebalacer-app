import { ActivityResult, SelectedEntry } from '../common/types';
import { useMemo, useCallback } from 'react';
import { ActivityType, ActivityCategory } from '../generated/apollo';
import _ from 'lodash';

export interface HookParams {
  activities?: ActivityResult[];
  entries?: SelectedEntry[];
}

export const TODOIST_CATEGORY = 'Todoist tasks';
export const ARCHIVED_CATEGORY = 'Archived';

export const ActivityCategoryOrder: {
  [key: string]: number;
} = {
  [ActivityCategory.Negative]: 1,
  [ActivityCategory.Neutral]: 2,
  [ActivityCategory.Positive]: 3,
  [TODOIST_CATEGORY]: 4,
  [ARCHIVED_CATEGORY]: 5
};

export type ActivityByCategory = {
  category: string;
  activities: ActivityResult[];
};

export const useActivitiesByCategory = ({ activities = [], entries = [] }: HookParams) => {
  const getIsWithEntries = useCallback(
    (activityId) => {
      return !_.isEmpty(_.filter(entries, { activityId }));
    },
    [entries]
  );

  const activitiesByCategory: ActivityByCategory[] = useMemo(
    () =>
      _.chain(activities)
        .filter((activity) => {
          const isWidgetWithoutEntries = activity.isWidget && !getIsWithEntries(activity._id);

          return !isWidgetWithoutEntries;
        })
        .groupBy((activity) => {
          if (activity.isArchived) return ARCHIVED_CATEGORY;
          if (activity.valueType === ActivityType.Todoist) return TODOIST_CATEGORY;

          return activity.category;
        })
        .map((activities, category) => ({ category, activities }))
        .sortBy(({ category }) => ActivityCategoryOrder[category])
        .value(),
    [activities, getIsWithEntries]
  );

  return { activitiesByCategory };
};
