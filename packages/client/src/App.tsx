import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "./components/Layout";
import { routes } from "./routes";

const App = () => {
  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const url = `http://localhost:${__SERVER_PORT__}`;
        const response = await fetch(url);
        const data = (await response.json()) as unknown;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    const loadFunc = async () => {
      if ("serviceWorker" in navigator) {
        try {
          await navigator.serviceWorker.register("serviceWorker.js");
          console.log("SW registered");
        } catch (error) {
          console.log("SW failed");
        }
      }
      await fetchServerData();
    };

    window.addEventListener("load", () => void loadFunc());
  }, []);

  return (
    <Layout>
      <RouterProvider router={createBrowserRouter(routes)} />
    </Layout>
  );
};

export default App;
