import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { logsVar } from '../../reactiveState';
import { Console } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Component';
import { PageWrapper } from '../../components/PageWrapper';

const DevTools: React.FC = () => {
  const logs = useReactiveVar(logsVar);

  return (
    <PageWrapper>
      <Console logs={logs as Message[]} variant="dark" />
    </PageWrapper>
  );
};

export default DevTools;
