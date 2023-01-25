import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { T_AppDispatch, T_RootState } from '../store';

export const useAppDispatch = () => useDispatch<T_AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<T_RootState> = useSelector;
