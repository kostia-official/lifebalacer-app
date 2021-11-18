import { ReactiveVar, makeVar } from '@apollo/client';
import { Message } from 'console-feed/lib/definitions/Console';

export const isSwipeHandlersEnabledVar: ReactiveVar<boolean> = makeVar<boolean>(true);

export const isShowAppUpdateDialogVar: ReactiveVar<boolean> = makeVar<boolean>(false);

export const isExpandedMenuVar: ReactiveVar<boolean> = makeVar<boolean>(true);

export const calendarActivityIdVar: ReactiveVar<string> = makeVar<string>('');

export const logsVar: ReactiveVar<Message[]> = makeVar<Message[]>([]);

export const isUploadingVar = makeVar(false);
