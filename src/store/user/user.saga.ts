import { emailSignIn, registerUser, updateUserData } from '../../utils/userUtils';
import { call, takeLatest, put, all } from 'redux-saga/effects';
import {
    signInFailed,
    signInSuccess,
    signOutSuccess,
    signOutFailed,
    registerSuccess,
    registerFailed,
    editUserSuccess,
    editUserFailed,
    EmailSignInStart,
    RegisterStart,
    EditStart
} from './user.action';
import { USER_ACTION_TYPES, UserEditSuccess } from './user.types';
import { User } from './user.reducer';

export function* loginUserWithEmail({ payload: { email, password } }: EmailSignInStart) {
    try {
        const response = yield call(emailSignIn, { email, password });
        yield put(signInSuccess(response.user as User));
    } catch (error) {
        yield put(signInFailed(error as Error));
    }
}

export function* userSignOut() {
    try {
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error as Error));
    }
}

export function* userRegister({ payload: { email, fullName, password }}: RegisterStart) {
    try {
        yield call(registerUser, { email, fullName, password });
        yield put(registerSuccess());
    } catch (error) {
        yield put(registerFailed(error as Error));
    }
}

export function* userEdit({ payload: { email, fullName, password, newPassword, token }}: EditStart) {
    try {
        const response = yield call(updateUserData, { email, fullName, password, newPassword, token });
        yield put(editUserSuccess(response.user as UserEditSuccess));
    } catch (error) {
        yield put(editUserFailed(error as Error));
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, loginUserWithEmail);
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, userSignOut);
}

export function* onRegisterStart() {
    yield takeLatest(USER_ACTION_TYPES.REGISTER_START, userRegister);
}

export function* onEditUserStart() {
    yield takeLatest(USER_ACTION_TYPES.EDIT_USER_START, userEdit);
}

export function* userSagas() {
    yield all([
        call(onEmailSignInStart),
        call(onSignOutStart),
        call(onRegisterStart),
        call(onEditUserStart),
    ]);
}