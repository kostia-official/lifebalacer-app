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
      </List>
    </PageWrapper>
  );
};

export default About;
