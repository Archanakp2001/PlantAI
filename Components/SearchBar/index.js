import React from "react";
import { Searchbar } from 'react-native-paper';
import { Text } from "react-native-web";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
  
    const onChangeSearch = (query) => setSearchQuery(query);
  
    return (
        <>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
      </>
    );
  };
  
  export default SearchBar;