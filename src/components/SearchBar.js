import React from "react";

const SearchBar = ({ handleSearch }) => {
  return (
    <div>
      <div className="relative sm:max-w-[227px] max-w-[343px] w-full  ml-auto sm:mr-0 mr-auto  ">
        <input
          type="text"
          placeholder="Search articles..."
          onChange={handleSearch}
          className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md  shadow-sm focus:outline-none  focus:border-gray-500  hover:border-gray-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
