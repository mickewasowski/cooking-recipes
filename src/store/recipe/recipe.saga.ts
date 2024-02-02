import { all, put, call, takeLatest } from 'typed-redux-saga';
import { RECIPE_ACTION_TYPES } from './recipe.types';
import {
    addRecipeFailed,
    addRecipeSuccess,
    getRecipiesSuccess,
    getRecipiesFailed,
    getRecipeCountFailed,
    getRecipeCountSuccess,
    updateRecipeSuccess,
    updateRecipeFailed,
    searchRecipiesSuccess,
    searchRecipiesFailed
} from './recipe.action';
import {
    addRecipeRequest,
    getRecipiesFromDatabase,
    getRecipeCountFromDatabase,
    updateRecipeData,
    searchRecipiesByQueryString,
    mapItemsFromDB,
    mapSingleItemFromDB,
} from '../../utils/recipeUtils';

function* addRecipe(data) {
    try {
        const { title, description, image, userToken, type, additionalData } = data.payload;
        const response = yield* call(addRecipeRequest, { title, description, image, userToken, type, additionalData });

        if (response.success) {
            const recipe = mapSingleItemFromDB(response.item);

            yield* put(addRecipeSuccess({ title: recipe.title, description: recipe.description, image: recipe.imageUrl, type: recipe.type, owner: recipe.owner, additionalData: recipe.additionalData, id: recipe.id, createdAt: recipe.createdAt, updatedAt: recipe.updatedAt }));
        } else {
            yield* put(addRecipeFailed(new Error(response.message)));
        }
    } catch (error) {
        yield* put(addRecipeFailed(error as Error));
    }
}

function* getRecipies(data) {
    try {
        const response = yield* call(getRecipiesFromDatabase, { page: data.payload.page, limit: data.payload.limit });

        if (response.success) {
            const mappedRecipies = mapItemsFromDB(response.items);

            yield* put(getRecipiesSuccess({ recipies: mappedRecipies }));
        } else {
            yield* put(getRecipiesFailed(new Error(response.message)));
        }
    } catch (error) {
        yield* put(getRecipiesFailed(error as Error));
    }
}

function* getRecipeCount() {
    try {
        const response = yield* call(getRecipeCountFromDatabase);

        if (response.success) {
            yield* put(getRecipeCountSuccess({ totalRecipeCount: response.count }));
        } else {
            yield* put(getRecipeCountFailed(new Error(response.message)));
        }
    } catch (error) {
        yield* put(getRecipeCountFailed(error as Error));
    }
}

function* updateRecipe({ payload: { _id, title, description, image, userToken, type, additionalData }}) {
    try {
        const response = yield* call(updateRecipeData, { _id, title, description, image, userToken, type, additionalData });

        if (response.success) {
            const recipe = mapSingleItemFromDB(response.item);

            yield* put(updateRecipeSuccess({...recipe}));
        } else {
            yield* put(updateRecipeFailed(response.message as Error));
        }
    } catch (error) {
        yield* put(updateRecipeFailed(error as Error));
    }
}

function* searchRecipies({ payload: searchString }) {
    try {
        const response = yield* call(searchRecipiesByQueryString, searchString);

        if (response.success) {
            const mappedRecipies = mapItemsFromDB(response.items);
            yield* put(searchRecipiesSuccess({ recipies: mappedRecipies, count: response.count }));
        } else {
            yield* put(searchRecipiesFailed(response.message as Error));
        }
    } catch (error) {
        yield* put(searchRecipiesFailed(error as Error));
    }
}

export function* onAddRecipeStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.ADD_RECIPE_START, addRecipe);
}

export function* onGetRecipiesStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.GET_RECIPIES_START, getRecipies);
}

export function* onGetRecipeCountStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_START, getRecipeCount);
}

export function* onUpdateRecipeStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.UPDATE_RECIPE_START, updateRecipe);
}

export function* onSearchRecipiesStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.SEARCH_RECIPIES_START, searchRecipies);
}

export function* recipeSaga() {
    yield* all([
        call(onAddRecipeStart),
        call(onGetRecipiesStart),
        call(onGetRecipeCountStart),
        call(onUpdateRecipeStart),
        call(onSearchRecipiesStart),
    ])
}