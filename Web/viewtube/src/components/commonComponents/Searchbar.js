import React, { useState } from 'react';
import search_icon from '../../assets/search.svg'; // Import the search icon image

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchQuery);

    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='search-box flex-div'>
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <img
                className='search-icon'
                src={search_icon}
                alt="search icon"
                onClick={handleSearch}
            />
        </div>
    );
};

export default SearchBar;
