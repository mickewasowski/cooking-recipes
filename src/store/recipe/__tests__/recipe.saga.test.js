import {
    call,
} from 'typed-redux-saga/macro';
import {
    testSaga,
    expectSaga,
} from 'redux-saga-test-plan';
import {
    addRecipe,
    onAddRecipeStart,
    onGetLatestAddedRecipes,
    onGetRecipeCountStart,
    onGetRecipiesPerOwner,
    onGetRecipiesStart,
    onSearchRecipiesStart,
    onUpdateRecipeStart,
    recipeSaga,
    getRecipies,
    getRecipeCount,
    updateRecipe,
    searchRecipies,
    getOwnerRecipies,
    getLatestAddedRecipes
} from '../recipe.saga';
import { RECIPE_ACTION_TYPES } from '../recipe.types';
import { addRecipeRequest, getRecipiesFromDatabase, getRecipeCountFromDatabase, updateRecipeData, searchRecipiesByQueryString, getRecipiesPerOwner, getLatestRecipes } from '../../../utils/recipeUtils';
import { addRecipeSuccess, addRecipeFailed, getRecipiesSuccess, getRecipiesFailed, getRecipeCountSuccess, updateRecipeSuccess, updateRecipeFailed, searchRecipiesSuccess, searchRecipiesFailed, getRecipiesForOwnerSuccess, getLatestRecipiesSuccess } from '../recipe.action';
import { throwError } from 'redux-saga-test-plan/providers';

