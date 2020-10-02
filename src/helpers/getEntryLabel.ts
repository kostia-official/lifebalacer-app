import _ from 'lodash';
import { Entry, Activity } from '../generated/apollo';

export interface GetEntryLabelParams {
  activity: Pick<Activity, 'name' | 'emoji'>;
  entry?: Pick<Entry, 'description' | 'value'>;
  isWithEmoji?: boolean;
}

export const getEntryLabel = ({ entry, activity, isWithEmoji = true }: GetEntryLabelParams) => {
  const name = entry?.description
    ? _.truncate(entry.description, {
        length: 30,
        separator: ' '
      })
    : activity?.name;

  const prefix = isWithEmoji ? `${activity?.emoji} ` : '';

  const value = entry?.value ? ` (${entry.value})` : '';

  return prefix + name + value;
};
