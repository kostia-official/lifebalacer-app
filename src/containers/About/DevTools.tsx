import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { logsVar } from '../../reactiveState';
import { Console } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Component';
import { ScreenWrapper } from '../App/ScreenWrapper';

const DevTools: React.FC = () => {
  const logs = useReactiveVar(logsVar);

  return (
    <ScreenWrapper>
      <Console logs={logs as Message[]} variant="dark" />
    </ScreenWrapper>
  );
};

export default DevTools;
