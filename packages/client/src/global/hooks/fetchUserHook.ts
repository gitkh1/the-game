import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dispatch, selectUserInfo } from '../store';
import { userActions } from '../store/actions';

export const useUserInfo = () => {
  useEffect(() => {
    dispatch(userActions.getUser);
  }, []);
  const userInfo = useSelector(selectUserInfo);
  return userInfo;
};
