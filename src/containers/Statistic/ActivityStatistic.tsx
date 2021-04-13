import 'devextreme/dist/css/dx.material.teal.dark.css';

import React, { Fragment, useCallback, useState, useMemo } from 'react';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { useApolloError } from '../../hooks/useApolloError';
import { Grid, Paper, Typography, SvgIcon, Icon } from '@material-ui/core';
import { ActivityType } from '../../generated/apollo';
import styled from 'styled-components';
import { Emoji } from '../../components/Emoji';
import { StreakBlock } from './StreakBlock';
import { DateRange } from '@material-ui/icons';
import { ReactComponent as AverageIcon } from '../../assets/average.svg';
import { ReactComponent as MedianIcon } from '../../assets/median.svg';
import { ValueBlock } from './ValueBlock';
import { WeekdayChart } from './WeekdayChart';
import { EmptyBlock } from '../../components/EmptyBlock';
import { EntryPerDateChart } from './EntryPerDateChart';
import { CountPerValueChart } from './CountPerValueChart';
import { RangeDatePicker, RangeDatePickerProps } from '../../components/RangeDatePicker';
import { useActivityAdvancedStatistic } from '../../hooks/useActivityAdvancedStatistic';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NavigationParams } from '../App/App';

const TitlePaper = styled(Paper)`
  padding: 7px 14px 7px 18px;
  margin-bottom: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StatBlockPaper = styled(Paper)`
  padding: 12px 15px;
  margin-bottom: 8px;
`;

const StreakBlockPaper = styled(Paper)`
  padding: 18px 15px;
  margin-bottom: 8px;
`;

const ChartPaper = styled(Paper)`
  padding: 8px 15px;
`;

const AverageSvgIconStyled = styled(SvgIcon)`
  margin-left: 3px;
`;

const MedianSvgIconStyled = styled(SvgIcon)`
  font-size: 26px;
`;

const ActivityStatistic: React.FC = () => {
  const { errorMessage, onError, errorTime } = useApolloError();

  let route = useRoute<RouteProp<NavigationParams, 'ActivityStatistic'>>();
  const id = route.params.id;

  const [dateAfter, setDateAfter] = useState<string | undefined>();
  const [dateBefore, setDateBefore] = useState<string | undefined>();

  const { statistic, isUpdating } = useActivityAdvancedStatistic({
    onError,
    variables: { activityId: id, dateAfter, dateBefore }
  });

  const isWithValue = statistic?.activity?.valueType !== ActivityType.Simple;

  const valueBlockGridXs = 6;
  const valueBlockGridSm = 3;

  const chartsGridXs = 12;
  const chartsGridSm = isWithValue ? 6 : 12;

  const onDateRangeChange: RangeDatePickerProps['onChange'] = useCallback(async (dateRange) => {
    setDateAfter(dateRange.dateAfter?.toISO());
    setDateBefore(dateRange.dateBefore?.toISO());
  }, []);

  return useMemo(() => {
    return (
      <ScreenWrapper errorMessage={errorMessage} errorTime={errorTime} isLoading={!statistic}>
        <TitlePaper>
          <Typography variant="subtitle1">
            <Emoji>{statistic?.activity?.emoji}</Emoji>
            {statistic?.activity?.name}
          </Typography>

          <RangeDatePicker onChange={onDateRangeChange} isLoading={isUpdating} />
        </TitlePaper>

        <StatBlockPaper>
          <Grid container spacing={1} justify="space-around">
            <Grid item xs={valueBlockGridXs} sm={valueBlockGridSm}>
              <ValueBlock
                value={statistic?.total}
                text="Entries count"
                icon={<Icon>receipt_long</Icon>}
              />
            </Grid>

            <Grid item xs={valueBlockGridXs} sm={valueBlockGridSm}>
              <ValueBlock
                value={statistic?.perWeek === null ? '—' : `x${statistic?.perWeek}`}
                text="Per week"
                icon={<DateRange />}
              />
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

        <StreakBlockPaper>
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
        </StreakBlockPaper>

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
      </ScreenWrapper>
    );
  }, [
    chartsGridSm,
    errorMessage,
    errorTime,
    isUpdating,
    isWithValue,
    onDateRangeChange,
    statistic
  ]);
};

export default ActivityStatistic;
