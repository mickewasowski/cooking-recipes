import { all, put, call, takeLatest } from 'typed-redux-saga';
import { RECIPE_ACTION_TYPES } from './recipe.types';
import { addRecipeFailed, addRecipeSuccess, getRecipiesSuccess, getRecipiesFailed, getRecipeCountFailed, getRecipeCountSuccess } from './recipe.action';
import { addRecipeRequest, getRecipiesFromDatabase, getRecipeCountFromDatabase } from '../../utils/recipeUtils';

function* addRecipe(data) {
    try {
        const { title, description, image, userToken, type } = data.payload;
        const response = yield* call(addRecipeRequest, { title, description, image, userToken, type });

        if (response.success) {
            const itemFromDB = response.item;
            const recipe = {
                title: itemFromDB.name,
                description: itemFromDB.decription,
                imageUrl: itemFromDB.image,
                type: itemFromDB.type,
                owner: itemFromDB.owner,
                id: itemFromDB._id,
                createdAt: itemFromDB.createdAt,
                updatedAt: itemFromDB.updatedAt
            };

            yield* put(addRecipeSuccess({ title: recipe.title, description: recipe.description, image: recipe.imageUrl, type: recipe.type, owner: recipe.owner, id: recipe.id, createdAt: recipe.createdAt, updatedAt: recipe.updatedAt }));
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
                    description: recipe.decription,
                    imageUrl: recipe.image,
                    type: recipe.type,
                    owner: recipe.owner,
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



export function* onAddRecipeStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.ADD_RECIPE_START, addRecipe);
}

export function* onGetRecipiesStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.GET_RECIPIES_START, getRecipies);
}

export function* onGetRecipeCountStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_START, getRecipeCount)
}

export function* recipeSaga() {
    yield* all([
        call(onAddRecipeStart),
        call(onGetRecipiesStart),
        call(onGetRecipeCountStart)
    ])
}