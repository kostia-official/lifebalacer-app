import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { logsVar } from '../../reactiveState';
import { Console } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Component';

const DevTools: React.FC = () => {
  const logs = useReactiveVar(logsVar);

  return <Console logs={logs as Message[]} variant="dark" />;
};

export default DevTools;
