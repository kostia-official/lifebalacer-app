import React, { useState, useCallback } from 'react';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { useApolloError } from '../../hooks/apollo/useApolloError';
import { Typography } from '@material-ui/core';
import { RangeDatePicker, RangeDatePickerProps } from '../../components/RangeDatePicker';
import { TitlePaper } from './components/TitlePaper';
import { Coin } from '../../components/Coin';
import { FlexBox } from '../../components/FlexBox';

const PointsStatistic: React.FC = () => {
  const { errorMessage, errorTime } = useApolloError();

  const [, setDateAfter] = useState<string | undefined>();
  const [, setDateBefore] = useState<string | undefined>();

  const onDateRangeChange: RangeDatePickerProps['onChange'] = useCallback((dateRange) => {
    setDateAfter(dateRange.dateAfter?.toISO());
    setDateBefore(dateRange.dateBefore?.toISO());
  }, []);

  return (
    <ScreenWrapper
      errorMessage={errorMessage}
      errorTime={errorTime}
      isLoading={false}
      unmountOnHide
    >
      <TitlePaper>
        <FlexBox row gap={8} centerY>
          <Coin size={16} />

          <Typography variant="subtitle1">Balance Points</Typography>
        </FlexBox>

        <RangeDatePicker onChange={onDateRangeChange} isLoading={false} />
      </TitlePaper>
    </ScreenWrapper>
  );
};

export default PointsStatistic;
