import { makeRouterWithAuth } from './makeRouterWithAuth';

export const GuestOnlyRouter = makeRouterWithAuth(true);
export const SignedInOnlyRouter = makeRouterWithAuth(false);
