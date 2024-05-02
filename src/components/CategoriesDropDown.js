import React, { useEffect, useState } from "react";
import { getNewsFromApi } from "../api/newsApi";

const CategoriesDropDown = ({
  setArticles,
  storedArticles,
  setStoredArticles,
  selectedArticleCategory,
  setSelectedArticleCategory,
  selectedSource,
}) => {
  // State to hold original categories
  const [originalCategories, setOriginalCategories] = useState([]);
  const newsApiCategories = [
    { name: "business" },
    { name: "entertainment" },
    { name: "general" },
    { name: "health" },
    { name: "science" },
    { name: "sports" },
    { name: "technology" },
  ];

  useEffect(() => {
    if (selectedSource === "newsAPI") {
      setOriginalCategories(newsApiCategories);
    } else {
      // Fetch news articles from API
      getNewsFromApi(null, null, selectedSource, null, null)
        .then((data) => {
          const categories = data.map((article) => article.category);
          // Remove duplicates and set original categories
          const uniqueSources = Array.from(
            new Set(categories.map((category) => category.name))
          ).map((name) =>
            categories.find((category) => category.name === name)
          );
          setOriginalCategories(uniqueSources);
        })
        .catch((error) => {
          console.error("Error fetching news articles:", error);
        });
    }
  }, [selectedSource]);

  const handleCategoryChange = async (event) => {
    const selectedSourceId = event.target.value;
    console.log(selectedSourceId, "232");

    // Update selected article category state
    setSelectedArticleCategory(selectedSourceId);
    console.log(storedArticles, "stored");
    if (selectedSource === "newsAPI") {
      const news = await getNewsFromApi(
        null,
        null,
        selectedSource,
        null,
        selectedSourceId
      );
      console.log(news, "nynews");
      setArticles(news);
      setStoredArticles(news);
    } else if (selectedSourceId) {
      // Filter articles based on selected category
      const filteredArticles = storedArticles.filter((article) => {
        return article.category.name === selectedSourceId;
      });

      console.log(filteredArticles, "filteredArticles");
      // Update articles state with filtered articles
      setArticles(filteredArticles);
    } else {
      getNewsFromApi(null, null, selectedSource, null)
        .then((data) => {
          setArticles(data);
        })
        .catch((error) => {
          console.error("Error fetching news articles:", error);
        });
    }
  };

  return (
    <div className="sm:max-w-[227px] max-w-[343px] w-full mx-auto">
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor="category"
      >
        Article Categories:
      </label>
      <div className="mt-1 relative">
        <select
          id="category"
          value={selectedArticleCategory}
          onChange={handleCategoryChange}
          className="block appearance-none w-full text-center bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a category</option>
          {/* Render dropdown options based on original categories */}
          {originalCategories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name.slice(0, 30)}
            </option>
          ))}
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
  );
};

export default CategoriesDropDown;
