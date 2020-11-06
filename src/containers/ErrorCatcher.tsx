import React, { Component, ErrorInfo } from "react";
import * as Sentry from "@sentry/browser";
import { ReactComponent as ErrorLogo } from "../assets/error.svg";
import { LogoContent } from "../components/LogoContent";

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
      return <LogoContent text="Unexpected error happened!" logo={ErrorLogo} />;
    }

    // when there's not an error, render children untouched
    return children;
  }
}
