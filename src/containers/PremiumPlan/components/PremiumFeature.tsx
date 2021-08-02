import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export interface PremiumFeatureProps {
  icon: FunctionComponent;
  title: string;
  subTitle: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 18px;
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;

  margin: 8px 12px 8px 8px;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

export const PremiumFeature: React.FC<PremiumFeatureProps> = ({ icon, title, subTitle }) => {
  return (
    <Wrapper>
      <IconWrapper>
        <Icon as={icon} />
      </IconWrapper>
      <div>
        <Title>{title}</Title>
        <div>{subTitle}</div>
      </div>
    </Wrapper>
  );
};
