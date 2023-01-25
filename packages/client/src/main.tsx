import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.scss';
import { ErrorBoundary } from './modules/ErrorBoundary/ErrorBoundary';
import { store } from './global/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
