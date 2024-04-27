import React from 'react';

const SearchBar = ({ handleSearch, handleFilter }) => {
  return (
    <div>
      <p>Search</p>
      <input type="text" placeholder="Search articles..." onChange={handleSearch} />
      {/* <select onChange={handleFilter}>
        <option value="date">Date</option>
        <option value="category">Category</option>
        <option value="source">Source</option>
      </select> */}
    </div>
  );
};

export default SearchBar;
