import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { ScreenWrapper } from '../App/ScreenWrapper';
import { Center } from '../../components/Center';
import { LastUpdatedAt } from './LastUpdatedAt';
import { useIsInternalTestUser } from '../../hooks/useIsInternalTestUser';

const About = () => {
  const { goForwardToCb } = useNavigationHelpers();
  const isInternalTestUser = useIsInternalTestUser();

  return (
    <ScreenWrapper>
      <List>
        <ListItem button onClick={goForwardToCb('PrivacyPolicy')}>
          <ListItemText primary="Privacy Policy" />
        </ListItem>

        <ListItem button onClick={goForwardToCb('TermsAndConditions')}>
          <ListItemText primary="Terms and Conditions" />
        </ListItem>

        <ListItem button onClick={goForwardToCb('PaymentInfo')}>
          <ListItemText primary="Payment Information" />
        </ListItem>

        <ListItem button onClick={goForwardToCb('RefundPolicy')}>
          <ListItemText primary="Refund Policy" />
        </ListItem>

        <ListItem button onClick={goForwardToCb('ContactInfo')}>
          <ListItemText primary="Contact Information" />
        </ListItem>

        {isInternalTestUser && (
          <ListItem button onClick={goForwardToCb('DevTools')}>
            <ListItemText primary="Dev Tools" />
          </ListItem>
        )}
      </List>

      <Center margin="8px 0">
        <LastUpdatedAt />
      </Center>
    </ScreenWrapper>
  );
};

export default About;
