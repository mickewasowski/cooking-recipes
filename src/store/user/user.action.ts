import { USER_ACTION_TYPES, UserSignIn, UserRegisterStart, UserEditStart, UserEditSuccess } from "./user.types";
import { User } from "./user.reducer";

export const signInWithEmail = (userData: UserSignIn) => ({ type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START, payload: userData });
export const signInSuccess = (user: User) => ({ type: USER_ACTION_TYPES.SIGN_IN_SUCCESS, payload: user });
export const signInFailed = (error: Error) => ({ type: USER_ACTION_TYPES.SIGN_IN_FAILED, payload: error });

export const signOutStart = () => ({ type: USER_ACTION_TYPES.SIGN_OUT_START });
export const signOutSuccess = () => ({ type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS });
export const signOutFailed = (error: Error) => ({ type: USER_ACTION_TYPES.SIGN_OUT_FAILED, payload: error });

export const registerStart = (userData: UserRegisterStart) => ({ type: USER_ACTION_TYPES.REGISTER_START, payload: userData });
export const registerSuccess = () => ({ type: USER_ACTION_TYPES.REGISTER_SUCCESS });
export const registerFailed = (error: Error) => ({ type: USER_ACTION_TYPES.REGISTER_FAILED, payload: error });

export const editUserStart = (userData: UserEditStart) => ({ type: USER_ACTION_TYPES.EDIT_USER_START, payload: userData });
export const editUserSuccess = (userData: UserEditSuccess) => ({ type: USER_ACTION_TYPES.EDIT_USER_SUCCESS, payload: userData });
export const editUserFailed = (error: Error) => ({ type: USER_ACTION_TYPES.EDIT_USER_FAILED, payload: error });