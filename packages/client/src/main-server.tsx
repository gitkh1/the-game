/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { ThemeProvider } from "@mui/material";

import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { Layout } from "./components/Layout";
import createEmotionCache from "./global/mui/createEmotionCache";
import { store, T_Store } from "./global/store";
import theme from "./global/theme/index";
import { routesWithoutAuth } from "./routes";

export function render(path: string): string[] {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  console.log("store", store.getState());

  const html = renderToString(
    <StrictMode>
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
    </StrictMode>,
  );

  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks) as string;

  return [html, emotionCss];
}
