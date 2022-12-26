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
  components: {
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
        variant: 'standard',
        fullWidth: true,
        inputProps: {
          sx: { textAlign: 'right' },
        },
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
        fullWidth: true,
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
        sx: {
          cursor: 'pointer',
        },
      },
    },
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
