import { USER_ACTION_TYPES } from "./user.types";
import { AnyAction } from "redux-saga";

export type User = {
    email: string;
    fullName: string;
    token: string;
    id: string;
};

export type UserState = {
    readonly currentUser: User | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};

export const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
    switch(action.type) {
        case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
            return { ...state, isLoading: true };
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return { ...state, isLoading: false, currentUser: action.payload };
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return { ...state, isLoading: false, error: action.payload.message };
        case USER_ACTION_TYPES.SIGN_OUT_START:
            return { ...state, isLoading: true };
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return { ...state, isLoading: false, currentUser: null };
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
            return { ...state, isLoading: false, error: action.payload.error };
        default:
            return state;
    }
}