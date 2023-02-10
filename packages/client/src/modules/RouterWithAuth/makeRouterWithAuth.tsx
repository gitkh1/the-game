/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import { FC, useEffect, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Preloader } from "../../components/Preloader";
import { useUserInfo } from "../../global/hooks";

type T_FactoryMode = {
  allowGuests?: boolean;
  allowSignIn?: boolean;
};

type T_FactoryFC = (mode: T_FactoryMode) => FC<T_Props>;

type T_Props = {
  redirectInvalidTo: string;
};

export const makeRouterWithAuth: T_FactoryFC = (mode) =>
  function ({ redirectInvalidTo }) {
    const userInfo = useUserInfo();
    const navigate = useNavigate();

    useEffect(() => {
      if (userInfo.isLoading) return;

      const redirectGuests = !mode.allowGuests && !userInfo.data;
      const redirectSignIn = !mode.allowSignIn && !!userInfo.data;

      if (redirectGuests || redirectSignIn) {
        navigate(redirectInvalidTo);
      }
    }, [userInfo.isLoading, userInfo.data, navigate]);

    const child = useMemo(() => <Outlet />, []);
    return <Preloader showLoading={userInfo.isLoading}>{child}</Preloader>;
  };
