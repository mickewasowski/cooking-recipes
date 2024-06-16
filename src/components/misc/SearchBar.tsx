import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearch, IoClose } from "react-icons/io5";
import { searchRecipes } from '../../store/recipe/recipe.thunk';
import { setSearchQueryString } from '../../store/recipe/recipe.slice';
import { getStoredSearchString } from '../../store/recipe/recipe.selector';
import { IRootState } from '../../store/root-reducer';

interface IProps {
  recipeLimit: number;
  currentPage: number;
  recipesOwnership: string;
}

function SearchBar({ currentPage, recipeLimit, recipesOwnership }: IProps) {
  const dispatcher = useDispatch();
  const storedSearch = useSelector((state: IRootState) => getStoredSearchString(state.recipe));
  const [searchQuery, setSearchQuery] = useState(storedSearch);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);

    //TODO: make sure to search either for all or owned recipes
    //recipesOwnership

    dispatcher(setSearchQueryString(searchQuery));
    dispatcher(searchRecipes({ searchQuery, currentPage, recipeLimit, recipesOwnership }));
  };

  const handleClearSearch = () => {
    dispatcher(setSearchQueryString(''));
  }

  return (
    <div className='search-box-wrapper'>
      <input
        className='search-input'
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button className='search-btn' onClick={handleSearch}>
        <IoSearch />
      </button>
      <button className='search-btn clear-btn' onClick={handleClearSearch}>
        <IoClose />
      </button>
    </div>
  );
}

export default SearchBar;
