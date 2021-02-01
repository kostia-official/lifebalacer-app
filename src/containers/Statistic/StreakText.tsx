import React from 'react';
import { Streak } from '../../generated/apollo';
import { Typography } from '@material-ui/core';
import pluralize from 'pluralize';
import { toLuxon } from '../../helpers/date';
import { DateTime } from 'luxon';

export interface StreakProps {
  streak: Streak;
}

export const StreakText: React.FC<StreakProps> = ({ streak }) => {
  const formatDate = (date: string) => toLuxon(date).toLocaleString(DateTime.DATE_MED);

  const interval =
    streak.to && streak.from ? `, ${formatDate(streak.from)} - ${formatDate(streak.to)}` : '';

  return (
    <Typography variant="body2">
      {streak.count} {pluralize('day', streak.count)}
      {interval}
    </Typography>
  );
};
