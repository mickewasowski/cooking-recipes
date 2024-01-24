export const addRecipeRequest = ({ title, description, image, userToken, type }) => {
    const itemObject = {
        name: title,
        description,
        image,
        type
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
