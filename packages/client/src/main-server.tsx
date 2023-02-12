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
import { createStore, T_Store } from "./global/store";
import theme from "./global/theme/index";
import { routesWithoutAuth } from "./routes";

export { createStore };

export function render(path: string, store: T_Store): [string, string] {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const html = renderToString(
    <StrictMode>
      <ErrorBoundary>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <Provider store={store} serverState={store.getState()}>
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
