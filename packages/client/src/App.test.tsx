import App from './App';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ErrorBoundary } from './modules/ErrorBoundary/ErrorBoundary';

const appContent = '404';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  render(<React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
  );
  expect(screen.findAllByText(appContent)).toBeDefined();
});
