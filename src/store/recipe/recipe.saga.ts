import { all, put, call, takeLatest } from 'redux-saga/effects';
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
    GetRecipesType,
    getLatestRecipiesSuccess,
    getLatestRecipiesFailed,
    getOwnedRecipeCountSuccess,
    getOwnedRecipeCountFailed,
} from './recipe.action';
import {
    addRecipeRequest,
    getRecipiesFromDatabase,
    getRecipeCountFromDatabase,
    updateRecipeData,
    searchRecipiesByQueryString,
    mapItemsFromDB,
    mapSingleItemFromDB,
    getRecipiesPerOwner,
    getLatestRecipes,
    getRecipesCountPerOwner
} from '../../utils/recipeUtils';
import { redirectToStart } from '../routing/routing.action';

export function* addRecipe(data: AddRecipeStart) {
    try {
        const response = yield call(addRecipeRequest, data.payload);
        const recipe = mapSingleItemFromDB(response.item);
        yield put(addRecipeSuccess(recipe));
    } catch (error) {
        yield put(addRecipeFailed(error as Error));
    }
}

export function* getRecipies(data: GetRecipesType) {
    try {
        const response = yield call(getRecipiesFromDatabase, data.payload);
        const recipies = mapItemsFromDB(response.items);
        yield put(getRecipiesSuccess(recipies));
    } catch (error) {
        yield put(getRecipiesFailed(error as Error));
    }
}

export function* getRecipeCount() {
    try {
        const response = yield call(getRecipeCountFromDatabase);
        yield put(getRecipeCountSuccess({ totalRecipeCount: response.count }));
    } catch (error) {
        yield put(getRecipeCountFailed(error as Error));
    }
}

export function* updateRecipe(data: UpdateRecipeStart) {
    try {
        const response = yield call(updateRecipeData, data.payload);
        const recipe = mapSingleItemFromDB(response.item);
        yield put(updateRecipeSuccess({...recipe}));
    } catch (error) {
        yield put(updateRecipeFailed(error as Error));
    }
}

export function* searchRecipies({ payload: searchString }: SearchRecipeStart) {
    try {
        const response = yield call(searchRecipiesByQueryString, searchString);
        const mappedRecipies = mapItemsFromDB(response.items);
        yield put(searchRecipiesSuccess({ recipies: mappedRecipies, count: response.count }));
    } catch (error) {
        yield put(searchRecipiesFailed(error as Error));
    }
}

export function* getOwnerRecipies({ payload: { ownerId, userToken, page, limit }}: GetOwnerRecipes) {
    try {
        const response = yield call(getRecipiesPerOwner, { ownerId, userToken, page, limit });
        const mappedRecipies = mapItemsFromDB(response.items);
        yield put(getRecipiesForOwnerSuccess({ recipies: mappedRecipies, count: response.count }));
    } catch (error) {
        yield put(getRecipiesForOwnerFailed(error as Error));
    }
}

//TODO: write unit test for this one
export function* getOwnerRecipesCount({ payload: { userId } }) {
    try {
        const response = yield call(getRecipesCountPerOwner, userId);
        yield put(getOwnedRecipeCountSuccess({ ownedRecipesCount: response.count }));
    } catch (error) {
        yield put(getOwnedRecipeCountFailed(error as Error));
    }
}

export function* getLatestAddedRecipes() {
    try {
        const response = yield call(getLatestRecipes);
        const mappedRecipies = mapItemsFromDB(response.items);
        yield put(getLatestRecipiesSuccess(mappedRecipies));
    } catch (error) {
        yield put(getLatestRecipiesFailed(error as Error));
    }
}

export function* onAddRecipeStart() {
    yield takeLatest(RECIPE_ACTION_TYPES.ADD_RECIPE_START, addRecipe);
}

export function* onGetRecipiesStart() {
    yield takeLatest(RECIPE_ACTION_TYPES.GET_RECIPIES_START, getRecipies);
}

export function* onGetRecipeCountStart() {
    yield takeLatest(RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_START, getRecipeCount);
}

export function* onUpdateRecipeStart() {
    yield takeLatest(RECIPE_ACTION_TYPES.UPDATE_RECIPE_START, updateRecipe);
}

export function* onSearchRecipiesStart() {
    yield takeLatest(RECIPE_ACTION_TYPES.SEARCH_RECIPIES_START, searchRecipies);
}

export function* onGetRecipiesPerOwner() {
    yield takeLatest(RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES_START, getOwnerRecipies);
}

export function* onGetOwnerRecipesCount() {
    yield takeLatest(RECIPE_ACTION_TYPES.GET_OWNED_RECIPE_COUNT_START, getOwnerRecipesCount);
}

export function* onGetLatestAddedRecipes() {
    yield takeLatest(RECIPE_ACTION_TYPES.GET_LATEST_ADDED_RECIPES_START, getLatestAddedRecipes);
}

export function* recipeSaga() {
    yield all([
        call(onAddRecipeStart),
        call(onGetRecipiesStart),
        call(onGetRecipeCountStart),
        call(onUpdateRecipeStart),
        call(onSearchRecipiesStart),
        call(onGetRecipiesPerOwner),
        call(onGetLatestAddedRecipes),
        call(onGetOwnerRecipesCount),
    ]);
}
