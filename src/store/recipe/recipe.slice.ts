import { createSlice } from "@reduxjs/toolkit";
import { mapItemsFromDB, mapSingleItemFromDB } from "../../utils/recipeUtils";
import { addRecipe, getLatestAdded, getOwnerRecipes, getOwnerRecipesCount, getRecipeCount, getRecipesPerPageWithLimit, searchRecipes, updateRecipe } from "./recipe.thunk";
import { RecipeRoutes } from "../../utils/recipeUtils.types";

export type AdditionalData = {
    prepTime: number;
    cookingTime: number;
    servings: number;
    ingredients: string[];
}

export type Recipe = {
    title: string,
    description: string,
    type: string,
    image: string,
    owner: string,
    additionalData: AdditionalData,
    id: string,
    createdAt: Date,
    updatedAt: Date,
};

export type RecipeState = {
    readonly recipies: Recipe[] | [],
    readonly isLoading: boolean,
    readonly totalRecipeCount: number,
    readonly latestAdded: Recipe[] | [],
    readonly ownedRecipes: Recipe[] | [],
    readonly ownedRecipesCount: number,
    readonly searchString: string,
}

export const INITIAL_STATE: RecipeState = {
    recipies: [],
    isLoading: false,
    totalRecipeCount: 0,
    latestAdded: [],
    ownedRecipes: [],
    ownedRecipesCount: 0,
    searchString: '',
}

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: INITIAL_STATE,
    reducers: {
        setSearchQueryString: (state, action) => {
            state.searchString = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addRecipe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addRecipe.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload?.success) {
                const recipe = mapSingleItemFromDB(payload.item);
                state.recipies = [ ...state.recipies, recipe ];
            }
        });
        builder.addCase(addRecipe.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getRecipesPerPageWithLimit.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getRecipesPerPageWithLimit.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload?.success) {
                const recipes = mapItemsFromDB(payload.items);
                state.recipies = [ ...recipes ];
            }
        });
        builder.addCase(getRecipesPerPageWithLimit.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getRecipeCount.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getRecipeCount.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload?.success) {
                state.totalRecipeCount = payload.count;
            }
        });
        builder.addCase(getRecipeCount.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(updateRecipe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateRecipe.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload?.success) {
                const currentRoute = window.location.href.split('/')[3];
                const recipeState = currentRoute === RecipeRoutes.AllRecipes ? 'recipies' : (currentRoute === RecipeRoutes.OwnedRecipes ? 'ownedRecipes' : 'latestAdded');
                const recipe = mapSingleItemFromDB(payload.item);
                const index = state[recipeState].findIndex(r => r.id === recipe.id);
                if (index !== -1) {
                    state[recipeState][index] = recipe;
                }
            }
        });
        builder.addCase(updateRecipe.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(searchRecipes.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(searchRecipes.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload?.success) {
                const mappedRecipies = mapItemsFromDB(payload.items);
                state.recipies = mappedRecipies;
            }
        });
        builder.addCase(searchRecipes.rejected, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getOwnerRecipes.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getOwnerRecipes.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload?.success) {
                const mappedRecipies = mapItemsFromDB(payload.items);
                state.ownedRecipes = mappedRecipies;
            }
        });
        builder.addCase(getOwnerRecipes.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getOwnerRecipesCount.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getOwnerRecipesCount.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload?.success) {
                state.ownedRecipesCount = payload.count;
            }
        });
        builder.addCase(getOwnerRecipesCount.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getLatestAdded.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getLatestAdded.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload?.success) {
                const mappedRecipies = mapItemsFromDB(payload.items); 
                state.latestAdded = mappedRecipies;
            }
        });
        builder.addCase(getLatestAdded.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const { setSearchQueryString } = recipeSlice.actions;

export const recipeReducer = recipeSlice.reducer;
