import { RECIPE_ACTION_TYPES } from "./recipe.types";
import { AnyAction } from "redux-saga";

export type Recipe = {
    title: string,
    description: string,
    type: string,
    imageUrl: string,
    owner: string,
    id: string,
    createdAt: Date,
    updatedAt: Date,
};

export type RecipeState = {
    readonly recipies: Recipe[] | [],
    readonly isLoading: boolean,
    readonly error: Error | null,
    readonly recipeCount: number,
}

export const INITIAL_STATE = {
    recipies: [],
    isLoading: false,
    error: null,
    recipeCount: 0,
}

export const recipeReducer = (state = INITIAL_STATE, action: AnyAction) => {
    switch(action.type) {
        case RECIPE_ACTION_TYPES.ADD_RECIPE_START:
            return { ...state, isLoading: true };
        case RECIPE_ACTION_TYPES.ADD_RECIPE_SUCCESS:
            return { ...state, isLoading: false, recipies: [ ...state.recipies, { ...action.payload } ]};
        case RECIPE_ACTION_TYPES.ADD_RECIPE_FAILED:
            return { ...state, isLoading: false, error: action.payload.error };
        case RECIPE_ACTION_TYPES.GET_RECIPIES_START:
            return { ...state, isLoading: true };
        case RECIPE_ACTION_TYPES.GET_RECIPIES_SUCCESS:
            return { ...state, isLoading: false, recipies: action.payload.recipies };
        case RECIPE_ACTION_TYPES.GET_RECIPIES_FAILED:
            return { ...state, isLoading: false, error: action.payload.error };
        case RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_START:
            return { ...state, isLoading: true };
        case RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_SUCCESS:
            return { ...state, isLoading: false, recipeCount: action.payload.recipeCount };
        case RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_FAILED:
            return { ...state, isLoading: false, error: action.payload.error };
        default:
            return state;
    }
};
