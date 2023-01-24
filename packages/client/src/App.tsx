import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { routes } from './routes';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    window.addEventListener('load', async e => {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('serviceWorker.js');
          console.log('SW registered');
        } catch (error) {
          console.log('SW failed');
        }
      }
      await fetchServerData();
    });

    
  }, []);

  return (
    <Layout>
      <RouterProvider router={createBrowserRouter(routes)} />
    </Layout>
  );
}

export default App;
