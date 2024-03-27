export const addRecipeRequest = ({ title, description, image, userToken, type, additionalData }) => {
    const itemObject = {
        name: title,
        description,
        image,
        type,
        additionalData
    }

    return fetch('http://localhost:5000/api/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(itemObject)
    })
    .then(res => res.json());
};

export const getRecipiesFromDatabase = ({ page, limit }) => {
    return fetch(`http://localhost:5000/api/item?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json());
}

export const getRecipeCountFromDatabase = () => {
    return fetch('http://localhost:5000/api/item/count', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json());
}

export const updateRecipeData = ({ id, title, description, image, userToken, type, additionalData }) => {
    const itemObject = {
        _id: id,
        name: title,
        description,
        image,
        type,
        additionalData
    }

    return fetch('http://localhost:5000/api/item', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(itemObject)
    })
    .then(res => res.json());
}

export const searchRecipiesByQueryString = (querySearch: string) => {
    const arrayOfWords = querySearch.split(' ');
    const mappedSearchWords: string[] = [];
    arrayOfWords.forEach((word, index) => {
        let constructedString = `q${index + 1}=${word}`;
        mappedSearchWords.push(constructedString);
    });

    const searchQuery = mappedSearchWords.join('&');

    return fetch(`http://localhost:5000/api/item/search?${searchQuery}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json());
}

export const getRecipiesPerOwner = (data) => {
    const { ownerId, userToken } = data;

    return fetch(`http://localhost:5000/api/item/owned?ownerId=${ownerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
        },
    })
    .then(res => res.json());
}

export const mapItemsFromDB = (items) => {
    const mappedRecipies = items.map(recipe => {
        return mapSingleItemFromDB(recipe)
    });

    return mappedRecipies;
}

export const mapSingleItemFromDB = (item) => {
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
