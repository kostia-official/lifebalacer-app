import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from '../../components/PageWrapper';
import { ReactComponent as FondyLogo } from '../../assets/fondyLogo.svg';
import styled from 'styled-components';

const FondyLogoStyled = styled(FondyLogo)`
  height: 50px;
  width: 280px;

  margin: 10px 0;
`;

export const PaymentInfo = () => {
  return (
    <PageWrapper>
      <Typography gutterBottom variant="h5">
        Payment Information
      </Typography>

      <h2>Subscription Plans</h2>

      <Typography>Life Balancer provides following plans:</Typography>

      <h3>Free</h3>

      <ul>
        <li>
          <Typography>All basic functionality for tracking your life</Typography>
        </li>
        <li>
          <Typography>No ads</Typography>
        </li>
        <li>
          <Typography>Basic statistics</Typography>
        </li>
      </ul>

      <h3>Premium</h3>

      <ul>
        <li>
          <Typography>All basic functionality for tracking your life</Typography>
        </li>
        <li>
          <Typography>No ads</Typography>
        </li>
        <li>
          <Typography>
            <b>Advanced statistics</b>
          </Typography>
        </li>
        <li>
          <Typography>
            <b>Help with migrating data from another application</b>
          </Typography>
        </li>
      </ul>

      <Typography>
        You can pay for Premium plan $4 every month or $40 every year. Price is in USD currency.
      </Typography>

      <h2>Payment Process</h2>

      <Typography gutterBottom>
        Soon it will be possible to pay for the Premium plan with you Mastercard or Visa card.
      </Typography>

      <Typography>
        After confirming the selected plan, a secure window will open with the payment page of the
        FONDY.EU processing center, where you need to enter your bank card details. For additional
        authentication of the cardholder, the 3D Secure protocol is used. If your Bank supports this
        technology, you will be redirected to its server for additional identification. For
        information on the rules and methods of additional identification, check with the Bank that
        issued your bank card. FONDY.EU processing center protects and processes your bank card data
        according to PCI DSS 3.0 security standard. Information is transferred to the payment
        gateway using SSL encryption technology. Further transmission of information occurs through
        closed banking networks with the highest level of reliability. FONDY.EU does not transfer
        your card data to us or other third parties. For additional authentication of the
        cardholder, the 3D Secure protocol is used.
      </Typography>

      <FondyLogoStyled />
    </PageWrapper>
  );
};
