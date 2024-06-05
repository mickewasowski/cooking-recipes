import { useState } from 'react';
import { isAuth } from '../../hoc/isAuth';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../store/root-reducer';
import { addRecipeStart } from '../../store/recipe/recipe.action';
import { getCurrentUser } from '../../store/user/user.selector';
import { validateRecipeInputData } from './utils';

function AddRecipeForm() {
    const dispatch = useDispatch();
    const user = useSelector((state: IRootState) => getCurrentUser(state.user));

    const [formData, setFormData] = useState({
        title: '',
        type: '', // default to the first option
        description: '',
        imageUrl: '',
        ingredients: [],
        prepTime: '',
        cookingTime: '',
        servings: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const isValidData = validateRecipeInputData(name, value);
        if (isValidData) {
            e.target.className = '';
            if (['prepTime', 'cookingTime', 'servings'].includes(value)) {
                const valueToNumber = parseInt(value);
                setFormData({ ...formData, [name]: valueToNumber });
            } else if (name === 'ingredients') {
                const splitString = value.split(',');
                const allIngredients = splitString.map((ing: string) => ing.trim());
                setFormData({ ...formData, [name as string]: allIngredients });
            } else {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            e.target.className = 'errorOutline';
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { title, type, description, imageUrl, ingredients, prepTime, cookingTime, servings } = formData;
        if (!title || !type || !description || !imageUrl || !ingredients || !prepTime || !cookingTime || !servings) {
            return;
        }

        const additionalData = {
            ingredients,
            prepTime: Number(prepTime),
            cookingTime: Number(cookingTime),
            servings: Number(servings)
        };

        if (user) {
            dispatch(addRecipeStart({ title: formData.title, image: formData.imageUrl, description: formData.description, type: formData.type, userToken: user.token, additionalData }));
        }
    };

    return (
        <div className='add-recipe-wrapper'>
            <form onSubmit={handleSubmit}>
                <div className='image-wrapper'>
                    <img src={formData.imageUrl || ''} loading="lazy" />
                    <input defaultValue={formData.imageUrl} name='imageUrl' type='text' placeholder='Place your image url here' onChange={handleChange} />
                </div>
                <div className='title-time-container'>
                    <div className='title-type-wrapper'>
                        <div className='recipe-title'>
                            <label>Recipe title: *</label>
                            <input defaultValue={formData.title} name='title' type='text' onChange={handleChange}/>
                        </div>
                        <div className='recipe-type'>
                            <label>Recipe type: *</label>
                            <select defaultValue={formData.type} name='type' onChange={handleChange}>
                                <option></option>
                                <option>Salad</option>
                                <option>Soup</option>
                                <option>Dessert</option>
                                <option>Fish</option>
                                <option>Grill</option>
                                <option>Sandwitch</option>
                                <option>Baked goods</option>
                                <option>Beverage</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='time-container'>
                        <div>
                            <label>Preparation Time: * (in minutes)</label>
                            <input defaultValue={formData.prepTime} name='prepTime' type='number' onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Cooking Time: * (in minutes)</label>
                            <input defaultValue={formData.cookingTime} name='cookingTime' type='number' onChange={handleChange}/>
                        </div>
                        <div>
                            <label>Servings: *</label>
                            <input defaultValue={formData.servings} name='servings' type='number' onChange={handleChange}/>
                        </div>
                    </div>
                </div>
                <div className='ingredients'>
                    <label>Ingredients: (separated by comma) *</label>
                    <textarea defaultValue={formData.ingredients} name='ingredients' onChange={handleChange}></textarea>
                </div>
                <div className='description'>
                    <label>How to prepare: *</label>
                    <textarea defaultValue={formData.description} name='description' onChange={handleChange}></textarea>
                </div>
                <div className='buttons-container'>
                    <button className='clear-btn'>Clear</button>
                    <button className='submit-btn' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    );
}

const EnhancedComponent = isAuth(AddRecipeForm);

export default EnhancedComponent;
