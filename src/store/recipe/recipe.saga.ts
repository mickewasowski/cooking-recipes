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
    searchRecipiesFailed,
    getRecipiesForOwnerSuccess,
    getRecipiesForOwnerFailed,
    AddRecipeStart,
    UpdateRecipeStart,
    SearchRecipeStart,
    GetOwnerRecipes,
    GetRecipes,
} from './recipe.action';
import {
    addRecipeRequest,
    getRecipiesFromDatabase,
    getRecipeCountFromDatabase,
    updateRecipeData,
    searchRecipiesByQueryString,
    mapItemsFromDB,
    mapSingleItemFromDB,
    getRecipiesPerOwner
} from '../../utils/recipeUtils';

function* addRecipe(data: AddRecipeStart) {
    try {
        const { title, description, image, userToken, type, additionalData } = data.payload;
        const response = yield* call(addRecipeRequest, { title, description, image, userToken, type, additionalData });

        if (response.success) {
            const recipe = mapSingleItemFromDB(response.item);

            yield* put(addRecipeSuccess(recipe));
        } else {
            yield* put(addRecipeFailed(new Error(response.message)));
        }
    } catch (error) {
        yield* put(addRecipeFailed(error as Error));
    }
}

function* getRecipies(data: GetRecipes) {
    try {
        const { payload: { page, limit }} = data;
        const response = yield* call(getRecipiesFromDatabase, { page, limit });

        if (response.success) {
            const recipies = mapItemsFromDB(response.items);

            yield* put(getRecipiesSuccess(recipies));
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

function* updateRecipe({ payload: { id, title, description, image, userToken, type, additionalData }}: UpdateRecipeStart) {
    try {
        const response = yield* call(updateRecipeData, { id, title, description, image, userToken, type, additionalData });

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

function* searchRecipies({ payload: searchString }: SearchRecipeStart) {
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

function* getOwnerRecipies({ payload: { ownerId, userToken }}: GetOwnerRecipes) {
    try {
        const response = yield* call(getRecipiesPerOwner, { ownerId, userToken });

        if (response.success) {
            const mappedRecipies = mapItemsFromDB(response.items);
            yield* put(getRecipiesForOwnerSuccess({ recipies: mappedRecipies, count: response.count }));
        } else {
            yield* put(getRecipiesForOwnerFailed(response.message as Error));
        }
    } catch (error) {
        yield* put(getRecipiesForOwnerFailed(error as Error));
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

export function* onGetRecipiesPerOwner() {
    yield* takeLatest(RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES_START, getOwnerRecipies);
}

export function* recipeSaga() {
    yield* all([
        call(onAddRecipeStart),
        call(onGetRecipiesStart),
        call(onGetRecipeCountStart),
        call(onUpdateRecipeStart),
        call(onSearchRecipiesStart),
        call(onGetRecipiesPerOwner),
    ])
}