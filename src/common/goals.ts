import { ConditionType, DurationType } from '../generated/apollo';

export const conditionTypeTextMap: Record<ConditionType, string> = {
  [ConditionType.GreaterOrEqual]: '≥',
  [ConditionType.LessOrEqual]: '≤'
};

export const durationTypeTextMap: Record<DurationType, string> = {
  [DurationType.Week]: 'week',
  [DurationType.Month]: 'month'
};
