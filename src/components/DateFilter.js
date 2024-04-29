import React, { useEffect, useState } from "react";
import { getNewsFromApi } from "../api/newsApi";

const DateFilter = ({
  articles,
  setArticles,
  storedArticles,
  selectedArticleDate,
  setSelectedArticleDate,
  selectedSource,
}) => {
  // State to hold original sources
  const [originalSources, setOriginalSources] = useState([]);
  console.log(selectedSource, "selectedSource");
  useEffect(() => {
    // Fetch news articles from API
    getNewsFromApi(null, null, selectedSource, null)
      .then((data) => {
        console.log(selectedSource, "111111111111111111");

        // Extract sources from articles

        const sources = data.map((article) => article.publishedAt);

        // Remove duplicates and set original sources
        const uniqueSources = Array.from(
          new Set(sources.map((date) => date))
        ).map((date) => sources.find((pubDate) => pubDate === date));
        setOriginalSources(uniqueSources);
      })
      .catch((error) => {
        console.error("Error fetching news articles:", error);
      });
  }, [selectedSource]);

  const handleSourceChange = (event) => {
    const selectedSourceId = event.target.value;
    console.log(selectedSourceId, "232");

    // Update selected article source state
    setSelectedArticleDate(selectedSourceId);
    console.log(storedArticles, "stored");
    if (selectedSourceId) {
      // Filter articles based on selected source
      const filteredArticles = storedArticles.filter((article) => {
        return article.publishedAt === selectedSourceId;
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
    <div>
      <label htmlFor="source">Filter By Article Date:</label>
      <select
        id="source"
        value={selectedArticleDate}
        onChange={handleSourceChange}
      >
        <option value="">Select a source</option>
        {/* Render dropdown options based on original sources */}
        {originalSources.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateFilter;
