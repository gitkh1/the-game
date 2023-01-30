import React, { FC, ReactNode, useState } from "react";
import { Alert, Box } from "@mui/material";

import { NotificationContext } from "../../global/context";

import classes from "./Notification.module.scss";

type T_Props = {
  children: ReactNode;
};

export const Notification: FC<T_Props> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState<string>("");

  const showAlert = (message: string, delay = 2000) => {
    setMessage(message);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
      setMessage("");
    }, delay);
  };

  return (
    <NotificationContext.Provider value={{ showAlert }}>
      {isVisible && (
        <Box className={classes.notification}>
          <Alert severity="error">{message}</Alert>
        </Box>
      )}
      {children}
    </NotificationContext.Provider>
  );
};
