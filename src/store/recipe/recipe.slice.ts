import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { mapItemsFromDB, mapSingleItemFromDB } from "../../utils/recipeUtils";
import { addRecipe, getLatestAdded, getOwnerRecipes, getOwnerRecipesCount, getRecipeById, getRecipeCount, getRecipesPerPageWithLimit, updateRecipe } from "./recipe.thunk";
import { RecipeRoutes } from "../../utils/recipeUtils.types";
import { IRootState } from "../root-reducer";
import { Comment } from "./recipe.types";

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
    comments: Comment[],
    additionalData: AdditionalData,
    id: string,
    createdAt: Date,
    updatedAt: Date,
};

const recipesAdapter = createEntityAdapter<Recipe>({
    selectId: (recipe: Recipe) => recipe.id,
});
const latestAddedAdapter = createEntityAdapter<Recipe>({
    selectId: (recipe: Recipe) => recipe.id,
});
const ownedRecipesAdapter = createEntityAdapter<Recipe>({
    selectId: (recipe: Recipe) => recipe.id,
});

export const recipeSelectors = recipesAdapter.getSelectors((state: IRootState) => state.recipe.recipies);
export const ownedSelectors = ownedRecipesAdapter.getSelectors((state: IRootState) => state.recipe.ownedRecipes);
export const latestSelectors = latestAddedAdapter.getSelectors((state: IRootState) => state.recipe.latestAdded);

export type RecipeState = {
    readonly recipies: ReturnType<typeof recipesAdapter.getInitialState>,
    readonly isLoading: boolean,
    readonly totalRecipeCount: number,
    readonly latestAdded: ReturnType<typeof latestAddedAdapter.getInitialState>,
    readonly ownedRecipes: ReturnType<typeof ownedRecipesAdapter.getInitialState>,
    readonly ownedRecipesCount: number,
    readonly searchString: string,
}

export const INITIAL_STATE: RecipeState = {
    recipies: recipesAdapter.getInitialState(),
    isLoading: false,
    totalRecipeCount: 0,
    latestAdded: latestAddedAdapter.getInitialState(),
    ownedRecipes: ownedRecipesAdapter.getInitialState(),
    ownedRecipesCount: 0,
    searchString: '',
}

//TODO:
//1. use createEntityAdapter
//2. use updateOne in the following - updateRecipe.fulfilled, getRecipeById.fulfilled

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: INITIAL_STATE, //recipesAdapter.getInitialState(INITIAL_STATE)
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
                //state.recipies = [ ...state.recipies, recipe ];
                recipesAdapter.addOne(state.recipies, recipe);
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
                //state.recipies = [ ...recipes ];
                recipesAdapter.setAll(state.recipies, recipes);
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
                //const recipeState = currentRoute === RecipeRoutes.AllRecipes ? 'recipies' : (currentRoute === RecipeRoutes.OwnedRecipes ? 'ownedRecipes' : 'latestAdded');
                const recipe = mapSingleItemFromDB(payload.item);
                // const index = state[recipeState].findIndex(r => r.id === recipe.id);
                // if (index !== -1) {
                //     state[recipeState][index] = recipe;
                // }

                if (currentRoute === RecipeRoutes.AllRecipes) {
                    recipesAdapter.updateOne(state.recipies, { id: recipe.id, changes: recipe });
                } else if (currentRoute === RecipeRoutes.OwnedRecipes) {
                    ownedRecipesAdapter.updateOne(state.ownedRecipes, { id: recipe.id, changes: recipe });
                } else {
                    latestAddedAdapter.updateOne(state.latestAdded, { id: recipe.id, changes: recipe });
                }
            }
        });
        builder.addCase(updateRecipe.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getOwnerRecipes.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getOwnerRecipes.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload?.success) {
                const mappedRecipies = mapItemsFromDB(payload.items);
                //state.ownedRecipes = mappedRecipies;
                ownedRecipesAdapter.setAll(state.ownedRecipes, mappedRecipies);
            }
        });
        builder.addCase(getOwnerRecipes.rejected, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getOwnerRecipesCount.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getOwnerRecipesCount.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload?.success) {
                state.ownedRecipesCount = payload.count;
                if (!payload.count) {
                    state.ownedRecipes = [];
                }
            }
        });
        builder.addCase(getOwnerRecipesCount.rejected, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(getLatestAdded.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getLatestAdded.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload?.success) {
                const mappedRecipies = mapItemsFromDB(payload.items); 
                //state.latestAdded = mappedRecipies;
                latestAddedAdapter.setAll(state.latestAdded, mappedRecipies);
            }
        });
        builder.addCase(getLatestAdded.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getRecipeById.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getRecipeById.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload?.success) {
                const recipe = mapSingleItemFromDB(payload.item);
                //state.recipies = [ ...state.recipies, recipe ];
                const currentRoute = window.location.href.split('/')[3];

                if (currentRoute === RecipeRoutes.AllRecipes) {
                    recipesAdapter.updateOne(state.recipies, { id: recipe.id, changes: recipe });
                } else if (currentRoute === RecipeRoutes.OwnedRecipes) {
                    ownedRecipesAdapter.updateOne(state.ownedRecipes, { id: recipe.id, changes: recipe });
                } else {
                    latestAddedAdapter.updateOne(state.latestAdded, { id: recipe.id, changes: { ...recipe } });
                }
            }
        });
        builder.addCase(getRecipeById.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const { setSearchQueryString } = recipeSlice.actions;

export const recipeReducer = recipeSlice.reducer;
