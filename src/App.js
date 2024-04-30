import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Preferences from "./components/Preferences";
import ArticleList from "./components/ArticleList";
import { getNewsFromApi } from "./api/newsApi";
import SourceDropDown from "./components/SourceDropDown";
import CategoriesDropDown from "./components/CategoriesDropDown";
import DateFilter from "./components/DateFilter";

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedarticleSource, setSelectedArticleSource] = useState("");
  const [selectedArticleCategory, setSelectedArticleCategory] = useState("");
  const [selectedArticleDate, setSelectedArticleDate] = useState("");
  const [storedArticles, setStoredArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("");
  const [filter, setFilter] = useState("");
  const [preferences, setPreferences] = useState({ source: "", category: "" });
  const [selectedSource, setSelectedSource] = useState("newsAPI");

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
      console.log("log");
      const news = await getNewsFromApi(null, null, preference.value, null,selectedArticleCategory);
      console.log(news, "nynews");
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
    <div className="App xl:mx-auto xl:container w-full 2xl:max-w-[1184px] 2xl:px-0 lg:px-8 md:px-6 px-4">
      <h1>News Aggregator</h1>
      <SearchBar handleSearch={handleSearch} handleFilter={handleFilter} />
      <SourceDropDown
        articles={articles}
        setArticles={setArticles}
        storedArticles={storedArticles}
        selectedarticleSource={selectedarticleSource}
        setSelectedArticleSource={setSelectedArticleSource}
        selectedSource={selectedSource}
      />
      <CategoriesDropDown
        articles={articles}
        setArticles={setArticles}
        storedArticles={storedArticles}
        setStoredArticles={setStoredArticles}
        selectedArticleCategory={selectedArticleCategory}
        setSelectedArticleCategory={setSelectedArticleCategory}
        selectedSource={selectedSource}
      />
        <DateFilter
        articles={articles}
        setArticles={setArticles}
        storedArticles={storedArticles}
        setStoredArticles={setStoredArticles}
        selectedArticleDate={selectedArticleDate}
        setSelectedArticleDate={setSelectedArticleDate}
        selectedSource={selectedSource}
      />
      <Preferences
        handlePreferences={handlePreferences}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
      />
      <ArticleList articles={articles} />
    </div>
  );
}

export default App;
