import { useState } from 'react';
import { isAuth } from '../../hoc/isAuth';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../store/root-reducer';
import { addRecipeStart } from '../../store/recipe/recipe.action';
import { getCurrentUser } from '../../store/user/user.selector';

function AddRecipeForm() {
    const dispatch = useDispatch();
    const user = useSelector((state: IRootState) => getCurrentUser(state.user));

    const [formData, setFormData] = useState({
        title: '',
        type: 'salad', // default to the first option
        description: '',
        imageUrl: '',
        ingredients: [],
        prepTime: null,
        cookingTime: null,
        servings: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const additionalData = new Map<string, any>();

        dispatch(addRecipeStart({ title: formData.title, image: formData.imageUrl, description: formData.description, type: formData.type, userToken: user.token, additionalData }));
    };

    return (
        <div className='add-recipe-wrapper'>
            <form onSubmit={handleSubmit}>
                <div className='image-wrapper'>
                    <img src={formData.imageUrl || ''} />
                    <input type='text' placeholder='Place your image url here' />
                </div>
                <div className='title-time-container'>
                    <div className='title-type-wrapper'>
                        <div className='recipe-title'>
                            <label>Recipe title: *</label>
                            <input type='text' />
                        </div>
                        <div className='recipe-type'>
                            <label>Recipe type: *</label>
                            <select>
                                <option>Salad</option>
                                <option>Soup</option>
                                <option>Dessert</option>
                                <option>Fish</option>
                                <option>Grill</option>
                                <option>Sandwitch</option>
                                <option>Baked goods</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='time-container'>
                        <div>
                            <label>Preparation Time: * (in minutes)</label>
                            <input type='number' />
                        </div>
                        <div>
                            <label>Cooking Time: * (in minutes)</label>
                            <input type='number' />
                        </div>
                        <div>
                            <label>Servings: *</label>
                            <input type='number' />
                        </div>
                    </div>
                </div>
                <div className='ingredients'>
                    <label>Ingredients: (separated by comma) *</label>
                    <textarea></textarea>
                </div>
                <div className='description'>
                    <label>How to prepare: *</label>
                    <textarea></textarea>
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
