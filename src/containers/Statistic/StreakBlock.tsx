import React, { Fragment, useCallback } from 'react';
import { Streak } from '../../generated/apollo';
import { toLuxon } from '../../helpers/date';
import { DateTime } from 'luxon';
import { ValueBlock } from './ValueBlock';
import { pluralLabel } from '../../helpers/pluralarize';
import styled from 'styled-components';
import { WhatshotOutlined } from '@material-ui/icons';
import { Whatshot } from '@material-ui/icons';

export interface StreakProps {
  streak: Streak;
  text: string;
  isWithActivity: boolean;
}

const Wrapper = styled.div`
  margin: 20px 0;
`;

export const StreakBlock: React.FC<StreakProps> = ({ streak, text, isWithActivity }) => {
  const formatDate = useCallback(
    (date: string) => toLuxon(date).toLocaleString(DateTime.DATE_MED),
    []
  );

  const getInterval = useCallback(() => {
    if (!streak.from || !streak.to) return '';

    const toFormatted = formatDate(streak.to);
    const fromFormatted = formatDate(streak.from);

    if (toFormatted === fromFormatted) {
      return `${toFormatted}`;
    }

    return `${fromFormatted} - ${toFormatted}`;
  }, [formatDate, streak]);

  if (!streak) return <Fragment />;

  return (
    <Wrapper>
      <ValueBlock
        text={text}
        subText={getInterval()}
        value={pluralLabel('day', streak.count)}
        valueInterval={10}
        icon={
          isWithActivity ? (
            <WhatshotOutlined color="primary" fontSize="inherit" />
          ) : (
            <Whatshot color="secondary" fontSize="inherit" />
          )
        }
      />
    </Wrapper>
  );
};
