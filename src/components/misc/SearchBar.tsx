import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
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
    <InputGroup size="md">
      <Input
        pr="2.5rem"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleSearch}>
          <SearchIcon />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchBar;
