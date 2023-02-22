import React, { FC, PropsWithChildren, useEffect, useMemo } from "react";
import { Alert, AlertProps, Box } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { notificationActions, notificationSelector } from "../../global/store/slices/notification";

import classes from "./Notification.module.scss";

const DELAY = 2000;

interface I_AlertData {
  type?: AlertProps["severity"];
  message?: string;
}

const ALERT_TYPES = {
  error: "error",
  warning: "warning",
  success: "success",
} as const;

export const Notification: FC<PropsWithChildren> = ({ children }) => {
  const { notification } = useAppSelector(notificationSelector);
  const dispatch = useAppDispatch();

  const { type, message } = useMemo<I_AlertData>(() => {
    if (notification?.errorMessage) {
      return { type: ALERT_TYPES.error, message: notification.errorMessage };
    }
    if (notification?.warningMessage) {
      return { type: ALERT_TYPES.warning, message: notification.warningMessage };
    }
    if (notification?.successMessage) {
      return { type: ALERT_TYPES.success, message: notification.successMessage };
    }

    return {};
  }, [notification]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(notificationActions.clearNotification());
    }, notification?.delay ?? DELAY);

    return () => clearTimeout(timerId);
  }, [message]);

  return (
    <>
      {message && type && (
        <Box className={classes.notification}>
          <Alert severity={type}>{message}</Alert>
        </Box>
      )}
      {children}
    </>
  );
};
