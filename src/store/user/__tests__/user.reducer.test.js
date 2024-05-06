import { INITIAL_STATE, userReducer, UserSuccessMessage } from '../user.reducer';
import {
    signInWithEmail,
    signInSuccess,
    signInFailed,
    signOutStart,
    signOutSuccess,
    signOutFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    editUserStart,
    editUserSuccess,
    editUserFailed
} from '../user.action';

describe('User reducer', () => {
    test('signInWithEmail', () => {
        const mockUserData = {
            email: 'test@exampl.com',
            password: 'P@ssword21',
        };
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true,
        };

        expect(userReducer(INITIAL_STATE, signInWithEmail(mockUserData))).toEqual(expectedState);
    });

    test('signInSuccess', () => {
        const mockUser = {
            email: 'test@example.com',
            fullName: 'John Doe',
            token: 'testToken',
            id: 'userId',
        };
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            currentUser: mockUser,
            successMessage: null,
        };

        expect(userReducer(INITIAL_STATE, signInSuccess(mockUser))).toEqual(expectedState);
    });

    test('signInFailed', () => {
        const mockError = new Error('Something went wrong!');
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            error: mockError.message,
        };

        expect(userReducer(INITIAL_STATE, signInFailed(mockError))).toEqual(expectedState);
    });

    test('signOutStart', () => {
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true,
        };

        expect(userReducer(INITIAL_STATE, signOutStart())).toEqual(expectedState);
    });

    test('signOutSuccess', () => {
        const mockUser = {
            email: 'test@example.com',
            fullName: 'John Doe',
            token: 'testToken',
            id: 'userId',
        };
        const mockedInitialState = {
            ...INITIAL_STATE,
            currentUser: mockUser,
        };

        expect(userReducer(mockedInitialState, signOutSuccess())).toEqual(INITIAL_STATE);
    });

    test('signOutFailed', () => {
        const mockError = new Error('Something went wrong!');
        const expectedState = {
            ...INITIAL_STATE,
            error: mockError,
            isLoading: false,
        };
        expect(userReducer(INITIAL_STATE, signOutFailed({ error: mockError }))).toEqual(expectedState);
    });

    test('registerStart', () => {
        const mockUser = {
            email: 'test@exampl.com',
            password: 'P@ssword21',
            fullName: 'John Doe',
        };
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true,
        };

        expect(userReducer(INITIAL_STATE, registerStart(mockUser))).toEqual(expectedState);
    });

    test('registerSuccess', () => {
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            successMessage: UserSuccessMessage.registrationSuccess
        };

        expect(userReducer(INITIAL_STATE, registerSuccess())).toEqual(expectedState);
    });

    test('registerFailed', () => {
        const mockError = new Error('Something went wrong!');
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            error: mockError,
        };

        expect(userReducer(INITIAL_STATE, registerFailed({error: mockError}))).toEqual(expectedState);
    });

    test('editUserStart', () => {
        const mockUser = {
            email: 'test@exampl.com',
            password: 'P@ssword21',
            fullName: 'John Doe',
            newPassword: 'newP@ssword',
            token: 'someTestToken',
        };

        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true,
        };

        expect(userReducer(INITIAL_STATE, editUserStart(mockUser))).toEqual(expectedState);
    });

    test('editUserSuccess', () => {
        const mockUser = {
            id: 'testId',
            email: 'test@exampl.com',
            password: 'P@ssword21',
            fullName: 'John Doe',
            newPassword: 'newP@ssword',
            token: 'someTestToken',
        };

        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            currentUser: mockUser,
        };

        expect(userReducer(INITIAL_STATE, editUserSuccess(mockUser))).toEqual(expectedState);
    });

    test('editUserFailed', () => {
        const mockError = new Error('Something went wrong!');
        const expectedState = {
            ...INITIAL_STATE,
            error: mockError,
        };

        expect(userReducer(INITIAL_STATE, editUserFailed({ error: mockError }))).toEqual(expectedState);
    });
});
