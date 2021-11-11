import _ from 'lodash';
import { Activity, Entry } from '../generated/apollo';

export interface GetEntryLabelArgs {
  activity?: Pick<Activity, 'name' | 'emoji' | 'valueType' | 'isWithDescription' | 'isWidget'>;
  entry?: Pick<Entry, 'description' | 'value' | 'name'>;
}

export const getEntryLabel = ({ entry, activity }: GetEntryLabelArgs) => {
  const name = entry?.name || activity?.name;

  const value = _.isNumber(entry?.value) ? `: ${entry?.value}` : '';

  return name + value;
};
