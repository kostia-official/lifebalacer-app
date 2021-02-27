import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';
import { PageWrapper } from '../../components/PageWrapper';

const About = () => {
  const { goForwardToCb } = useNavigationHelpers();

  return (
    <PageWrapper>
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
      </List>
    </PageWrapper>
  );
};

export default About;
