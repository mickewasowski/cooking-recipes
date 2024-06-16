// **Deprecated tests
//these were meant to test the sagas when I was still using the Redux core version
//migrated to Redux toolkit and there is no longer need

// import {
//     loginUserWithEmail,
//     onEditUserStart,
//     onEmailSignInStart,
//     onRegisterStart,
//     onSignOutStart,
//     userEdit,
//     userRegister,
//     userSagas,
//     userSignOut
// } from '../user.saga';
// import {
//     call
// } from 'redux-saga/effects';
// import {
//     testSaga,
//     expectSaga
// } from 'redux-saga-test-plan';
// import { USER_ACTION_TYPES } from '../user.types';
// import { emailSignIn, registerUser, updateUserData } from '../../../utils/userUtils';
// import { editUserFailed, editUserSuccess, registerFailed, registerSuccess, signInFailed, signInSuccess, signOutSuccess } from '../user.action';
// import { throwError } from 'redux-saga-test-plan/providers';

// describe('User saga', () => {
//     test('userSagas', () => {
//         testSaga(userSagas)
//             .next()
//             .all([
//                 call(onEmailSignInStart),
//                 call(onSignOutStart),
//                 call(onRegisterStart),
//                 call(onEditUserStart),
//             ])
//             .next()
//             .isDone();
//     });

//     test('onEmailSignInStart', () => {
//         testSaga(onEmailSignInStart)
//             .next()
//             .takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, loginUserWithEmail)
//             .next()
//             .isDone();
//     });

//     test('loginUserWithEmail success', () => {
//         const mockUserData = {
//             email: 'test@example.com',
//             password: 'P@ssword21',
//         }
//         const mockedData = {
//             payload: mockUserData
//         };
//         const mockUserResponseSuccess = {
//             email: 'test@example.com',
//             fullName: 'John Doe',
//             token: 'testToken',
//             id: 'testId',
//         }
//         return expectSaga(loginUserWithEmail, mockedData)
//             .provide([
//                 [call(emailSignIn, mockedData.payload), { user: mockUserResponseSuccess }]
//             ])
//             .put(signInSuccess(mockUserResponseSuccess))
//             .run();
//     });

//     test('loginUserWithEmail failed', () => {
//         const mockUserData = {
//             email: 'test@example.com',
//             password: 'P@ssword21',
//         }
//         const mockedData = {
//             payload: mockUserData
//         };
//         const mockError = new Error('User not found');

//         return expectSaga(loginUserWithEmail, mockedData)
//             .provide([
//                 [call(emailSignIn, { email: '', password: '' }), throwError(mockError)]
//             ])
//             .put(signInFailed(mockError))
//             .run();
//     });

//     test('onSignOutStart', () => {
//         testSaga(onSignOutStart)
//             .next()
//             .takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, userSignOut)
//             .next()
//             .isDone();
//     });

//     test('userSignOut success', () => {
//         return expectSaga(userSignOut)
//             .put(signOutSuccess())
//             .run();
//     });

//     test('onRegisterStart', () => {
//         testSaga(onRegisterStart)
//             .next()
//             .takeLatest(USER_ACTION_TYPES.REGISTER_START, userRegister)
//             .next()
//             .isDone();
//     });

//     test('userRegister success', () => {
//         const mockUser = {
//             email: 'test@example.com',
//             fullName: 'John Doe',
//             password: 'P@ssword',
//         };
//         const mockData = {
//             payload: mockUser
//         };

//         return expectSaga(userRegister, mockData)
//             .provide([
//                 [call(registerUser, mockUser)]
//             ])
//             .put(registerSuccess())
//             .run();
//     });

//     test('userRegister failed', () => {
//         const mockUser = {
//             email: 'test@example.com',
//             fullName: 'John Doe',
//             password: 'P@ssword',
//         };
//         const mockData = {
//             payload: mockUser
//         };
//         const mockError = new Error('Email is already registered');
//         return expectSaga(userRegister, mockData)
//             .provide([
//                 [call(registerUser, mockUser), throwError(mockError)]
//             ])
//             .put(registerFailed(mockError))
//             .run();
//     });

//     test('onEditUserStart', () => {
//         testSaga(onEditUserStart)
//             .next()
//             .takeLatest(USER_ACTION_TYPES.EDIT_USER_START, userEdit)
//             .next()
//             .isDone();
//     });

//     test('userEdit success', () => {
//         const mockUser = {
//             email: 'test@example.com',
//             fullName: 'John Doe',
//             password: 'P@ssword',
//             newPassword: 'newP@ssword',
//             token: 'testToken'
//         };
//         const mockData = {
//             payload: mockUser
//         };
        
//         const mockUserResponse = {
//             id: 'testId',
//             email: 'test@example.com',
//             fullName: 'John Doe',
//             token: 'testToken',
//         };

//         return expectSaga(userEdit, mockData)
//             .provide([
//                 [call(updateUserData, mockUser), { user: mockUserResponse }]
//             ])
//             .put(editUserSuccess(mockUserResponse))
//             .run();
//     });

//     test('userEdit failed', () => {
//         const mockUser = {
//             email: 'test@example.com',
//             fullName: 'John Doe',
//             password: 'P@ssword',
//             newPassword: 'newP@ssword',
//             token: 'testToken'
//         };
//         const mockData = {
//             payload: mockUser
//         };
        
//         const mockError = new Error('Unauthorized');

//         return expectSaga(userEdit, mockData)
//             .provide([
//                 [call(updateUserData, mockUser), throwError(mockError)]
//             ])
//             .put(editUserFailed(mockError))
//             .run();
//     });
// });
