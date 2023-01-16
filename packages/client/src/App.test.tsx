import { render, screen } from '@testing-library/react';

const appContent = '404';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  render(<div>{appContent}</div>);
  expect(screen.findAllByText(appContent)).toBeDefined();
});
