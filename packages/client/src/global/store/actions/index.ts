import { bindWithDispatch } from '../../utils';
import { userSliceActions } from '../slices/user';

export const userActions = bindWithDispatch<typeof userSliceActions>(userSliceActions);
