import _ from 'lodash';
import { Activity, Entry } from '../generated/apollo';

export interface GetEntryLabelArgs {
  activity?: Pick<Activity, 'name' | 'emoji' | 'valueType' | 'isWithDescription' | 'isWidget'>;
  entry?: Pick<Entry, 'description' | 'value'>;
  isWithEmoji?: boolean;
}

export const getEntryLabel = ({ entry, activity, isWithEmoji = true }: GetEntryLabelArgs) => {
  const name = activity?.isWidget && entry?.description ? entry.description : activity?.name;

  const prefix = isWithEmoji ? `${activity?.emoji} ` : '';

  const value = _.isNumber(entry?.value) ? `: ${entry?.value}` : '';

  return prefix + name + value;
};
