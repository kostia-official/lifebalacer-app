import { ActivityResult } from '../common/types';
import { useMemo } from 'react';
import { ActivityType, ActivityCategory } from '../generated/apollo';
import _ from 'lodash';

export interface HookParams {
  activities?: ActivityResult[];
}

const TODOIST_CATEGORY = 'Todoist items';

export const ActivityCategoryOrder: {
  [key: string]: number;
} = {
  [ActivityCategory.Neutral]: 1,
  [ActivityCategory.Positive]: 2,
  [ActivityCategory.Negative]: 3,
  [TODOIST_CATEGORY]: 4
};

export type ActivityByCategory = {
  category: string;
  activities: ActivityResult[];
};

export const useActivitiesByCategory = ({ activities = [] }: HookParams) => {
  const activitiesByCategory: ActivityByCategory[] = useMemo(
    () =>
      _.chain(activities)
        .groupBy((activity) =>
          activity.valueType === ActivityType.Todoist ? TODOIST_CATEGORY : activity.category
        )
        .map((activities, category) => ({ category, activities }))
        .sortBy(({ category }) => ActivityCategoryOrder[category])
        .value(),
    [activities]
  );

  return { activitiesByCategory };
};
