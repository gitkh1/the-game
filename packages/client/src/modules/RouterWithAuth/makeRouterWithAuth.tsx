import { FC, useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Preloader } from '../../components/Preloader';
import { useUserInfo, useUserIsLoading } from '../../global/hooks';

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
    const userIsLoaded = useUserIsLoading();
    const navigate = useNavigate();
    const [isFirstTime, setIsFirstTime] = useState(true);

    useEffect(() => {
      if (!userIsLoaded) return;
      setIsFirstTime(false);

      const redirectGuests = !mode.allowGuests && !userInfo;
      const redirectSignIn = !mode.allowSignIn && userInfo;

      if (redirectGuests || redirectSignIn) {
        navigate(redirectInvalidTo);
      }
    }, [userIsLoaded, userInfo, navigate]);

    const child = useMemo(() => <Outlet />, []);
    return <Preloader showLoading={isFirstTime && !userIsLoaded}>{child}</Preloader>;
  };
