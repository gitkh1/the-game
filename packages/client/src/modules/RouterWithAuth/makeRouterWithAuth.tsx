import { FC, useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Preloader } from '../../components/Preloader';
import { useAuthed } from './authed';

type Props = {
  invalidRedirectTo: string;
};

export const makeRouterWithAuth: (isGuestMode: boolean) => FC<Props> =
  (isGuestMode: boolean) =>
  ({ invalidRedirectTo }) => {
    const navigate = useNavigate();
    const [loaded, authed] = useAuthed();

    useEffect(() => {
      if (loaded && authed === isGuestMode) {
        navigate(invalidRedirectTo);
      }
    }, [loaded]);

    const child = useMemo(() => <Outlet />, []);

    return <Preloader loaded={loaded}>{child}</Preloader>;
  };
