import React from "react";

const SearchBar = ({ handleSearch, handleFilter }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <p className="text-gray-800 font-semibold mb-2">Search</p>
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          onChange={handleSearch}
          className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.293 13.707a1 1 0 0 1-1.414 0L9 12.414a6 6 0 1 1 1.414-1.414l2.293 2.293a1 1 0 0 1 0 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
