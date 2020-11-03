import { ReactiveVar, makeVar } from '@apollo/client';

export const isSwipeHandlersEnabledVar: ReactiveVar<boolean> = makeVar<boolean>(true);
