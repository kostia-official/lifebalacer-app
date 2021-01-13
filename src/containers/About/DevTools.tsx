import React from 'react';
import { Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import { useReactiveVar } from '@apollo/client';
import { logsVar } from '../../reactiveState';
import { Console } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Component';

const lastUpdateAt = process.env.REACT_APP_UPDATED_AT || new Date().toISOString();

export const DevTools: React.FC = () => {
  const logs = useReactiveVar(logsVar);

  return (
    <div>
      {lastUpdateAt && (
        <Typography gutterBottom variant="body2">
          {`Last update: ${DateTime.fromISO(lastUpdateAt).toLocaleString(DateTime.DATETIME_MED)}`}
        </Typography>
      )}

      <Console logs={logs as Message[]} variant="dark" />
    </div>
  );
};
