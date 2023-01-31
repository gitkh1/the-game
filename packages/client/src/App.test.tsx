import { render, screen } from "@testing-library/react";

import App from "./App";

const appContent = "404";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve("hey") }));

test("Example test", () => {
  render(<App />);
  expect(screen.findAllByText(appContent)).toBeDefined();
});
