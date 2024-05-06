import {
    getCurrentUser,
    getIsUserLoading,
    getSuccessMessage,
    getUserError
} from '../user.selector';

const mockUser = {
    email: 'tets@example.com',
    fullName: 'John Doe',
    token: 'testToken',
    id: 'testId',
};
const mockError = new Error('Something went wrong!');
const mockUserState = {
    currentUser: mockUser,
    isLoading: false,
    error: mockError,
    successMessage: null,
};

describe('User selector', () => {
    test('getCurrentUser', () => {
        expect(getCurrentUser(mockUserState)).toEqual(mockUserState.currentUser);
    });

    test('getIsUserLoading', () => {
        expect(getIsUserLoading(mockUserState)).toEqual(mockUserState.isLoading);
    });

    test('getSuccessMessage', () => {
        expect(getSuccessMessage(mockUserState)).toEqual(mockUserState.successMessage);
    });

    test('getUserError', () => {
        expect(getUserError(mockUserState)).toEqual(mockUserState.error);
    });
});
