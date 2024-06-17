import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearch, IoClose } from "react-icons/io5";
import { setSearchQueryString } from '../../store/recipe/recipe.slice';
import { getStoredSearchString } from '../../store/recipe/recipe.selector';
import { IRootState } from '../../store/root-reducer';

function SearchBar() {
  const dispatcher = useDispatch();
  const storedSearch = useSelector((state: IRootState) => getStoredSearchString(state.recipe));
  const [searchQuery, setSearchQuery] = useState(storedSearch);

  useEffect(() => {
    if (searchQuery !== storedSearch) {
      setSearchQuery(storedSearch);
    }
  }, [storedSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    dispatcher(setSearchQueryString(searchQuery.trim()));
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
