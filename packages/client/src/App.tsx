import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { routes } from './routes';

function App() {
  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`;
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     console.log(data);
  //   };

  //   fetchServerData();
  // }, []);

  return (
    <Layout>
      <RouterProvider router={createBrowserRouter(routes)} />
    </Layout>
  );
}

export default App;
