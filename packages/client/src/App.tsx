import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routesWithoutAuth } from "./routes";

const App = () => {
  return (
    <RouterProvider router={createBrowserRouter(routesWithoutAuth)} />
  );
};

export default App;
