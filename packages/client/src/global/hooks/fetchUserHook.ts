import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectUserInfo, selectUserIsLoaded } from "../store";
import { userActions } from "../store/slices/user";

import { useAppDispatch } from "./storeHooks";

export const useUserInfo = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(userActions.getUser());
  }, []);
  const userInfo = useSelector(selectUserInfo);
  return userInfo;
};

export const useUserIsLoaded = () => {
  return useSelector(selectUserIsLoaded);
};
