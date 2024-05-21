import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipiesStart } from '../../store/recipe/recipe.action';

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
    dispatcher(searchRecipiesStart(searchQuery));
  };

  return (
    <div>
      <input
        // pr="2.5rem"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <div>
        <button onClick={handleSearch}>
          {/* <SearchIcon /> */}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
