export enum USER_ACTION_TYPES {
    EMAIL_SIGN_IN_START = 'user/EMAIL_SIGN_IN_START',
    SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS',
    SIGN_IN_FAILED = 'user/SIGN_IN_FAILED',
    SIGN_OUT_START = 'user/SIGN_OUT_START',
    SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILED = 'user/SIGN_OUT_FAILED',
    REGISTER_START = 'user/REGISTER_START',
    REGISTER_SUCCESS = 'user/REGISTER_SUCCESS',
    REGISTER_FAILED = 'user/REGISTER_FAILED',
    EDIT_USER_START = 'user/EDIT_USER_START',
    EDIT_USER_SUCCESS = 'user/EDIT_USER_SUCCESS',
    EDIT_USER_FAILED = 'user/EDIT_USER_FAILED',
}

export type UserSignIn = {
    email: string;
    password: string;
}

export type UserRegisterStart = UserSignIn & {
    fullName: string;
}

export type UserEditStart = UserRegisterStart & {
    newPassword: string;
    token: string;
}

export type UserEditSuccess = {
    id: string;
    email: string;
    fullName: string;
    token: string;
}
