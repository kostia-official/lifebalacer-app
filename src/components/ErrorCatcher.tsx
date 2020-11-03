import React, { Component, ErrorInfo, Fragment } from 'react';
import * as Sentry from '@sentry/browser';
import { ReactComponent as ErrorLogo } from '../assets/error.svg';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

interface IErrorCatcherState {
  eventId?: string;
  hasError: boolean;
}

interface IErrorCatcherProps {
  userEmail?: string;
  userName?: string;
}

const ErrorLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorLogoStyled = styled(ErrorLogo)`
  width: 60vw;
  height: auto;
  margin-top: 50px;
`;

const TypographyStyled = styled(Typography)`
  margin-top: 20px;
`;

export class ErrorCatcher extends Component<IErrorCatcherProps, IErrorCatcherState> {
  constructor(props: IErrorCatcherProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { userEmail, userName } = this.props;

    Sentry.withScope((scope) => {
      scope.setExtras({ ...errorInfo });
      const eventId = Sentry.captureException(error);

      Sentry.showReportDialog({
        user: { email: userEmail, name: userName },
        eventId
      });
    });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <Fragment>
          <ErrorLogoWrapper>
            <ErrorLogoStyled />

            <TypographyStyled variant="h6">Unexpected error happened</TypographyStyled>
          </ErrorLogoWrapper>
        </Fragment>
      );
    }

    // when there's not an error, render children untouched
    return children;
  }
}
