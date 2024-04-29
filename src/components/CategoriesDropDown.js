import React, { useEffect, useState } from "react";
import { getNewsFromApi } from "../api/newsApi";

const CategoriesDropDown = ({
  articles,
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
    if (selectedSource == "newsAPI") {
      console.log(selectedSource, "abb");
      const categories = newsApiCategories.map((article) => article);
      // Remove duplicates and set original categories
      const uniqueSources = Array.from(
        new Set(categories.map((category) => category.name))
      ).map((name) => categories.find((category) => category.name === name));
      console.log(uniqueSources, "uniqueSources");
      setOriginalCategories(uniqueSources);
    } else {
      // Fetch news articles from API
      getNewsFromApi(null, null, selectedSource, null, null)
        .then((data) => {
          // Extract categories from articles

          // const categories =
          //   selectedSource == "newsApi"
          //     ? newsApiCategories.map((article) => article)
          //     : data.map((article) => article.category);
          // console.log(categories, "bablu");
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

  const handleSourceChange = async (event) => {
    const selectedSourceId = event.target.value;
    console.log(selectedSourceId, "232");

    // Update selected article category state
    setSelectedArticleCategory(selectedSourceId);
    console.log(storedArticles, "stored");
    if (selectedSource == "newsAPI") {
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
      // const filteredArticles = storedArticles.filter((article) => {
      //   return article === selectedSourceId;
      // });
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
    <div>
      <label htmlFor="category">Article Categories:</label>
      <select
        id="category"
        value={selectedArticleCategory}
        onChange={handleSourceChange}
      >
        <option value="">Select a category</option>
        {/* Render dropdown options based on original categories */}
        {originalCategories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name.slice(0, 30)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoriesDropDown;
