import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dispatch, selectUserInfo, selectUserIsLoading } from '../store';
import { userActions } from '../store/actions';

export const useUserInfo = () => {
  useEffect(() => {
    dispatch(userActions.getUser);
  }, []);
  const userInfo = useSelector(selectUserInfo);
  return userInfo;
};

export const useUserIsLoading = () => {
  return useSelector(selectUserIsLoading);
};
