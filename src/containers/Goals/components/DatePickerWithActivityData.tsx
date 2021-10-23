import React, { useMemo } from 'react';
import { DatePickerProps } from '@material-ui/pickers/DatePicker/DatePicker';
import { DatePicker } from '@material-ui/pickers';
import { useDatePickerRenderDayExtremes } from '../../../hooks/apollo/useDatePickerRenderDayExtremes';
import { useGetActivitiesExtremesQuery } from '../../../generated/apollo';

export interface DatePickerWithActivityDataProps extends DatePickerProps {
  activityId?: string;
}

export const DatePickerWithActivityData: React.FC<DatePickerWithActivityDataProps> = ({
  activityId,
  ...datePickerProps
}) => {
  const { data } = useGetActivitiesExtremesQuery();
  const activitiesExtremes = data?.activitiesExtremes;

  const selectedActivityExtremes = useMemo(() => {
    return activitiesExtremes?.find(({ _id }) => _id === activityId);
  }, [activitiesExtremes, activityId]);

  const { renderDay } = useDatePickerRenderDayExtremes({ selectedActivityExtremes });

  return <DatePicker renderDay={renderDay} {...datePickerProps} />;
};
