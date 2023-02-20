import React, { FC, PropsWithChildren, useEffect, useMemo } from "react";
import { Alert, Box } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../global/hooks";
import { notificationActions, notificationSelector } from "../../global/store/slices/notification";

import classes from "./Notification.module.scss";

const DELAY = 2000;

export const Notification: FC<PropsWithChildren> = ({ children }) => {
  const { notification } = useAppSelector(notificationSelector);
  const dispatch = useAppDispatch();

  const { type, message } = useMemo(() => {
    if (notification?.errorMessage) {
      return { type: "error", message: notification.errorMessage } as const;
    }
    if (notification?.warningMessage) {
      return { type: "warning", message: notification.warningMessage } as const;
    }
    if (notification?.successMessage) {
      return { type: "success", message: notification.successMessage } as const;
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
