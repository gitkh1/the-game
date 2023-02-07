/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { ThemeProvider } from "@mui/material";

import { Layout } from "./src/components/Layout";
import createEmotionCache from './src/global/mui/createEmotionCache';
import { store } from "./src/global/store";
import theme from "./src/global/theme/index";
import { ErrorBoundary } from "./src/modules/ErrorBoundary/ErrorBoundary";
import { routesWithoutAuth } from "./src/routes";



export function render(path: string): string[] {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const html = renderToString(
    <ErrorBoundary>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Layout>
              <RouterProvider router={createMemoryRouter(routesWithoutAuth, { initialEntries: [path] })} />
            </Layout>
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </ErrorBoundary>
  );

  // const html = renderToString(
  //   <div>Hi!!</div>
  // );

  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks) as string;

  return [html, emotionCss];
}
