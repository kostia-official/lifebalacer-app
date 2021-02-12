import React, { Component, ErrorInfo } from 'react';
import * as Sentry from '@sentry/react';
import { ReactComponent as ErrorLogo } from '../assets/error.svg';
import { LogoContent } from '../components/LogoContent';
import { persistCache } from '../apollo/cache';
import _ from 'lodash';

interface IErrorCatcherState {
  eventId?: string;
  hasError: boolean;
}

interface IErrorCatcherProps {
  userEmail?: string;
  userName?: string;
}

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

    persistCache.persistor.purge().then();

    Sentry.withScope((scope) => {
      scope.setExtras({ ...errorInfo });
      const eventId = Sentry.captureException(error);

      Sentry.showReportDialog({
        user: { email: userEmail, name: userName },
        eventId,
        onLoad() {
          // Since there is no onClose callback need to use this for redirecting to root
          const interval = setInterval(() => {
            const sentryWindow = document.getElementsByClassName('sentry-error-embed');

            if (_.isEmpty(sentryWindow)) {
              clearInterval(interval);

              window.location.replace('/');
            }
          }, 500);
        }
      });
    });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <LogoContent text="Unexpected error happened!" logo={ErrorLogo} />;
    }

    // when there's not an error, render children untouched
    return children;
  }
}
