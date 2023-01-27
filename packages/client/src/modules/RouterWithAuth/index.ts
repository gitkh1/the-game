import { makeRouterWithAuth } from './makeRouterWithAuth';

export const GuestOnlyRouter = makeRouterWithAuth({ allowGuests: true });
export const SignedInOnlyRouter = makeRouterWithAuth({ allowSignIn: true });
