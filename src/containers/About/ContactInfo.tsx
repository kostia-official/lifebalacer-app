import React from 'react';
import { Typography } from '@material-ui/core';
import { PageWrapper } from '../../components/PageWrapper';

export const ContactInfo = () => {
  return (
    <PageWrapper>
      <Typography gutterBottom variant="h5">
        Contact Information
      </Typography>

      <Typography gutterBottom>
        Feel free to contact Life Balancer team with any questions or suggestions according to the
        product.
      </Typography>

      <Typography>Email: admin@lifebalancer.app</Typography>
      <Typography>Phone: +380932310373</Typography>
    </PageWrapper>
  );
};
