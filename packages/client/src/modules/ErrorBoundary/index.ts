/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

export * from "./ErrorBoundary";

const isDev = process.env.NODE_ENV === "development";

Sentry.init({
  dsn: "https://36978210fe9a4b3d954797973b3752d7@o4504672536428544.ingest.sentry.io/4504672541016064",
  integrations: [new BrowserTracing()],

  beforeSend(event, hint) {
    if (isDev) {
      console.error("Sentry catched error", hint.originalException || hint.syntheticException);
      return null;
    }
    return event;
  },
  tracesSampleRate: 1.0,
});
