import { useState } from "react";

function EditRecipeModal({ refElement, recipeData }) {
    const {
        title,
        description,
        image: imageURL,
        owner: ownerId,
        additionalData
    } = recipeData;
    const [recipeEdited, setRecipeEdited] = useState({
        title,
        description,
        image: imageURL,
        owner: ownerId,
        additionalData
    });
    
    const {
        title: editedTitle,
        description: editedDescription,
        image: editedImage,
        additionalData: editedAdditionalData
    } = recipeEdited;
    const servings = editedAdditionalData && editedAdditionalData.servings;
    const prepTime = editedAdditionalData && editedAdditionalData.prepTime;
    const cookingTime = editedAdditionalData && editedAdditionalData.cookingTime;
    const ingredientsArray = editedAdditionalData && editedAdditionalData.ingredients;
    const ingredsToString = ingredientsArray.join(',\n');

    return (
        <dialog ref={refElement} className="edit-recipe-modal">
            <h2>Edit Recipe Details</h2>
            <form method="dialog">
                 <div>
                    <img src={editedImage}/>
                    <label>Image URL:</label>
                    <input value={editedImage}/>
                </div>
                <div>
                    <label>Title:</label>
                    <input value={editedTitle}/>
                </div>
                <div>
                    <label>Preparation time: (in minutes)</label>
                    <input value={prepTime}/>
                </div>
                <div>
                    <label>Cooking time: (in minutes)</label>
                    <input value={cookingTime}/>
                </div>
                <div>
                    <label>Servings:</label>
                    <input value={servings}/>
                </div>
                <div>
                    <label>Ingredients: (separated by comma)</label>
                    <textarea value={ingredsToString}/>
                </div>
                <div>
                    <label>How to prepare:</label>
                    <textarea value={editedDescription}/>
                </div>
                <div className="buttons-container">
                    <button className="clear-btn">Cancel</button>
                    <button className="submit-btn">Submit</button>
                </div>
            </form>
        </dialog>
    )
}

export default EditRecipeModal;
