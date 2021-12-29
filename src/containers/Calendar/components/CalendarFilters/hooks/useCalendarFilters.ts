import { makePersistFilters } from '../../../../../hooks/makePersistFilters';

export interface CalendarHighlightOptions {
  isHighlightWithDescription: boolean;
  isHighlightWithImage: boolean;
  isHighlightWithVideo: boolean;
}

export interface CalendarFilters extends CalendarHighlightOptions {
  activityId?: string;
}

export const useCalendarFilters = makePersistFilters<CalendarFilters>(
  'calendarFilters',
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
