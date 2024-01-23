import { all, put, call, takeLatest } from 'typed-redux-saga';
import { RECIPE_ACTION_TYPES } from './recipe.types';
import { addRecipeFailed, addRecipeStart, addRecipeSuccess } from './recipe.action';
import { addRecipe as addRecipeRequest } from '../../utils/recipeUtils';

function* addRecipe(data) {
    try {
        const { title, description, image, userToken, type } = data.payload;
        const response = yield* call(addRecipeRequest, { title, description, image, userToken, type });

        console.log(response);

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







export function* onAddRecipeStart() {
    yield* takeLatest(RECIPE_ACTION_TYPES.ADD_RECIPE_START, addRecipe);
}

export function* recipeSaga() {
    yield* all([
        call(onAddRecipeStart)
    ])
}