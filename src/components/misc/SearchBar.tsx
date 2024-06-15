import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoSearch } from "react-icons/io5";
import { searchRecipes } from '../../store/recipe/recipe.thunk';

function SearchBar() {
  const dispatcher = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    //TODO: Make the search request with a saga to find all elements containing the word
    console.log('Searching for:', searchQuery);
    // Implement your search logic here

    //TODO: make sure to search either for all or owned recipes
    dispatcher(searchRecipes(searchQuery));
  };

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
    </div>
  );
}

export default SearchBar;
