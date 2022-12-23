import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { FC, ReactNode } from 'react';

type T_Props = {
  children: ReactNode;
};

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const Layout: FC<T_Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
