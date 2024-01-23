

export const addRecipe = ({ title, description, image, userToken, type }) => {
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
}

// fetch('http://localhost:5000/api/item', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${userToken}` // Assuming userToken is already defined
//     },
//     body: JSON.stringify(itemObject) // Assuming itemObject is already defined
// })
// .then(response => {
//     if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
// })
// .then(data => {
//     console.log(data); // Handle the response data
// })
// .catch(error => {
//     console.error('There was an error!', error);
// });
