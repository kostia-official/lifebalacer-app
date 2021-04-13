import { useGetDaysStatisticQuery } from '../generated/apollo';
import pluralize from 'pluralize';
import { OnErrorParams } from './useApolloError';
import { Emoji } from '../components/Emoji';
import styled from 'styled-components';

const EmojiWrapper = styled.span`
  span {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const useDaysStatisticText = ({ onError }: OnErrorParams = {}) => {
  const { data, loading: isStatisticLoading, refetch } = useGetDaysStatisticQuery({
    onError
  });
  const statistic = data?.daysStatistic;

  if (!statistic) return { statisticContent: 'Loading...', isStatisticLoading, refetch };

  const { streak, missing } = statistic;

  const statisticContent =
    statistic?.streak > 0 ? (
      <span>
        <EmojiWrapper>
          <Emoji>🔥</Emoji>
        </EmojiWrapper>
        Streak: {streak} {pluralize('day', streak)}
      </span>
    ) : (
      <span>
        <EmojiWrapper>
          <Emoji>💔</Emoji>
        </EmojiWrapper>
        Missing: {missing} {pluralize('day', missing)}
      </span>
    );

  return { statisticContent, isStatisticLoading, refetch };
};
