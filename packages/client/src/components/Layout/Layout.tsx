import { FC, ReactNode } from "react";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Notification } from "../Notification";

type T_Props = {
  children: ReactNode;
};

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export const Layout: FC<T_Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Notification>
        <CssBaseline />
        {children}
      </Notification>
    </ThemeProvider>
  );
};
