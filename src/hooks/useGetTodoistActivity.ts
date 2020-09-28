import {
  ActivityType,
  useGetActivitiesQuery,
  GetActivitiesQuery,
  GetActivitiesQueryVariables
} from '../generated/apollo';
import * as Apollo from '@apollo/client';

export const useGetTodoistActivity = (
  baseOptions?: Apollo.QueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>
) => {
  const { data } = useGetActivitiesQuery(baseOptions);

  const todoistActivity = data?.activities?.find(
    (activity) => activity.valueType === ActivityType.Todoist
  );

  return { todoistActivity };
};
