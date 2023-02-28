import { FC, PropsWithChildren } from "react";
import * as Sentry from "@sentry/react";

import { ErrorPage } from "../../pages/ErrorPage";

export const ErrorBoundary: FC<PropsWithChildren> = (props) => {
  return <Sentry.ErrorBoundary fallback={<ErrorPage />} {...props} />;
};
