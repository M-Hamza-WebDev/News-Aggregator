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
  const [selectedSource, setSelectedSource] = useState("newsAPI");
  const [loadingArticles, setLoadingArticles] = useState(true);
  console.log(loadingArticles, "loadingArticles");

  useEffect(() => {
    async function getNews() {
      const news = await getNewsFromApi();
      setArticles(news);
      setStoredArticles(news);
      setLoadingArticles(false);
    }
    getNews();
  }, []);

  const handleSearch = async (e) => {
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

    const news = await getNewsFromApi(query, `sortBy=${selectedFilter}`);
    setArticles(news);
    setStoredArticles(news);
  };

  const handlePreferences = async (preference) => {
    if (preference.type === "source") {
      console.log("log");
      const news = await getNewsFromApi(
        null,
        null,
        preference.value,
        null,
        selectedArticleCategory
      );
      console.log(news, "nynews");
      setArticles(news);
      setStoredArticles(news);
    }
  };

  return (
    <>
      <div className="App xl:mx-auto xl:container w-full 2xl:max-w-[1184px] 2xl:px-0 lg:px-8 md:px-6 px-4 py-10">
        <div className="grid sm:grid-cols-3  sm:items-end sm:gap-x-4  sm:gap-y-0 gap-y-5">
          <div className="max-w-[300px] sm:block hidden ">
            <svg
              className=" "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 50"
            >
              <rect width="50" height="50" fill="#333" />
              <path d="M30 40h-15v-15h15v15zM10 25h10v10h-10z" fill="#fff" />

              <text
                x="70"
                y="35"
                font-family="Arial, sans-serif"
                // font-size="24"
                fill="#333"
              >
                News Aggregator
              </text>
            </svg>
          </div>
          <h1 className="sm:hidden block xl:text-3xl lg:text-3xl sm:text-2xl text-xl font-semibold text-center text-gray-800 uppercase tracking-wide ">
              News Aggregator
            </h1>

          <Preferences
            handlePreferences={handlePreferences}
            selectedSource={selectedSource}
            setSelectedSource={setSelectedSource}
          />
          <SearchBar handleSearch={handleSearch} handleFilter={handleFilter} />
        </div>

        <div className="grid sm:grid-cols-3 sm:gap-4 gap-5 sm:mt-12 mt-5 mb-16">
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
        </div>
        {loadingArticles ? (
          <div className="">
            <div className="   loader"></div>
            <h3 className="mt-4 font-semibold text-gray-700">
              Please wait while the articles are loading...
            </h3>
          </div>
        ) : (
          <ArticleList articles={articles} />
        )}
      </div>
    </>
  );
}

export default App;
