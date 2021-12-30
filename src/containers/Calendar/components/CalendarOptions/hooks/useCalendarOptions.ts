import { makePersistOptions } from '../../../../../hooks/makePersistOptions';

export interface CalendarHighlightOptionsData {
  isHighlightWithDescription: boolean;
  isHighlightWithImage: boolean;
  isHighlightWithVideo: boolean;
}

export interface CalendarOptionsData extends CalendarHighlightOptionsData {
  activityId?: string;
}

export const useCalendarOptions = makePersistOptions<CalendarOptionsData>(
  'calendarOptions',
  {
    activityId: undefined,
    isHighlightWithDescription: true,
    isHighlightWithImage: true,
    isHighlightWithVideo: true
  },
  {
    ignoreCountIncrementFields: [
      'isHighlightWithImage',
      'isHighlightWithVideo',
      'isHighlightWithDescription'
    ]
  }
);
