import React, { useMemo } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { useApolloError } from '../../hooks/useApolloError';
import { Paper, Typography } from '@material-ui/core';
import { useGetActivitiesStatisticQuery } from '../../generated/apollo';
import { useActivities } from '../../hooks/useActivities';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Emoji } from '../../components/Emoji';
import { StreakText } from './StreakText';
import { pluralLabel } from '../../helpers/pluralarize';

const PaperStyled = styled(Paper)`
  padding: 15px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled(Typography)`
  padding-top: 12px;
`;

export const ActivityStatistic: React.FC = () => {
  const { errorMessage, onError, errorTime } = useApolloError();

  let { _id } = useParams<{ _id: string }>();

  const { getActivityById, activities } = useActivities({ onError });
  const { data: statisticData } = useGetActivitiesStatisticQuery({ onError });

  const statistic = useMemo(
    () => statisticData?.activitiesStatistic.find((stat) => stat._id === _id),
    [_id, statisticData?.activitiesStatistic]
  );

  const activity = useMemo(() => getActivityById(_id), [_id, getActivityById]);

  return (
    <PageWrapper
      errorMessage={errorMessage}
      errorTime={errorTime}
      isLoading={!statistic || !activities}
    >
      <PaperStyled>
        <TitleWrapper>
          <Typography variant="subtitle1">
            <Emoji>{activity?.emoji}</Emoji> {activity?.name}
          </Typography>

          <Typography variant="subtitle1">
            {pluralLabel('entry', statistic?.total)}, x{statistic?.perWeek} per week
          </Typography>
        </TitleWrapper>

        <Label variant="subtitle2">Streak with</Label>
        <StreakText streak={statistic?.streakWith!} />

        <Label variant="subtitle2">Streak without</Label>
        <StreakText streak={statistic?.streakWithout!} />
      </PaperStyled>
    </PageWrapper>
  );
};
