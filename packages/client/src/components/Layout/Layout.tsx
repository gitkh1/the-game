import { FC, PropsWithChildren } from "react";
import { CssBaseline } from "@mui/material";

import { Notification } from "../Notification";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Notification>
      <CssBaseline />
      {children}
    </Notification>
  );
};
