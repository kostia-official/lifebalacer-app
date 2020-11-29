import { ReactiveVar, makeVar } from '@apollo/client';

export const isSwipeHandlersEnabledVar: ReactiveVar<boolean> = makeVar<boolean>(true);

export const isShowAppUpdateDialogVar: ReactiveVar<boolean> = makeVar<boolean>(false);

export const calendarActivityIdVar: ReactiveVar<string> = makeVar<string>('');

export const navigatorVar: ReactiveVar<Navigator | undefined> = makeVar<Navigator | undefined>(
  undefined
);
