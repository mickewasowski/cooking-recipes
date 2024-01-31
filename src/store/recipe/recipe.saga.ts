import { all, put, call, takeLatest } from 'typed-redux-saga';
import { RECIPE_ACTION_TYPES } from './recipe.types';
import { addRecipeFailed, addRecipeSuccess, getRecipiesSuccess, getRecipiesFailed, getRecipeCountFailed, getRecipeCountSuccess, updateRecipeSuccess, updateRecipeFailed } from './recipe.action';
import { addRecipeRequest, getRecipiesFromDatabase, getRecipeCountFromDatabase, updateRecipeData } from '../../utils/recipeUtils';

function* addRecipe(data) {
    try {
        const { title, description, image, userToken, type, additionalData } = data.payload;
        const response = yield* call(addRecipeRequest, { title, description, image, userToken, type, additionalData });

        if (response.success) {
            const itemFromDB = response.item;
            const recipe = {
                title: itemFromDB.name,
                description: itemFromDB.decription,
                imageUrl: itemFromDB.image,
                type: itemFromDB.type,
                owner: itemFromDB.owner,
                additionalData: itemFromDB.additionalData,
                id: itemFromDB._id,
                createdAt: itemFromDB.createdAt,
                updatedAt: itemFromDB.updatedAt
            };

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
            const itemsFromDb = response.items;
            const mappedRecipies = itemsFromDb.map(recipe => {
                return {
                    title: recipe.name,
                    description: recipe.description,
                    imageUrl: recipe.image,
                    type: recipe.type,
                    owner: recipe.owner,
                    additionalData: recipe.additionalData,
                    id: recipe._id,
                    createdAt: recipe.createdAt,
                    updatedAt: recipe.updatedAt
                }
            })

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
            yield* put(getRecipeCountSuccess({ recipeCount: response.count }));
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
            const itemFromDb = response.item;
            const recipe = {
                id: itemFromDb._id,
                description: itemFromDb.description,
                imageUrl: itemFromDb.image,
                type: itemFromDb.type,
                owner: itemFromDb.owner,
                additionalData: itemFromDb.additionalData,
                createdAt: itemFromDb.createdAt,
                updatedAt: itemFromDb.updatedAt
            };

            yield* put(updateRecipeSuccess({...recipe}));
        } else {
            yield* put(updateRecipeFailed(response.message as Error));
        }
    } catch (error) {
        yield* put(updateRecipeFailed(error as Error));
    }
}

export function* onAddRecipeStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.ADD_RECIPE_START, addRecipe);
}

export function* onGetRecipiesStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.GET_RECIPIES_START, getRecipies);
}

export function* onGetRecipeCountStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_START, getRecipeCount)
}

export function* onUpdateRecipeStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.UPDATE_RECIPE_START, updateRecipe)
}

export function* recipeSaga() {
    yield* all([
        call(onAddRecipeStart),
        call(onGetRecipiesStart),
        call(onGetRecipeCountStart),
        call(onUpdateRecipeStart),
    ])
}