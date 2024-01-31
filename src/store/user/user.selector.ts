import { UserState } from "./user.reducer";

export const getCurrentUser = (state: UserState) => state.currentUser;
export const getUserError = (state: UserState) => state.error;
export const getIsUserLoading = (state: UserState) => state.isLoading;
export const getSuccessMessage = (state: UserState) => state.successMessage;