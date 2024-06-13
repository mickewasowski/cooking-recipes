import { UserState } from "./user.slice";

export const getCurrentUser = (state: UserState) => state.currentUser;
export const getIsUserLoading = (state: UserState) => state.isLoading;