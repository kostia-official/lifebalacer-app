import React, { useState, useCallback, Fragment } from 'react';
import { useGetBalanceQuery } from '../../generated/apollo';
import { CardContent, Typography } from '@material-ui/core';
import { Points } from '../../components/Points';
import styled from 'styled-components';
import { DatePicker } from '@material-ui/pickers';
import { DateTime } from 'luxon';
import { EmptyBlock } from '../../components/EmptyBlock';
import { TooltipCheckbox } from '../../components/TooltipCheckbox';
import { useToggle } from 'react-use';
import { BasePickerProps } from '@material-ui/pickers/typings/BasePicker';
import { useDatePickerRenderDayExtremes } from '../../hooks/apollo/useDatePickerRenderDayExtremes';
import { Center } from '../../components/Center';
import { SwitchBaseProps } from '@material-ui/core/internal/SwitchBase';
import { formatDateLabel } from '../../common/datePicker';

export interface BalanceModalProps {}

const CardContentStyled = styled(CardContent)`
  font-weight: normal;
  font-size: 16px;
  white-space: nowrap;

  display: flex;
  flex-direction: column;
  min-width: 250px;

  padding: 0 40px 20px 40px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CheckboxWrapper = styled.div`
  margin: 8px 2px 0 2px;
`;

export const BalanceModalContent: React.FC<BalanceModalProps> = () => {
  const [isToday, toggleIsToday] = useToggle(true);
  const [date, setDate] = useState(DateTime.local());

  const { data, refetch } = useGetBalanceQuery({ variables: { dateAfter: date.toISO() } });
  const balance = data?.balance;

  const changeDate: BasePickerProps['onChange'] = useCallback(
    (date) => {
      if (!date) return;

      setDate(date as DateTime);
      refetch({ dateAfter: date.toISO() }).then();
    },
    [refetch]
  );

  const onIsTodayCheck: SwitchBaseProps['onChange'] = useCallback(
    (e) => {
      toggleIsToday();

      if (e.target.checked) {
        changeDate(DateTime.local());
      }
    },
    [changeDate, toggleIsToday]
  );

  const { renderDay } = useDatePickerRenderDayExtremes();

  return (
    <CardContentStyled>
      <Center>
        <Typography variant="h6">Balance points</Typography>
      </Center>

      <EmptyBlock height={12} />

      <Row>
        <span>Week: </span>
        <Points points={balance?.week} transition />
      </Row>
      <Row>
        <span>Month: </span>
        <Points points={balance?.month} transition />
      </Row>
      <Row>
        <span>Year: </span>
        <Points points={balance?.year} transition />
      </Row>
      <Row>
        <span>Total: </span>
        <Points points={balance?.total} transition />
      </Row>

      <CheckboxWrapper>
        <TooltipCheckbox
          text="Sum up for today"
          tooltipContent={
            <Typography color="inherit" variant="body2" component="p">
              You can calculate your balance points for another date.
            </Typography>
          }
          onChange={onIsTodayCheck}
          checked={isToday}
        />
      </CheckboxWrapper>

      {isToday ? (
        <Fragment />
      ) : (
        <DatePicker
          label="Sum up for a specific date"
          value={date}
          onChange={changeDate}
          fullWidth
          labelFunc={formatDateLabel}
          renderDay={renderDay}
          autoOk
        />
      )}
    </CardContentStyled>
  );
};
