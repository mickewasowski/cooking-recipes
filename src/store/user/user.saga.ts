import { emailSignIn, registerUser } from '../../utils/userUtils';
import { call, takeLatest, put, all } from 'typed-redux-saga';
import { signInFailed, signInSuccess, signOutSuccess, signOutFailed, registerSuccess, registerFailed } from './user.action';
import { USER_ACTION_TYPES } from './user.types';

function* loginUserWithEmail({ payload: { email, password }}) {
    try {
        const response = yield* call(emailSignIn, { email, password });
        if (response.success) {
            yield* put(signInSuccess(response.user));
        } else {
            const errorMessage = new Error(response.message);
            yield put(signInFailed(errorMessage));
        }
    } catch (error) {
        yield put(signInFailed(error as Error));
    }
}

export function* userSignOut() {
    try {
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* userRegister({ payload: { email, fullName, password }}) {
    try {
        const response = yield* call(registerUser, { email, fullName, password });

        if (response.success) {
            yield* put(registerSuccess());
        } else {
            yield* put(registerFailed(response.message as Error));
        }
    } catch (error) {
        yield* put(registerFailed(error as Error));
    }
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, loginUserWithEmail);
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, userSignOut);
}

export function* onRegisterStart() {
    yield* takeLatest(USER_ACTION_TYPES.REGISTER_START, userRegister);
}

export function* userSagas() {
    yield* all([
        call(onEmailSignInStart),
        call(onSignOutStart),
        call(onRegisterStart),
    ]);
}