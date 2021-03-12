import React from 'react';
import { Center } from '../../components/Center';
import { Typography, Button, Card, CardContent, CardActions } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { mobileStyles } from '../../common/breakpoints';
import { MainColors } from '../../common/colors';

export interface PlanCardProps {
  isPremiumActive: boolean;
  title: string;
  isFreePlan: boolean;
  onPurchaseClick?: () => void;
}

const SubscriptionCard = styled(Card)`
  display: flex;
  flex-direction: column;

  width: 300px;

  ${mobileStyles(css`
    width: 100%;
  `)}
`;

const CardContentStyled = styled(CardContent)`
  flex-grow: 1;
  padding-bottom: 0;
`;

const CardActionsStyled = styled(CardActions)`
  margin: 8px 0;
`;

const ButtonWrapper = styled.div<{ isActive: boolean }>`
  ${(props) =>
    props.isActive
      ? css`
          & .MuiButton-contained.Mui-disabled {
            background-color: ${MainColors.Primary};
            color: #c1c1c1;
          }
        `
      : ''}
`;

export const PlanCard: React.FC<PlanCardProps> = ({
  isPremiumActive,
  isFreePlan,
  children,
  title,
  onPurchaseClick
}) => {
  return (
    <SubscriptionCard>
      <CardContentStyled>
        <Center>
          <Typography color="textSecondary" variant="body1" gutterBottom>
            <b>{title}</b>
          </Typography>
        </Center>

        {children}
      </CardContentStyled>

      <CardActionsStyled>
        <Center>
          {isFreePlan ? (
            <Button size="small" variant="contained" disabled>
              {isPremiumActive ? 'Inactive' : 'Active'}
            </Button>
          ) : (
            <ButtonWrapper isActive={isPremiumActive}>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={onPurchaseClick}
                disabled={isPremiumActive}
              >
                {isPremiumActive ? 'Active' : 'Purchase'}
              </Button>
            </ButtonWrapper>
          )}
        </Center>
      </CardActionsStyled>
    </SubscriptionCard>
  );
};
