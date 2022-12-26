import { useEffect } from 'react';
import './main.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { routes } from './routes';
import { ErrorBoundary } from './modules/ErrorBoundary/ErrorBoundary';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  return (
    <Layout>
      <ErrorBoundary>
        <RouterProvider router={createBrowserRouter(routes)} />
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