describe('Recipe saga tests', () => {
    test('recipeSaga', () => {
        //next finds and calls the next yield*
        testSaga(recipeSaga)
            .next()
            .all([
                call(onAddRecipeStart),
                call(onGetRecipiesStart),
                call(onGetRecipeCountStart),
                call(onUpdateRecipeStart),
                call(onSearchRecipiesStart),
                call(onGetRecipiesPerOwner),
                call(onGetLatestAddedRecipes),
            ])
            .next()
            .isDone();
    });

    test('onAddRecipeStart', () => {
        testSaga(onAddRecipeStart)
            .next()
            .takeLatest(RECIPE_ACTION_TYPES.ADD_RECIPE_START, addRecipe)
            .next()
            .isDone();
    });

    test('addRecipe successful request', () => {
        const additionalDataMap = new Map();
        additionalDataMap.set('prepTime', 60);
        const addRecipePayloadObject = {
            payload: {
                title: 'Salad',
                image: 'imageSalad',
                type: 'salad',
                description: 'vegetables',
                userToken: 'someUserToken',
                additionalData: additionalDataMap,
            },
        };
        const recipeRequestReturn = {
            _id: 'springSalad',
            name: 'Salad',
            image: 'imageSalad',
            type: 'salad',
            description: 'vegetables',
            owner: 'testUser123',
            additionalData: additionalDataMap,
            createdAt: 1714752482280,
            updatedAt: 1714752482280,
        };
        const addRecipeSuccessReturn = {
            id: 'springSalad',
            title: 'Salad',
            image: 'imageSalad',
            type: 'salad',
            description: 'vegetables',
            owner: 'testUser123',
            additionalData: additionalDataMap,
            createdAt: 1714752482280,
            updatedAt: 1714752482280,
        };
        return expectSaga(addRecipe, addRecipePayloadObject)
            .provide([
                [call(addRecipeRequest, addRecipePayloadObject.payload), { item: recipeRequestReturn }]
            ])
            .put(addRecipeSuccess(addRecipeSuccessReturn))
            .run();
    });

    test('addRecipe failed request for missing user token', () => {
        const additionalDataMap = new Map();
        additionalDataMap.set('prepTime', 60);
        const addRecipePayloadObject = {
            payload: {
                title: 'Salad',
                image: 'imageSalad',
                type: 'salad',
                description: 'vegetables',
                additionalData: additionalDataMap,
            },
        };
        const mockError = new Error("Token missing");
        return expectSaga(addRecipe, addRecipePayloadObject)
            .provide([
                [call(addRecipeRequest, addRecipePayloadObject.payload), throwError(mockError)]
            ])
            .put(addRecipeFailed(mockError))
            .run();
    });

    test('onGetRecipiesStart', () => {
        testSaga(onGetRecipiesStart)
            .next()
            .takeLatest(RECIPE_ACTION_TYPES.GET_RECIPIES_START, getRecipies)
            .next()
            .isDone();
    });

    test('getRecipies successful request', () => {
        const mockData = {
            payload: {
                page: 1,
                limit: 10,
            }
        };
        const recipesRequestReturn = [
            {
                _id: 'springSalad',
                name: 'Salad',
                image: 'imageSalad',
                type: 'salad',
                description: 'vegetables',
                owner: 'testUser123',
                additionalData: null,
                createdAt: 1714752482280,
                updatedAt: 1714752482280,
            },
            {
                _id: 'chickenSoup',
                name: 'soup',
                image: 'soupImage',
                type: 'soup',
                description: 'tasty soup',
                owner: 'testUser123',
                additionalData: null,
                createdAt: 1714752482280,
                updatedAt: 1714752482280,
            },
        ];
        const mappedRecipesSuccessReturn = [
            {
                id: 'springSalad',
                title: 'Salad',
                image: 'imageSalad',
                type: 'salad',
                description: 'vegetables',
                owner: 'testUser123',
                additionalData: null,
                createdAt: 1714752482280,
                updatedAt: 1714752482280,
            },
            {
                id: 'chickenSoup',
                title: 'soup',
                image: 'soupImage',
                type: 'soup',
                description: 'tasty soup',
                owner: 'testUser123',
                additionalData: null,
                createdAt: 1714752482280,
                updatedAt: 1714752482280,
            },
        ];
        return expectSaga(getRecipies, mockData)
            .provide([
                [call(getRecipiesFromDatabase, mockData.payload), { items: recipesRequestReturn }],
            ])
            .put(getRecipiesSuccess(mappedRecipesSuccessReturn))
            .run();
    });

    test('getRecipies failed request when empty strings provided for page and limit', () => {
        const mockData = {
            payload: {
                page: '',
                limit: '',
            },
        };
        const mockError = new Error("Network request failed");
        return expectSaga(getRecipies, mockData)
            .provide([
                [call(getRecipiesFromDatabase, mockData.payload), throwError(mockError)],
            ])
            .put(getRecipiesFailed(mockError))
            .run();
    });

    test('onGetRecipeCountStart', () => {
        testSaga(onGetRecipeCountStart)
            .next()
            .takeLatest(RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_START, getRecipeCount)
            .next()
            .isDone();
    });

    test('getRecipeCount successful', () => {
        const responseCount = 52;
        const mockResponse = {
            totalRecipeCount: responseCount,
        };

        return expectSaga(getRecipeCount)
            .provide([
                [call(getRecipeCountFromDatabase), { count: responseCount }]
            ])
            .put(getRecipeCountSuccess(mockResponse))
            .run();
    });

    test('onUpdateRecipeStart', () => {
        testSaga(onUpdateRecipeStart)
            .next()
            .takeLatest(RECIPE_ACTION_TYPES.UPDATE_RECIPE_START, updateRecipe)
            .next()
            .isDone();
    });

    test('updateRecipe success', () => {
        const mockRecipe = {
            id: 'myFavSalad',
            title: 'Salad',
            image: 'imageSalad',
            type: 'salad',
            description: 'vegetables',
            userToken: 'someUserToken',
            additionalData: undefined,
            createdAt: undefined,
            updatedAt: undefined,
        };
        const updateRecipeDataObject = {
            payload: {
                ...mockRecipe
            },
        };

        const mockRecipeRequestResponse = {
            _id: 'myFavSalad',
            name: 'Salad',
            image: 'imageSalad',
            type: 'salad',
            description: 'vegetables',
            owner: 'someOwnerUser',
            additionalData: undefined,
            createdAt: undefined,
            updatedAt: undefined,
        };

        const mappedRecipeUpdateSuccess = {
            id: 'myFavSalad',
            title: 'Salad',
            description: 'vegetables',
            image: 'imageSalad',
            type: 'salad',
            owner: 'someOwnerUser',
            additionalData: undefined,
            createdAt: undefined,
            updatedAt: undefined
        }

        return expectSaga(updateRecipe, updateRecipeDataObject)
            .provide([
                [call(updateRecipeData, updateRecipeDataObject.payload), { item: mockRecipeRequestResponse }]
            ])
            .put(updateRecipeSuccess(mappedRecipeUpdateSuccess))
            .run();
    });

    test('updateRecipe failed not found recipe by id', () => {
        const mockRecipe = {
            id: 'myFavSalad',
            title: 'Salad',
            image: 'imageSalad',
            type: 'salad',
            description: 'vegetables',
            userToken: 'someUserToken',
            additionalData: undefined,
            createdAt: undefined,
            updatedAt: undefined,
        };
        const updateRecipeDataObject = {
            payload: {
                ...mockRecipe
            },
        };

        const mockError = new Error("No item found with this ID!");

        return expectSaga(updateRecipe, updateRecipeDataObject)
            .provide([
                [call(updateRecipeData, updateRecipeDataObject.payload), throwError(mockError)]
            ])
            .put(updateRecipeFailed(mockError))
            .run();
    });

    test('onSearchRecipiesStart', () => {
        testSaga(onSearchRecipiesStart)
            .next()
            .takeLatest(RECIPE_ACTION_TYPES.SEARCH_RECIPIES_START, searchRecipies)
            .next()
            .isDone();
    });

    test('searchRecipies success', () => {
        const mockSearchString = 'chicken';
        const mockDataObject = {
            payload: mockSearchString
        };

        const responseItems = [
            {
                _id: 'myFavSalad',
                name: 'Chicken Salad',
                image: 'imageSalad',
                type: 'salad',
                description: 'vegetables and chicken',
                owner: 'someOwnerUser',
                additionalData: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            },
        ];

        const mappedResponseItems = [
            {
                id: 'myFavSalad',
                title: 'Chicken Salad',
                image: 'imageSalad',
                type: 'salad',
                description: 'vegetables and chicken',
                owner: 'someOwnerUser',
                additionalData: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            },
        ];

        return expectSaga(searchRecipies, mockDataObject)
            .provide([
                [call(searchRecipiesByQueryString, mockSearchString), { items: responseItems, count: 1 }]
            ])
            .put(searchRecipiesSuccess({ recipies: mappedResponseItems, count: 1 }))
            .run();
    });

    test('searchRecipies failed', () => {
        const mockError = new Error('No items found!');
        const mockSearchString = 'gummies';
        return expectSaga(searchRecipies, { payload: mockSearchString })
            .provide([
                [call(searchRecipiesByQueryString, mockSearchString), throwError(mockError)]
            ])
            .put(searchRecipiesFailed(mockError))
            .run();
    });

    test('onGetRecipiesPerOwner', () => {
        testSaga(onGetRecipiesPerOwner)
            .next()
            .takeLatest(RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES_START, getOwnerRecipies)
            .next()
            .isDone();
    });

    test('getOwnerRecipies success', () => {
        const mockData = {
            payload: {
                ownerId: 'someOwnerUser',
                userToken: 'someTestUserToken'
            },
        };

        const responseItems = [
            {
                _id: 'myFavSalad',
                name: 'Chicken Salad',
                image: 'imageSalad',
                type: 'salad',
                description: 'vegetables and chicken',
                owner: 'someOwnerUser',
                additionalData: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            },
        ];

        const mappedResponseItems = [
            {
                id: 'myFavSalad',
                title: 'Chicken Salad',
                image: 'imageSalad',
                type: 'salad',
                description: 'vegetables and chicken',
                owner: 'someOwnerUser',
                additionalData: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            },
        ];

        return expectSaga(getOwnerRecipies, mockData)
            .provide([
                [call(getRecipiesPerOwner, mockData.payload), { items: responseItems, count: 1 }]
            ])
            .put(getRecipiesForOwnerSuccess({ recipies: mappedResponseItems, count: 1 }))
            .run();
    });

    test('onGetLatestAddedRecipes', () => {
        testSaga(onGetLatestAddedRecipes)
            .next()
            .takeLatest(RECIPE_ACTION_TYPES.GET_LATEST_ADDED_RECIPES_START, getLatestAddedRecipes)
            .next()
            .isDone();
    });

    test('getLatestAddedRecipes success', () => {
        const responseItems = [
            {
                _id: 'myFavSalad',
                name: 'Chicken Salad',
                image: 'imageSalad',
                type: 'salad',
                description: 'vegetables and chicken',
                owner: 'someOwnerUser',
                additionalData: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            },
        ];

        const mappedResponseItems = [
            {
                id: 'myFavSalad',
                title: 'Chicken Salad',
                image: 'imageSalad',
                type: 'salad',
                description: 'vegetables and chicken',
                owner: 'someOwnerUser',
                additionalData: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            },
        ];

        return expectSaga(getLatestAddedRecipes)
            .provide([
                [call(getLatestRecipes), { items: responseItems }]
            ])
            .put(getLatestRecipiesSuccess(mappedResponseItems))
            .run();
    });
});
