import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DateTime } from 'luxon';

export const formatDateLabel = (dateArg: MaterialUiPickersDate) => {
  const date = dateArg || DateTime.local();
  return date.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
};
