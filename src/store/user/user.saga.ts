import { emailSignIn } from '../../utils/userUtils';
import { call, takeLatest, put, all } from 'typed-redux-saga';
import { signInFailed, signInSuccess } from './user.action';
import { USER_ACTION_TYPES } from './user.types';

export function* loginUserWithEmail({ payload: { email, password }}) {
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

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, loginUserWithEmail);
}

export function* userSagas() {
    yield* all([
        call(onEmailSignInStart),
    ]);
}