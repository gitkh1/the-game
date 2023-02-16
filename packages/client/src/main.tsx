/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";

import { Layout } from "./components/Layout";
import createEmotionCache from "./global/mui/createEmotionCache";
import { createStore } from "./global/store";
import theme from "./global/theme/index";
import { ErrorBoundary } from "./modules/ErrorBoundary";
import App from "./App";

import "./main.scss";

const store = createStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

const cache = createEmotionCache();

const fetchServerData = async () => {
  try {
    const url = `http://localhost:${__SERVER_PORT__}/api`;
    const response = await fetch(url);
    const data = (await response.json()) as unknown;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("serviceWorker.js");
      console.log("SW registered");
    } catch (error) {
      console.log("SW failed");
    }
  }
};

// Отключили service Worker на время разработки ssr
// window.addEventListener("load", () => void loadFunc());
window.addEventListener("load", () => void fetchServerData());

const app = (
  <StrictMode>
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
  </StrictMode>
);

const root = document.getElementById("root") as HTMLElement;
if (root.childElementCount) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
