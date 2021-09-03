import styled from 'styled-components';
import { Card } from '@material-ui/core';
import { MainColors } from '../../../common/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from 'react';
// @ts-ignore
import { Textfit } from 'react-textfit';

const PriceCard = styled(Card)`
  width: 40vw;
  height: 40vw;

  max-width: 200px;
  max-height: 200px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px;
`;

const Title = styled.div`
  margin-top: 2px;
  font-size: 20px;
  line-height: 18px;
`;

const PriceTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 64px;
  width: 100%;
`;

const PriceText = styled.span<{ $size: number }>`
  text-align: center;
  font-size: ${(p) => p.$size}px;
  width: 100%;
  line-height: 30px;
`;

const PriceSubText = styled.span`
  font-size: 14px;
  line-height: 14px;
`;

const SubText = styled(Textfit)`
  padding: 0 2rem;
  line-height: 18px;
  text-align: center;
`;

const SubTextWrapper = styled.div`
  min-height: 18px;
  display: flex;
  align-items: flex-end;
`;

const PriceBoxWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const Border = styled.div<{ $isShow?: boolean }>`
  width: 100%;
  height: 100%;
  display: ${(p) => (p.$isShow ? 'inherit' : 'none')};
  border: solid ${MainColors.Primary};
  border-radius: 10px;
  position: absolute;
`;

const BestValue = styled.div<{ $isShow?: boolean }>`
  height: 20px;
  padding: 0 4px;
  border: solid ${MainColors.Primary};
  background-color: ${MainColors.Primary};
  border-radius: 4px;
  position: absolute;
  top: -9px;
  z-index: 10;

  display: ${(p) => (p.$isShow ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;

  font-weight: 600;
  font-size: 12px;
`;

export interface PriceBoxProps {
  id: string;
  title: string;
  priceText: string;
  priceSubText: string;
  priceTextSize: number;
  bottomText?: string;
  selected?: boolean;
  subscribed?: boolean;
  bestValue?: boolean;
  onClick: (id: string) => void;
}

export const PriceBox: React.FC<PriceBoxProps> = ({
  id,
  title,
  priceText,
  priceSubText,
  priceTextSize,
  bottomText = ' ',
  selected = false,
  bestValue = false,
  subscribed = false,
  onClick
}) => {
  return (
    <PriceBoxWrapper>
      <BestValue $isShow={bestValue}>BEST VALUE</BestValue>
      <Border $isShow={selected} />

      <PriceCard onClick={() => onClick(id)}>
        <Title>{title}</Title>

        <PriceTextWrapper>
          <PriceText $size={priceTextSize}>{priceText}</PriceText>
          <PriceSubText>{priceSubText}</PriceSubText>
        </PriceTextWrapper>

        <SubTextWrapper>
          {subscribed ? (
            <CheckCircleIcon color="primary" />
          ) : (
            <SubText mode="single">{bottomText}</SubText>
          )}
        </SubTextWrapper>
      </PriceCard>
    </PriceBoxWrapper>
  );
};
