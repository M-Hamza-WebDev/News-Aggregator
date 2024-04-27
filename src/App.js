import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Preferences from "./components/Preferences";
import ArticleList from "./components/ArticleList";
import { getNewsFromApi } from "./api/newsApi";

function App() {
  const [articles, setArticles] = useState([]);
  const [storedArticles, setStoredArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("");
  const [filter, setFilter] = useState("");
  const [preferences, setPreferences] = useState({ source: "", category: "" });

  useEffect(() => {
    async function getNews() {
      const news = await getNewsFromApi();
      setArticles(news);
      setStoredArticles(news);
    }
    getNews();
  }, []);

  const handleSearch = async (e) => {
    // const searchQuery = e.target.value;
    // setQuery(searchQuery);
    // const news = await getNewsFromApi(searchQuery, null, source);
    // setArticles(news);
    // setStoredArticles(news);

    const searchQuery = e.target.value;
    setQuery(searchQuery);
    if (storedArticles.length > 0 && searchQuery.length >= 3) {
      const filteredNews = storedArticles.filter((_article) => {
        if (_article.title.toLowerCase().includes(searchQuery.toLowerCase()))
          return _article;
      });
      setArticles(filteredNews);
    } else {
      setArticles(storedArticles);
    }
  };

  const handleFilter = async (e) => {
    const selectedFilter = e.target.value;
    console.log({ selectedFilter });
    setFilter(selectedFilter);
    const news = await getNewsFromApi(query, `sortBy=${selectedFilter}`);
    setArticles(news);
    setStoredArticles(news);
  };

  const handlePreferences = async (preference) => {
    if (preference.type === "source") {
      const news = await getNewsFromApi(null, null, preference.value);
      setArticles(news);
      setStoredArticles(news);
      setSource(preference.value);
    }
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [preference.type]: preference.value,
    }));

    // // Fetch articles based on selected preferences
    // const fetchArticlesWithPreferences = async () => {
    //   const { source, category } = preferences;
    //   const news = await getNewsFromApi(
    //     query,
    //     `sources=${source}&category=${category}`
    //   );
    //   setArticles(news);
    // };

    // fetchArticlesWithPreferences();
  };

  return (
    <div className="App">
      <h1>News Aggregator</h1>
      <SearchBar handleSearch={handleSearch} handleFilter={handleFilter} />
      <Preferences handlePreferences={handlePreferences} />
      <ArticleList articles={articles} />
    </div>
  );
}

export default App;
