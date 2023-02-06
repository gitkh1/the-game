import React from "react";
import { renderToString } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import { routesWithoutAuth } from "./src/routes";

export function render(path: string) {
  return renderToString(<RouterProvider router={createMemoryRouter(routesWithoutAuth, { initialEntries: [path] })} />);
}
