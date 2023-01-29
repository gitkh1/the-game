import { FC, useEffect, useMemo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Preloader } from '../../components/Preloader';
import { useUserInfo, useUserIsLoaded } from '../../global/hooks';

type T_FactoryMode = {
  allowGuests?: boolean;
  allowSignIn?: boolean;
};

type T_FactoryFC = (mode: T_FactoryMode) => FC<T_Props>;

type T_Props = {
  redirectInvalidTo: string;
};

export const makeRouterWithAuth: T_FactoryFC =
  (mode) =>
  ({ redirectInvalidTo }) => {
    const userInfo = useUserInfo();
    const userIsLoaded = useUserIsLoaded();
    const navigate = useNavigate();

    useEffect(() => {
      if (!userIsLoaded) return;

      const redirectGuests = !mode.allowGuests && !userInfo;
      const redirectSignIn = !mode.allowSignIn && userInfo;

      if (redirectGuests || redirectSignIn) {
        navigate(redirectInvalidTo);
      }
    }, [userIsLoaded, userInfo, navigate]);

    const child = useMemo(() => <Outlet />, []);
    return <Preloader showLoading={!userIsLoaded}>{child}</Preloader>;
  };
