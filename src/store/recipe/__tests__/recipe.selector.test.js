import {
    getRecipies,
    getRecipeCount,
    getRecipeById,
    getLatestRecipes
} from '../recipe.selector';

const mockState = {
    recipe: {
        isLoading: false,
        recipies: [
            {
                title: 'Chicken salad',
                image: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/10/Chicken-Salad-main-1.jpg',
                type: 'salad',
                description: 'tasty salad with chicken and grapes',
                id: 'chickenSaladGrapes',
                owner: 'someTestUser123',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                title: 'Chicken soup',
                image: 'testUrl',
                type: 'soup',
                description: 'tasty chicken soup',
                id: 'chickenSoup',
                owner: 'someTestUser123',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }
        ],
        error: null,
        totalRecipeCount: 2,
        latestAdded: [
            {
                title: 'Shopska salad',
                image: 'testUrl',
                type: 'salad',
                description: 'tomatoes, cucumbers and more',
                id: 'shopskaSalad',
                owner: 'someTestUser123',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }
        ],
    },
};

describe('Recipe selector tests', () => {
    test('getRecipies should return all recipies from the redux store', () => {
        const recipiesSlice = getRecipies(mockState.recipe);
        expect(recipiesSlice).toEqual(mockState.recipe.recipies);
    });

    test('getRecipeCount should return the recipies count from the redux store', () => {
        const totalRecipeCountSlice = getRecipeCount(mockState.recipe);
        expect(totalRecipeCountSlice).toEqual(mockState.recipe.totalRecipeCount);
    });

    test('getRecipeById should return a specific recipe', () => {
        const foundRecipe = getRecipeById(mockState.recipe, 'chickenSoup');
        expect(foundRecipe).toEqual(mockState.recipe.recipies[1]);
    });

    test('getLatestRecipes should return the recipes from the latestAdded array from the redux store', () => {
        const latestAddedSlice = getLatestRecipes(mockState.recipe);
        expect(latestAddedSlice).toEqual(mockState.recipe.latestAdded);
    });
});
