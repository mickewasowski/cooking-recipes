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
} from '../recipe.saga';
import { RECIPE_ACTION_TYPES } from '../recipe.types';
import { addRecipeRequest } from '../../../utils/recipeUtils';
import { addRecipeSuccess } from '../recipe.action';

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

    //TODO: write tests for the rest of the sagas and also for failing attempts
});
