import React, { useEffect, Fragment } from 'react';
import { Hook, Unhook } from 'console-feed';
import { HookedConsole } from 'console-feed/lib/definitions/Console';
import { logsVar } from '../reactiveState';

export const LogsProvider: React.FC = ({ children }) => {
  useEffect(() => {
    Hook(window.console, (log) => logsVar([...logsVar(), log]), false);

    return () => {
      Unhook(window.console as HookedConsole);
    };
  }, []);

  return <Fragment>{children}</Fragment>;
};
