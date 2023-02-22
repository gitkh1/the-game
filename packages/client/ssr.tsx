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

import { Layout } from "./src/components/Layout";
import createEmotionCache from "./src/global/mui/createEmotionCache";
import { createStore, T_Store } from "./src/global/store";
import theme from "./src/global/theme/index";
import { ErrorBoundary } from "./src/modules/ErrorBoundary";
import { routes } from "./src/routes";

export { createStore };

export function render(path: string, store: T_Store): string[] {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const html = renderToString(
    <StrictMode>
      <ErrorBoundary>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <Provider store={store} serverState={store.getState()}>
              <Layout>
                <RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />
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
