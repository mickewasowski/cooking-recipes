export enum USER_ACTION_TYPES {
    EMAIL_SIGN_IN = 'user/fetchEmailSignIn',
    REGISTER = 'user/fetchUserRegister',
    EDIT_USER = 'user/fetchUserEdit',
}

export type UserSignIn = {
    email: string;
    password: string;
}

export type UserRegister = UserSignIn & {
    fullName: string;
}

export type UserEditStart = UserRegister & {
    newPassword: string | null;
    token: string;
}

export type UserEditSuccess = {
    id: string;
    email: string;
    fullName: string;
    token: string;
}
