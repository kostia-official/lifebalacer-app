import { EntryResult } from '../common/types';
import * as R from 'remeda';

export interface HookProps {
  entries: EntryResult[];
  todoistActivityId?: string;
}

export const groupTodoistEntries = ({ entries, todoistActivityId }: HookProps) => {
  const { todoistEntries = [], regularEntries = [] } = R.groupBy(entries, (entry) => {
    return entry.activity._id === todoistActivityId ? 'todoistEntries' : 'regularEntries';
  });

  const todoistGroup = todoistEntries?.reduce<EntryResult>((acc, item) => {
    return {
      ...acc,
      ...item,
      value: (acc.value ?? 0) + (item.value ?? 0),
      description: 'Todoist tasks'
    };
  }, {} as EntryResult);

  return {
    regularEntries,
    todoistEntries,
    todoistGroup,
    entriesWithTodoistGroup: todoistGroup ? [...regularEntries, todoistGroup] : regularEntries
  };
};
