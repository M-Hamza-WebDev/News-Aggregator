import React, { useEffect, useState } from "react";
import { getNewsFromApi } from "../api/newsApi";

const DateFilter = ({

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
    <div className="sm:max-w-[227px] max-w-[343px] w-full mx-auto">
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor="source"
      >
        Filter By Article Date:
      </label>
      <div className="mt-1 relative">
        <select
          id="source"
          value={selectedArticleDate}
          onChange={handleSourceChange}
          className="block appearance-none w-full text-center bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow-sm leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a source</option>
          {/* Render dropdown options based on original sources */}
          {originalSources.map((date) => (
            <option key={date} value={date}>
              {date}
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

export default DateFilter;
