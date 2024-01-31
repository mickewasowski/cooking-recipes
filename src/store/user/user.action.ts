import { USER_ACTION_TYPES } from "./user.types";
import { User } from "./user.reducer";

export const signInWithEmail = ({ email, password }) => ({ type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START, payload: { email, password } });
export const signInSuccess = (user: User) => ({ type: USER_ACTION_TYPES.SIGN_IN_SUCCESS, payload: user });
export const signInFailed = (error: Error) => ({ type: USER_ACTION_TYPES.SIGN_IN_FAILED, payload: error });

export const signOutStart = () => ({ type: USER_ACTION_TYPES.SIGN_OUT_START });
export const signOutSuccess = () => ({ type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS });
export const signOutFailed = (error: Error) => ({ type: USER_ACTION_TYPES.SIGN_OUT_FAILED, payload: error });

export const registerStart = ({ email, fullName, password }) => ({ type: USER_ACTION_TYPES.REGISTER_START, payload: { email, fullName, password } });
export const registerSuccess = () => ({ type: USER_ACTION_TYPES.REGISTER_SUCCESS });
export const registerFailed = (error: Error) => ({ type: USER_ACTION_TYPES.REGISTER_FAILED, payload: error });

export const editUserStart = ({ email, fullName, password, newPassword, token }) => ({ type: USER_ACTION_TYPES.EDIT_USER_START, payload: { email, fullName, password, newPassword, token } });
export const editUserSuccess = ({ id, email, fullName, token }) => ({ type: USER_ACTION_TYPES.EDIT_USER_SUCCESS, payload: { id, email, fullName, token } });
export const editUserFailed = (error: Error) => ({ type: USER_ACTION_TYPES.EDIT_USER_FAILED, payload: error });