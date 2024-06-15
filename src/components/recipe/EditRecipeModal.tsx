import React, { useState } from "react";
import { Recipe } from "../../store/recipe/recipe.slice";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/root-reducer";
import { getCurrentUser } from "../../store/user/user.selector";
import { validateRecipeInputData } from "./utils";
import { updateRecipe } from "../../store/recipe/recipe.thunk";

interface IProps {
    refElement: React.RefObject<HTMLDialogElement>;
    recipeData: Recipe;
}

function EditRecipeModal({ refElement, recipeData }: IProps) {
    const user = useSelector((state: IRootState) => getCurrentUser(state.user));
    const dispatch = useDispatch();
    const {
        id,
        title,
        type,
        description,
        image: imageURL,
        owner: ownerId,
        additionalData
    } = recipeData;
    const [recipeEdited, setRecipeEdited] = useState({
        id,
        title,
        type,
        description,
        image: imageURL,
        owner: ownerId,
        prepTime: additionalData.prepTime,
        cookingTime: additionalData.cookingTime,
        servings: additionalData.servings,
        ingredients: additionalData.ingredients
    });
    
    const {
        title: editedTitle,
        type: editedType,
        description: editedDescription,
        image: editedImage,
        prepTime,
        cookingTime,
        servings,
        ingredients
    } = recipeEdited;
    const ingredsToString = ingredients.join(', ');

    const handleClose = () => {
        refElement.current?.close();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const isValidData = validateRecipeInputData(name, value);
        if (isValidData) {
            e.target.className = '';
            if (['prepTime', 'cookingTime', 'servings'].includes(value)) {
                const valueToNumber = parseInt(value);
                setRecipeEdited({ ...recipeEdited, [name]: valueToNumber });
            } else if (name === 'ingredients') {
                const splitString = value.split(',');
                const allIngredients = splitString.map((ing: string) => ing.trim());
                setRecipeEdited({ ...recipeEdited, [name as string]: allIngredients });
            } else {
                const statePropName = name === 'imageUrl' ? 'image' : name;
                setRecipeEdited({ ...recipeEdited, [statePropName]: value });
            }
        } else {
            e.target.className = 'errorOutline';
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) {
            return;
        }

        const {
            title: editedTitle,
            type: editedType,
            description: editedDescription,
            image: editedImage,
            prepTime,
            servings,
            cookingTime,
            ingredients
        } = recipeEdited;

        if (!editedTitle || !editedDescription || !editedImage || !ingredients.length || !prepTime || !cookingTime || !servings) {
            return;
        }

        const additionalData = {
            ingredients,
            prepTime: Number(prepTime),
            cookingTime: Number(cookingTime),
            servings: Number(servings)
        };

        if (user) {
           const result = await dispatch(updateRecipe({ id, title: editedTitle, image: editedImage, description: editedDescription, type: editedType, userToken: user.token, additionalData }));
            if (result?.payload?.success) {
                handleClose();
            }
        }
    };

    return (
        <dialog ref={refElement} className="edit-recipe-modal">
            <h2>Edit Recipe Details</h2>
            <form method="dialog" onSubmit={handleSubmit}>
                 <div>
                    <img src={editedImage} loading="lazy" />
                    <label>Image URL:</label>
                    <input name='imageUrl' defaultValue={editedImage} onChange={handleChange}/>
                </div>
                <div>
                    <label>Title:</label>
                    <input name='title' defaultValue={editedTitle} onChange={handleChange}/>
                </div>
                <div>
                    <label>Preparation time: (in minutes)</label>
                    <input name='prepTime' defaultValue={prepTime} onChange={handleChange}/>
                </div>
                <div>
                    <label>Cooking time: (in minutes)</label>
                    <input name='cookingTime' defaultValue={cookingTime} onChange={handleChange}/>
                </div>
                <div>
                    <label>Servings:</label>
                    <input name='servings' defaultValue={servings} onChange={handleChange}/>
                </div>
                <div>
                    <label>Ingredients: (separated by comma)</label>
                    <textarea name='ingredients' defaultValue={ingredsToString} onChange={handleChange}/>
                </div>
                <div>
                    <label>How to prepare:</label>
                    <textarea name='description' defaultValue={editedDescription} onChange={handleChange}/>
                </div>
                <div className="buttons-container">
                    <button className="clear-btn" onClick={handleClose}>Cancel</button>
                    <button className="submit-btn">Submit</button>
                </div>
            </form>
        </dialog>
    )
}

export default EditRecipeModal;
