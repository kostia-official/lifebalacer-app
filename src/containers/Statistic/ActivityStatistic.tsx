import React, { Fragment, useMemo } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { useApolloError } from '../../hooks/useApolloError';
import { Grid, Paper, Typography, SvgIcon, Icon } from '@material-ui/core';
import { useGetActivitiesStatisticQuery, ActivityType } from '../../generated/apollo';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Emoji } from '../../components/Emoji';
import { StreakBlock } from './StreakBlock';
import { DateRange } from '@material-ui/icons';
import { ReactComponent as AverageIcon } from '../../assets/average.svg';
import { ReactComponent as MedianIcon } from '../../assets/median.svg';
import { ValueBlock } from './ValueBlock';
import { WeekdayChart } from './WeekdayChart';
import { useDisableMenuSwapOpen } from '../../hooks/useDisableMenuSwapOpen';
import { EmptyBlock } from '../../components/EmptyBlock';
import { EntryPerDateChart } from './EntryPerDateChart';
import { CountPerValueChart } from './CountPerValueChart';

const TitlePaper = styled(Paper)`
  padding: 7px 15px;
  margin-bottom: 8px;
`;

const StatBlockPaper = styled(Paper)`
  padding: 15px;
  margin-bottom: 8px;
`;

const ChartPaper = styled(Paper)`
  padding: 15px;
`;

const AverageSvgIconStyled = styled(SvgIcon)`
  margin-left: 3px;
`;

const MedianSvgIconStyled = styled(SvgIcon)`
  font-size: 26px;
`;

const ActivityStatistic: React.FC = React.memo(() => {
  useDisableMenuSwapOpen();

  const { errorMessage, onError, errorTime } = useApolloError();

  let { _id } = useParams<{ _id: string }>();

  const { data } = useGetActivitiesStatisticQuery({ onError, fetchPolicy: 'cache-first' });

  const statistic = useMemo(() => {
    return data?.activitiesStatistic.find((stat) => stat._id === _id);
  }, [_id, data?.activitiesStatistic]);

  const isWithValue = statistic?.activity?.valueType !== ActivityType.Simple;

  const valueBlockGridXs = 6;
  const valueBlockGridSm = 3;

  const chartsGridXs = 12;
  const chartsGridSm = isWithValue ? 6 : 12;

  return (
    <PageWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={!statistic}>
      <TitlePaper>
        <Typography variant="subtitle1">
          <Emoji>{statistic?.activity?.emoji}</Emoji> {statistic?.activity?.name}
        </Typography>
      </TitlePaper>

      <StatBlockPaper>
        <Grid container spacing={1} justify="space-around">
          <Grid item xs={valueBlockGridXs} sm={valueBlockGridSm}>
            <ValueBlock
              value={statistic?.total}
              text="Total entries"
              icon={<Icon>receipt_long</Icon>}
            />
          </Grid>

          <Grid item xs={valueBlockGridXs} sm={valueBlockGridSm}>
            <ValueBlock value={`x${statistic?.perWeek}`} text="Per week" icon={<DateRange />} />
          </Grid>

          {isWithValue && (
            <Fragment>
              <Grid item xs={valueBlockGridXs} sm={valueBlockGridSm}>
                <ValueBlock
                  value={statistic?.averageValue}
                  text="Average value"
                  icon={<AverageSvgIconStyled>{<AverageIcon />}</AverageSvgIconStyled>}
                />
              </Grid>

              <Grid item xs={valueBlockGridXs} sm={valueBlockGridSm}>
                <ValueBlock
                  value={statistic?.medianValue}
                  text="Median value"
                  icon={
                    <MedianSvgIconStyled>
                      <MedianIcon />
                    </MedianSvgIconStyled>
                  }
                />
              </Grid>
            </Fragment>
          )}
        </Grid>
      </StatBlockPaper>

      <StatBlockPaper>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <StreakBlock
              text={`Streak with activity`}
              streak={statistic?.streakWith!}
              isWithActivity={true}
            />
          </Grid>

          <Grid item xs={6}>
            <StreakBlock
              text={`Streak without activity`}
              streak={statistic?.streakWithout!}
              isWithActivity={false}
            />
          </Grid>
        </Grid>
      </StatBlockPaper>

      <ChartPaper>
        {statistic?.entriesPerDateGroup && (
          <EntryPerDateChart data={statistic?.entriesPerDateGroup} isWithValue={isWithValue} />
        )}
      </ChartPaper>

      <EmptyBlock height={8} />

      <Grid container spacing={1}>
        <Grid item xs={chartsGridXs} sm={chartsGridSm}>
          <ChartPaper>
            {statistic?.weekdays && (
              <WeekdayChart data={statistic.weekdays} isWithValue={isWithValue} />
            )}
          </ChartPaper>
        </Grid>

        {isWithValue && (
          <Grid item xs={chartsGridXs} sm={chartsGridSm}>
            <ChartPaper>
              {statistic?.countPerValue && (
                <CountPerValueChart
                  data={statistic.countPerValue}
                  isReverseColors={statistic.activity.isReverseColors}
                />
              )}
            </ChartPaper>
          </Grid>
        )}
      </Grid>
    </PageWrapper>
  );
});

export default ActivityStatistic;
