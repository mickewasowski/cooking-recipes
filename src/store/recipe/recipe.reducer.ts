import { RECIPE_ACTION_TYPES } from "./recipe.types";
import { AnyAction } from "redux-saga";

export type Recipe = {
    title: string,
    description: string,
    type: string,
    image: string,
    owner: string,
    id: string,
    createdAt: Date,
    updatedAt: Date,
};

export type RecipeState = {
    readonly recipies: Recipe[] | [],
    readonly isLoading: boolean,
    readonly error: Error | null,
}

export const INITIAL_STATE = {
    recipies: [],
    isLoading: false,
    error: null,
}

export const recipeReducer = (state = INITIAL_STATE, action: AnyAction) => {
    switch(action.type) {
        case RECIPE_ACTION_TYPES.ADD_RECIPE_START:
            return { ...state, isLoading: true };
        case RECIPE_ACTION_TYPES.ADD_RECIPE_SUCCESS:
            return { ...state, isLoading: false, recipies: [ ...state.recipies, { ...action.payload } ]};
        case RECIPE_ACTION_TYPES.ADD_RECIPE_FAILED:
            return { ...state, isLoading: false, error: action.payload.error };
        default:
            return state;
    }
};
