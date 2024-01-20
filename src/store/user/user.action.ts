import { USER_ACTION_TYPES } from "./user.types";

export const signInWithEmail = ({ email, password }) => ({ type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START, payload: { email, password } });
export const signInSuccess = (data) => ({ type: USER_ACTION_TYPES.SIGN_IN_SUCCESS, payload: data });
export const signInFailed = ({ error }) => ({ type: USER_ACTION_TYPES.SIGN_IN_FAILED, payload: { error }});