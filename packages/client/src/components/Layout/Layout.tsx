import { FC, PropsWithChildren } from "react";
import { CssBaseline } from "@mui/material";

import { Feedback } from "../../containers/Feedback";
import { Notification } from "../../containers/Notification";

import styles from "./Layout.module.scss";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Notification>
      <CssBaseline />
      {children}
      <div className={styles.feedback}>
        <Feedback />
      </div>
    </Notification>
  );
};
