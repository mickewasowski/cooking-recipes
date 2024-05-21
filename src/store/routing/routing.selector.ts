import { RoutingState } from './routing.reducer';

export const getCurrentRedirectPath = (state: RoutingState) => state.redirectTo;
