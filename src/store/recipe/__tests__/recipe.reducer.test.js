import {
    recipeReducer,
    INITIAL_STATE
} from '../recipe.reducer';
import {
    addRecipeStart,
    addRecipeSuccess,
    addRecipeFailed,
    getRecipiesStart,
    getRecipiesSuccess,
    getRecipiesFailed,
    getLatestRecipiesStart,
    getLatestRecipiesSuccess,
    getLatestRecipiesFailed,
    getRecipeCountStart,
    getRecipeCountSuccess,
    getRecipeCountFailed,
    updateRecipeStart,
    updateRecipeSuccess,
    updateRecipeFailed,
    searchRecipiesStart,
    searchRecipiesSuccess,
    searchRecipiesFailed,
    getRecipiesForOwnerStart,
    getRecipiesForOwnerSuccess,
    getRecipiesForOwnerFailed,
} from '../recipe.action';

describe('Recipe reducer tests', () => {
    test('addRecipeStart', () => {
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true,
        };

        expect(recipeReducer(INITIAL_STATE, addRecipeStart())).toEqual(expectedState);
    });

    test('addRecipeSuccess', () => {
        const mockData = {
                title: 'Chicken salad',
                image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/10/Chicken-Salad-main-1.jpg',
                type: 'salad',
                description: 'tasty salad with chicken and grapes',
                id: 'chickenSaladGrapes',
                owner: 'someTestUser123',
                createdAt: Date.now(),
                updatedAt: Date.now(),
        };
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            recipies: [ mockData ],
        };

        expect(recipeReducer(INITIAL_STATE, addRecipeSuccess(mockData))).toEqual(expectedState);
    });

    test('addRecipeFailed', () => {
        const mockError = new Error('Something went wrong');
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            error: mockError,
        }

        expect(recipeReducer(INITIAL_STATE, addRecipeFailed(mockError))).toEqual(expectedState);
    });

    test('getRecipiesStart', () => {
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true,
        };

        expect(recipeReducer(INITIAL_STATE, getRecipiesStart())).toEqual(expectedState);
    });

    test('getRecipiesSuccess', () => {
        const mockData = [
            {
                title: 'Chicken salad',
                image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/10/Chicken-Salad-main-1.jpg',
                type: 'salad',
                description: 'tasty salad with chicken and grapes',
                id: 'chickenSaladGrapes',
                owner: 'someTestUser123',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        ];
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            recipies: mockData,
        };

        expect(recipeReducer(INITIAL_STATE, getRecipiesSuccess(mockData))).toEqual(expectedState);
    });

    test('getRecipiesFailed', () => {
        const mockError = new Error('Something went wrong!');
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            error: mockError,
        };

        expect(recipeReducer(INITIAL_STATE, getRecipiesFailed(mockError))).toEqual(expectedState);
    });

    test('getLatestRecipiesStart', () => {
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true,
        };

        expect(recipeReducer(INITIAL_STATE, getLatestRecipiesStart())).toEqual(expectedState);
    });

    test('getLatestRecipiesSuccess', () => {
        const mockData = [
            {
                title: 'Chicken salad',
                image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/10/Chicken-Salad-main-1.jpg',
                type: 'salad',
                description: 'tasty salad with chicken and grapes',
                id: 'chickenSaladGrapes',
                owner: 'someTestUser123',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        ];
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            latestAdded: mockData,
        };

        expect(recipeReducer(INITIAL_STATE, getLatestRecipiesSuccess(mockData))).toEqual(expectedState);
    });

    test('getLatestRecipiesFailed', () => {
        const mockError = new Error('Something went wrong!');
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            error: mockError,
        };

        expect(recipeReducer(INITIAL_STATE, getLatestRecipiesFailed(mockError))).toEqual(expectedState);
    });

    test('getRecipeCountStart', () => {
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true,
        };

        expect(recipeReducer(INITIAL_STATE, getRecipeCountStart())).toEqual(expectedState);
    });

    test('getRecipeCountSuccess', () => {
        const expectedRecipesCount = 54;
        const mockData = {
            totalRecipeCount: 54
        }
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            totalRecipeCount: expectedRecipesCount
        };

        expect(recipeReducer(INITIAL_STATE, getRecipeCountSuccess(mockData))).toEqual(expectedState);
    });

    test('getRecipeCountFailed', () => {
        const mockError = new Error('Something went wrong!');
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            error: mockError,
        };

        expect(recipeReducer(INITIAL_STATE, getRecipeCountFailed(mockError))).toEqual(expectedState);
    });

    test('updateRecipeStart', () => {
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true,
        };

        expect(recipeReducer(INITIAL_STATE, updateRecipeStart())).toEqual(expectedState);
    });

    test('updateRecipeSuccess', () => {
        const mockRecipe1 = {
            title: 'Chicken salad',
            image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/10/Chicken-Salad-main-1.jpg',
            type: 'salad',
            description: 'tasty salad with chicken and grapes',
            id: 'chickenSaladGrapes',
            owner: 'someTestUser123',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        const mockRecipe2 = {
            title: 'Chicken soup',
            image: 'testUrl',
            type: 'soup',
            description: 'tasty chicken soup',
            id: 'chickenSoup',
            owner: 'someTestUser123',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        const mockInitialState = {
            ...INITIAL_STATE,
            recipies: [ mockRecipe1 ],
        };

        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            recipies: [ mockRecipe1, mockRecipe2 ],
        };

        expect(recipeReducer(mockInitialState, updateRecipeSuccess(mockRecipe2))).toEqual(expectedState);
    });

    test('updateRecipeFailed', () => {
        const mockError = new Error('Something went wrong!');
        const expectedState = {
            ...INITIAL_STATE,
            error: mockError,
        };

        expect(recipeReducer(INITIAL_STATE, updateRecipeFailed(mockError))).toEqual(expectedState);
    });

    test('searchRecipiesStart', () => {
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true,
        };

        expect(recipeReducer(INITIAL_STATE, searchRecipiesStart())).toEqual(expectedState);
    });

    test('searchRecipiesSuccess', () => {
        const mockRecipies = [
            {
                title: 'Chicken salad',
                image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/10/Chicken-Salad-main-1.jpg',
                type: 'salad',
                description: 'tasty salad with chicken and grapes',
                id: 'chickenSaladGrapes',
                owner: 'someTestUser123',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                title: 'Chicken soup',
                image: 'testUrl',
                type: 'soup',
                description: 'tasty chicken soup',
                id: 'chickenSoup',
                owner: 'someTestUser123',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }
        ];
        const mockData = {
            recipies: mockRecipies,
            count: 2
        };

        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            recipies: mockRecipies,
            totalRecipeCount: 2,
        };

        expect(recipeReducer(INITIAL_STATE, searchRecipiesSuccess(mockData))).toEqual(expectedState);
    });

    test('searchRecipiesFailed', () => {
        const mockError = new Error('Something went wrong!');
        const expectedState = {
            ...INITIAL_STATE,
            error: mockError,
        };

        expect(recipeReducer(INITIAL_STATE, searchRecipiesFailed(mockError))).toEqual(expectedState);
    });

    test('getRecipiesForOwnerStart', () => {
        const expectedState = {
            ...INITIAL_STATE,
            isLoading: true,
        };

        expect(recipeReducer(INITIAL_STATE, getRecipiesForOwnerStart())).toEqual(expectedState);
    });

    test('getRecipiesForOwnerSuccess', () => {
        const mockRecipies = [
            {
                title: 'Chicken salad',
                image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/10/Chicken-Salad-main-1.jpg',
                type: 'salad',
                description: 'tasty salad with chicken and grapes',
                id: 'chickenSaladGrapes',
                owner: 'someTestUser123',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                title: 'Chicken soup',
                image: 'testUrl',
                type: 'soup',
                description: 'tasty chicken soup',
                id: 'chickenSoup',
                owner: 'someTestUser123',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }
        ];
        const mockData = {
            recipies: mockRecipies,
            count: 2
        };

        const expectedState = {
            ...INITIAL_STATE,
            isLoading: false,
            recipies: mockRecipies,
            totalRecipeCount: 2,
        };

        expect(recipeReducer(INITIAL_STATE, getRecipiesForOwnerSuccess(mockData))).toEqual(expectedState);
    });

    test('getRecipiesForOwnerFailed', () => {
        const mockError = new Error('Something went wrong!');
        const expectedState = {
            ...INITIAL_STATE,
            error: mockError,
        };

        expect(recipeReducer(INITIAL_STATE, getRecipiesForOwnerFailed(mockError))).toEqual(expectedState);
    });
});
