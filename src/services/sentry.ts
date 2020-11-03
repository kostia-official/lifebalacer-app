import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { config } from '../common/config';
import { LogLevel, CaptureContext } from '@sentry/types';

class SentryService {
  constructor() {
    Sentry.init({
      dsn: config.sentry.dsn,
      enabled: !config.isDev,
      environment: config.stage,
      tracesSampleRate: 1.0,
      logLevel: LogLevel.Verbose,
      integrations: [
        new Integrations.BrowserTracing(),
        new Sentry.Integrations.Breadcrumbs({
          dom: true, // Log all click and keypress events
          fetch: true, // Log HTTP requests done with the Fetch API
          history: true, // Log calls to `history.pushState` and friends
          xhr: true // Log HTTP requests done with the XHR API
        }),
        new Sentry.Integrations.GlobalHandlers({
          onerror: true,
          onunhandledrejection: true
        })
      ]
    });
  }

  captureException(exception: any, captureContext?: CaptureContext) {
    console.error(exception);
    Sentry.captureException(exception, captureContext);
  }

  setUserId(userId: string) {
    Sentry.configureScope((scope) => {
      scope.setUser({ id: userId });
    });
  }
}

export const sentryService = new SentryService();
