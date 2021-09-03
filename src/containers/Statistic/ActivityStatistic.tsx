import 'devextreme/dist/css/dx.material.teal.dark.css';

import React, { Fragment, useCallback, useState, useMemo } from 'react';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { useApolloError } from '../../hooks/useApolloError';
import { Grid, Paper, Typography, SvgIcon } from '@material-ui/core';
import { ActivityType } from '../../generated/apollo';
import styled from 'styled-components';
import { Emoji } from '../../components/Emoji';
import { StreakBlock } from './components/StreakBlock';
import DateRange from '@material-ui/icons/DateRange';
import { ReactComponent as AverageIcon } from '../../assets/average.svg';
import { ReactComponent as MedianIcon } from '../../assets/median.svg';
import { ValueBlock } from './components/ValueBlock';
import { WeekdayChart } from './components/WeekdayChart';
import { EmptyBlock } from '../../components/EmptyBlock';
import { EntryPerDateChart } from './components/EntryPerDateChart';
import { CountPerValueChart } from './components/CountPerValueChart';
import { RangeDatePicker, RangeDatePickerProps } from '../../components/RangeDatePicker';
import { useActivityStatistic } from '../../hooks/useActivityStatistic';
import { RouteProp, useRoute } from '@react-navigation/native';
import { NavigationParams } from '../App/App';
import { Icon } from '@iconify/react';
import baselineReceiptLong from '@iconify/icons-ic/baseline-receipt-long';

const TitlePaper = styled(Paper)`
  padding: 7px 6px 7px 15px;
  margin-bottom: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 24px;
`;

const ActivityStatistic: React.FC = () => {
  const { errorMessage, onError, errorTime } = useApolloError();

  let route = useRoute<RouteProp<NavigationParams, 'ActivityStatistic'>>();
  const id = route.params.id;

  const [dateAfter, setDateAfter] = useState<string | undefined>();
  const [dateBefore, setDateBefore] = useState<string | undefined>();

  const { baseStatistic, advancedStatistic, isUpdating, isLoading } = useActivityStatistic({
    onError,
    variables: { activityId: id, dateAfter, dateBefore }
  });

  const activity = baseStatistic?.activity;

  const isWithValue = activity?.valueType !== ActivityType.Simple;

  const valueBlockGridXs = 6;
  const valueBlockGridSm = 3;

  const chartsGridXs = 12;
  const chartsGridSm = isWithValue ? 6 : 12;

  const onDateRangeChange: RangeDatePickerProps['onChange'] = useCallback((dateRange) => {
    setDateAfter(dateRange.dateAfter?.toISO());
    setDateBefore(dateRange.dateBefore?.toISO());
  }, []);

  return useMemo(() => {
    return (
      <ScreenWrapper
        errorMessage={errorMessage}
        errorTime={errorTime}
        isLoading={isLoading && !isUpdating}
        unmountOnHide
      >
        <TitlePaper>
          <Typography variant="subtitle1">
            <Emoji>{activity?.emoji}</Emoji>
            {activity?.name}
          </Typography>

          <RangeDatePicker onChange={onDateRangeChange} isLoading={isUpdating} />
        </TitlePaper>

        <StatBlockPaper>
          <Grid container spacing={1} justify="space-around">
            <Grid item xs={valueBlockGridXs} sm={valueBlockGridSm}>
              <ValueBlock
                value={baseStatistic?.total}
                text="Entries count"
                icon={<Icon icon={baselineReceiptLong} width={24} />}
              />
            </Grid>

            <Grid item xs={valueBlockGridXs} sm={valueBlockGridSm}>
              <ValueBlock
                value={baseStatistic?.perWeek === null ? '—' : `x${baseStatistic?.perWeek}`}
                text="Per week"
                icon={<DateRange />}
              />
            </Grid>

            {isWithValue && (
              <Fragment>
                <Grid item xs={valueBlockGridXs} sm={valueBlockGridSm}>
                  <ValueBlock
                    value={baseStatistic?.averageValue}
                    text="Average value"
                    icon={<AverageSvgIconStyled>{<AverageIcon />}</AverageSvgIconStyled>}
                  />
                </Grid>

                <Grid item xs={valueBlockGridXs} sm={valueBlockGridSm}>
                  <ValueBlock
                    value={baseStatistic?.medianValue}
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
                streak={baseStatistic?.streakWith!}
                isWithActivity={true}
              />
            </Grid>

            <Grid item xs={6}>
              <StreakBlock
                text={`Streak without activity`}
                streak={baseStatistic?.streakWithout!}
                isWithActivity={false}
              />
            </Grid>
          </Grid>
        </StatBlockPaper>

        <EntryPerDateChart
          data={advancedStatistic?.entriesPerDateGroup}
          isWithValue={isWithValue}
          isLocked={!advancedStatistic}
        />

        <EmptyBlock height={8} />

        <Grid container spacing={1}>
          <Grid item xs={chartsGridXs} sm={chartsGridSm}>
            <ChartPaper>
              <WeekdayChart
                data={advancedStatistic?.weekdays}
                isWithValue={isWithValue}
                isLocked={!advancedStatistic}
              />
            </ChartPaper>
          </Grid>

          {isWithValue && (
            <Grid item xs={chartsGridXs} sm={chartsGridSm}>
              <ChartPaper>
                <CountPerValueChart
                  data={advancedStatistic?.countPerValue}
                  isReverseColors={!!activity?.isReverseColors}
                  isLocked={!advancedStatistic}
                />
              </ChartPaper>
            </Grid>
          )}
        </Grid>
      </ScreenWrapper>
    );
  }, [
    activity,
    advancedStatistic,
    baseStatistic,
    chartsGridSm,
    errorMessage,
    errorTime,
    isLoading,
    isUpdating,
    isWithValue,
    onDateRangeChange
  ]);
};

export default ActivityStatistic;
