import { FC, PropsWithChildren } from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Notification } from "../Notification";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Notification>
        <CssBaseline />
        {children}
      </Notification>
    </ThemeProvider>
  );
};
