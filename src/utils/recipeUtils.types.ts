import { AdditionalData } from "../store/recipe/recipe.slice";

export type ItemFromDB = {
    _id: string,
    name: string,
    description: string,
    image: string,
    type: string,
    owner: string,
    additionalData: AdditionalData,
    createdAt: Date,
    updatedAt: Date,
}

export enum RecipesToLoad {
    All = 'All',
    Owned = 'Owned'
}

export enum RecipeRoutes {
    AllRecipes = 'allRecipes',
    OwnedRecipes = 'ownedRecipes',
    LatestAdded = 'latestAdded'
}
