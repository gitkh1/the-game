/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect } from "react";

import { getUser, userSelector } from "../store/user";

import { useAppDispatch, useAppSelector } from "./storeHooks";

export const useUserInfo = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getUser());
  }, []);

  return useAppSelector(userSelector);
};
