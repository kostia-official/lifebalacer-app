import _ from 'lodash';
import React, { Fragment } from 'react';
import { useGetBalanceQuery } from '../../generated/apollo';
import { useOnEntryUpdate } from '../../hooks/useOnEntryUpdate';
import { Points } from '../../components/Points';
import { CardModal } from '../../components/CardModal';
import { useToggle } from 'react-use';
import styled from 'styled-components';
import { BalanceModalContent } from './BalanceModalContent';

const PointsWrapper = styled.div`
  cursor: pointer;
`;

export const Balance = () => {
  const { data: balanceData, refetch } = useGetBalanceQuery();

  useOnEntryUpdate([refetch]);

  const [isModalOpen, toggle] = useToggle(false);

  if (_.isNil(balanceData?.balance)) return <Fragment />;

  return (
    <Fragment>
      <CardModal open={isModalOpen} onClose={toggle}>
        <BalanceModalContent />
      </CardModal>

      <PointsWrapper onClick={toggle}>
        <Points points={balanceData?.balance.total} pointsSize={20} coinSize={22} />
      </PointsWrapper>
    </Fragment>
  );
};
