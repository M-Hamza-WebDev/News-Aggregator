import React from "react";

const Preferences = ({
  handlePreferences,
  selectedSource,
  setSelectedSource,
}) => {
  const handleSourceChange = (e) => {
    const selectedSource = e.target.value;
    setSelectedSource(selectedSource);
    handlePreferences({ type: "source", value: selectedSource });
  };

  return (
    <div>
      <div className="sm:max-w-[227px] max-w-[343px] w-full mx-auto">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="source"
        >
          Prefered API source:
        </label>
        <div className="mt-1 relative">
          <select
            id="source"
            onChange={handleSourceChange}
            value={selectedSource}
            className="block appearance-none w-full text-center bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Source</option>
            <option value="newsAPI">News API</option>
            <option value="nytimes">New York Times</option>
            <option value="newsData">News Data</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0l3.293 3.293 3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
