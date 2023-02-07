/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';

import { Layout } from "./components/Layout";
import createEmotionCache from './global/mui/createEmotionCache';
import { store } from "./global/store";
import theme from './global/theme/index';
import { ErrorBoundary } from "./modules/ErrorBoundary/ErrorBoundary";
import App from "./App";

import "./main.scss";

const cache = createEmotionCache();

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <ErrorBoundary>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Layout>
            <App />
          </Layout>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  </ErrorBoundary>
);
