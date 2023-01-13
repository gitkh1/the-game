import { useEffect, useState } from 'react';
import { authApi } from '../../api';

let isLoaded = false;
let authed = false;

const AuthedPromise = authApi
  .getUserData()
  .finally(() => {
    isLoaded = true;
  })
  .then(
    () => {
      authed = true;
    },
    () => {
      authed = false;
    }
  );

export const useAuthed = () => {
  const [loaded, setLoaded] = useState(isLoaded);

  useEffect(() => {
    if (!loaded) {
      AuthedPromise.then(() => {
        setLoaded(true);
      });
    }
  }, []);

  return [loaded, authed];
};
