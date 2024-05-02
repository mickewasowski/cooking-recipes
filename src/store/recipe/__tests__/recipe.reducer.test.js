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
    getRecipeCountFailed
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

    //TODO: write tests for the rest of the reducer actions
});
