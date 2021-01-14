import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { DateTime } from 'luxon';

const lastUpdateAt = process.env.REACT_APP_UPDATED_AT || new Date().toISOString();

export const LastUpdatedAt: React.FC = () => {
  if (!lastUpdateAt) return <Fragment />;

  return (
    <Typography gutterBottom variant="body2">
      {`Last update: ${DateTime.fromISO(lastUpdateAt).toLocaleString(DateTime.DATETIME_MED)}`}
    </Typography>
  );
};
