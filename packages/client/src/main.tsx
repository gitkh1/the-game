/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { Layout } from "./components/Layout";
import { store } from "./global/store";
import { ErrorBoundary } from "./modules/ErrorBoundary/ErrorBoundary";
import App from "./App";

import "./main.scss";

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Layout>
          <App />
        </Layout>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
);
