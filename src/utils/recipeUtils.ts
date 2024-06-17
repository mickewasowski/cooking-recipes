import {
    ItemFromDB
} from './recipeUtils.types';
import {
    RecipeAdd,
    GetRecipes,
    RecipeUpdate,
    RecipesForOwner
} from '../store/recipe/recipe.types';

export const addRecipeRequest = ({ title, description, image, userToken, type, additionalData }: RecipeAdd) => {
    const itemObject = {
        name: title,
        description,
        image,
        type,
        additionalData: JSON.stringify(additionalData)
    }

    return fetch('http://localhost:5000/api/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(itemObject)
    })
    .then(res => res.json())
    .then((res) => {
        if (res.success) {
            return res;
        } else {
            throw new Error(res.message);
        }
    })
    .catch((error) => { throw new Error(error.message) });
};

export const getRecipiesFromDatabase = ({ page, limit, searchString }: GetRecipes) => {
    const arrayOfWords = searchString.split(' ');
    const mappedSearchWords: string[] = [];
    arrayOfWords.forEach((word, index) => {
        let constructedString = `q${index + 1}=${word}`;
        mappedSearchWords.push(constructedString);
    });

    const searchQuery = mappedSearchWords.join('&');
    const requestString = searchQuery
        ? `http://localhost:5000/api/item?page=${page}&limit=${limit}&${searchQuery}`
        : `http://localhost:5000/api/item?page=${page}&limit=${limit}`;
    return fetch(requestString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then((res) => {
        if (res.success) {
            return res;
        } else {
            throw new Error(res.message);
        }
    })
    .catch((error) => { throw new Error(error.message) });
}

export const getRecipeCountFromDatabase = (searchString: string) => {
    const arrayOfWords = searchString.split(' ');
    const mappedSearchWords: string[] = [];
    arrayOfWords.forEach((word, index) => {
        let constructedString = `q${index + 1}=${word}`;
        mappedSearchWords.push(constructedString);
    });

    const searchQuery = mappedSearchWords.join('&');
    const requestString = searchQuery
        ? `http://localhost:5000/api/item/count?${searchQuery}`
        : 'http://localhost:5000/api/item/count';
    return fetch(requestString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then((res) => {
        if (res.success) {
            return res;
        } else {
            throw new Error(res.message);
        }
    })
    .catch((error) => { throw new Error(error.message) });
}

export const updateRecipeData = ({ id, title, description, image, userToken, type, additionalData }: RecipeUpdate) => {
    const itemObject = {
        _id: id,
        name: title,
        description,
        image,
        type,
        additionalData: JSON.stringify(additionalData)
    }

    return fetch('http://localhost:5000/api/item', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(itemObject)
    })
    .then(res => res.json())
    .then((res) => {
        if (res.success) {
            return res;
        } else {
            throw new Error(res.message);
        }
    })
    .catch((error) => { throw new Error(error.message) });
}

//DEPRECATED
// export const searchRecipiesByQueryString = (querySearch: string, currentPage: number, recipeLimit: number) => {
//     const arrayOfWords = querySearch.split(' ');
//     const mappedSearchWords: string[] = [];
//     arrayOfWords.forEach((word, index) => {
//         let constructedString = `q${index + 1}=${word}`;
//         mappedSearchWords.push(constructedString);
//     });

//     const searchQuery = mappedSearchWords.join('&');
//     return fetch(`http://localhost:5000/api/item/search?${searchQuery}&page=${currentPage}&limit=${recipeLimit}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//     .then(res => res.json())
//     .then((res) => {
//         if (res.success) {
//             return res;
//         } else {
//             throw new Error(res.message);
//         }
//     })
//     .catch((error) => { throw new Error(error.message) });
// }

export const getRecipiesPerOwner = (data: RecipesForOwner) => {
    const { ownerId, page, limit, searchString } = data;
    console.log('searchString ', searchString)
    const arrayOfWords = searchString?.split(' ');
    const mappedSearchWords: string[] = [];
    arrayOfWords?.forEach((word, index) => {
        let constructedString = `q${index + 1}=${word}`;
        mappedSearchWords.push(constructedString);
    });
    const searchQuery = mappedSearchWords.join('&');
    const requestString = searchQuery
        ? `http://localhost:5000/api/item/owned?page=${page}&limit=${limit}&id=${ownerId}&${searchQuery}`
        : `http://localhost:5000/api/item/owned?page=${page}&limit=${limit}&id=${ownerId}`;

    return fetch(requestString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then((res) => {
        if (res.success) {
            return res;
        } else {
            throw new Error(res.message);
        }
    })
    .catch((error) => { throw new Error(error.message) });
}

export const getRecipesCountPerOwner = (userId: string, searchString: string) => {
    const arrayOfWords = searchString?.split(' ');
    const mappedSearchWords: string[] = [];
    arrayOfWords?.forEach((word, index) => {
        let constructedString = `q${index + 1}=${word}`;
        mappedSearchWords.push(constructedString);
    });
    const searchQuery = mappedSearchWords.join('&');

    const requestString = searchQuery
        ? `http://localhost:5000/api/item/ownedCount?ownerId=${userId}&${searchQuery}`
        : `http://localhost:5000/api/item/ownedCount?ownerId=${userId}`;

    return fetch(requestString, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then((res) => {
        if (res.success) {
            return res;
        } else {
            throw new Error(res.message);
        }
    })
    .catch((error) => { throw new Error(error.message) });
}

export const getLatestRecipes = () => {
    return fetch(`http://localhost:5000/api/item/latest`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then((res) => {
        if (res.success) {
            return res;
        } else {
            throw new Error(res.message);
        }
    })
    .catch((error) => { throw new Error(error.message) });
}

export const mapItemsFromDB = (items: ItemFromDB[]) => {
    const mappedRecipies = items.map(recipe => {
        return mapSingleItemFromDB(recipe)
    });

    return mappedRecipies;
}

export const mapSingleItemFromDB = (item: ItemFromDB) => {
    const mappedItem = {
        id: item._id,
        title: item.name,
        description: item.description,
        image: item.image,
        type: item.type,
        owner: item.owner,
        additionalData: item.additionalData,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
    };

    return mappedItem;
}
