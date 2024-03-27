import { RECIPE_ACTION_TYPES } from "./recipe.types";
import { AnyAction } from "redux-saga";

export type Recipe = {
    title: string,
    description: string,
    type: string,
    image: string,
    owner: string,
    additionalData?: Map<string, any>,
    id: string,
    createdAt: Date,
    updatedAt: Date,
};

export type RecipeState = {
    readonly recipies: Recipe[] | [],
    readonly isLoading: boolean,
    readonly error: Error | null,
    readonly totalRecipeCount: number,
}

export const INITIAL_STATE = {
    recipies: [],
    isLoading: false,
    error: null,
    totalRecipeCount: 0,
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
            return { ...state, isLoading: false, recipies: action.payload };
        case RECIPE_ACTION_TYPES.GET_RECIPIES_FAILED:
            return { ...state, isLoading: false, error: action.payload.error };
        case RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_START:
            return { ...state, isLoading: true };
        case RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_SUCCESS:
            return { ...state, isLoading: false, totalRecipeCount: action.payload.totalRecipeCount };
        case RECIPE_ACTION_TYPES.GET_RECIPE_COUNT_FAILED:
            return { ...state, isLoading: false, error: action.payload.error };
        case RECIPE_ACTION_TYPES.UPDATE_RECIPE_START:
            return { ...state, isLoading: true };
        case RECIPE_ACTION_TYPES.UPDATE_RECIPE_SUCCESS:
            return { ...state, isLoading: false, recipies: [ ...state.recipies, { ...action.payload } ]};
        case RECIPE_ACTION_TYPES.UPDATE_RECIPE_FAILED:
            return { ...state, isLoading: false, error: action.payload.error };
        case RECIPE_ACTION_TYPES.SEARCH_RECIPIES_START:
            return { ...state, isLoading: true };
        case RECIPE_ACTION_TYPES.SEARCH_RECIPIES_SUCCESS:
            return { ...state, isLoading: false, recipies: action.payload.recipies, totalRecipeCount: action.payload.count };
        case RECIPE_ACTION_TYPES.SEARCH_RECIPIES_FAILED:
            return { ...state, isLoading: false, error: action.payload.error };
        case RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES_START:
            return { ...state, isLoading: true };
        case RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES_SUCCESS:
            return { ...state, isLoading: false, recipies: action.payload.recipies, totalRecipeCount: action.payload.count };
        case RECIPE_ACTION_TYPES.GET_OWNER_RECIPIES_FAILED:
            return { ...state, isLoading: false, error: action.payload.error };
        default:
            return state;
    }
};
