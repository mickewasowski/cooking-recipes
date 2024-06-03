
function EditRecipeModal({ refElement, recipeData }) {
    const {
        title,
        description,
        type,
        image: imageURL,
        owner: ownerId,
        additionalData
    } = recipeData;
    const servings = true //additionalData && additionalData.get('servings');
    const prepTime = true //additionalData && additionalData.get('prepTime');
    const cookingTime = true //additionalData && additionalData.get('cookingTime');
    // ingredients => should go in prep => make sure its array of strings
    const ingredientsArray = additionalData && additionalData.get('ingredients');
    

    return (
        <dialog ref={refElement} className="edit-recipe-modal">
            <h2>Edit Recipe Details</h2>
            <form method="dialog">
                 <div>
                    <label>Image URL:</label>
                    <input />
                    <img />
                </div>
                <div>
                    <label>Title:</label>
                    <input />
                </div>
                <div>
                    <label>Preparation time: (in minutes)</label>
                    <input />
                </div>
                <div>
                    <label>Cooking time: (in minutes)</label>
                    <input />
                </div>
                <div>
                    <label>Servings:</label>
                    <input />
                </div>
                <div>
                    <label>Ingredients: (separated by comma)</label>
                    <textarea />
                </div>
                <div>
                    <label>How to prepare:</label>
                    <textarea />
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
