import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dispatch, selectUserInfo, selectUserIsLoaded } from '../store';
import { userActions } from '../store/actions';

export const useUserInfo = () => {
  useEffect(() => {
    dispatch(userActions.getUser);
  }, []);
  const userInfo = useSelector(selectUserInfo);
  return userInfo;
};

export const useUserIsLoaded = () => {
  return useSelector(selectUserIsLoaded);
};
