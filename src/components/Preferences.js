import React, { useState, useEffect } from "react";
import axios from "axios";

const Preferences = ({
  handlePreferences,
  selectedSource,
  setSelectedSource,
}) => {
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(selectedSource, "selectedSourcessssssss");
  // useEffect(() => {
  //   // Fetch sources and categories when the component mounts
  //   const fetchSourcesAndCategories = async () => {
  //     const sourcesResponse = await axios.get(
  //       "https://newsapi.org/v2/sources?apiKey=2babd3a1b3624291b69ed99e80d1d819"
  //     );
  //     const categoriesResponse = await axios.get(
  //       "https://newsapi.org/v2/top-headlines/sources?apiKey=2babd3a1b3624291b69ed99e80d1d819"
  //     );

  //     setSources(sourcesResponse.data.sources);
  //     // Extract unique categories from sources
  //     const uniqueCategories = [
  //       ...new Set(
  //         sourcesResponse.data.sources.map((source) => source.category)
  //       ),
  //     ];
  //     setCategories(uniqueCategories);
  //   };

  //   fetchSourcesAndCategories();
  // }, []);

  const handleSourceChange = (e) => {
    const selectedSource = e.target.value;
    setSelectedSource(selectedSource);
    handlePreferences({ type: "source", value: selectedSource });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    handlePreferences({ type: "category", value: selectedCategory });
  };

  return (
    <div>
      <h2>Preferences</h2>
      <div>
        <label htmlFor="source">Source:</label>
        <select
          id="source"
          onChange={handleSourceChange}
          value={selectedSource}
        >
          <option value="">Select Source</option>
          <option value="newsAPI">News API</option>
          <option value="theGuardian">The Guardian</option>
          <option value="nytimes">New York Times</option>
        </select>
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Preferences;
