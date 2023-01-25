import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { dispatch } from '../store';

export function bindWithDispatch<T extends ActionCreatorsMapObject>(actions: T) {
  return bindActionCreators(actions, dispatch);
}
