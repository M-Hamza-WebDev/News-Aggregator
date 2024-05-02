import axios from "axios";

const {
  REACT_APP_NEWS_API_URL: News_API_URL,
  REACT_APP_NEWS_API_KEY: News_API_KEY,
  REACT_APP_NEWS_DATA_API_URL: NEWS_DATA_API_URL,
  REACT_APP_NEWS_DATA_API_KEY: NEWS_DATA_API_KEY,
  REACT_APP_NYTIMES_API_URL: NYTIMES_API_URL,
  REACT_APP_NYTIMES_API_KEY: NYTIMES_API_KEY,
} = process.env;

export const getNewsFromApi = async (
  query,
  filter,
  source,
  selectedarticleSource,
  selectedArticleCategory
) => {
  try {
    let url;
    switch (source) {
      case "newsData":
        url = `${NEWS_DATA_API_URL}${NEWS_DATA_API_KEY}`;
        break;
      case "nytimes":
        url = `${NYTIMES_API_URL}${NYTIMES_API_KEY}`;
        break;
      default:
        url = `${News_API_URL}${query ? `&q=${query}` : ""}${
          selectedarticleSource ? `?sources=${selectedarticleSource}` : ""
        }${
          selectedArticleCategory ? `&category=${selectedArticleCategory}` : ""
        }${filter ? `&${filter}` : ""}${News_API_KEY}`;
    }

    const response = await axios.get(url);

    if (source === "newsData") {
      const newsDataNewsData = response.data.results.map((_news) => ({
        title: _news.title || "No Title by API to show",
        description: _news.description || "",
        url: _news.link || "",
        type: _news.category?.[0] || "No Type",
        source: { name: _news.source_id || "No Source" },
        category: { name: _news.category?.[0] || "No Category" },
        publishedAt: _news.pubDate || "No Date",
        urlToImage: _news.image_url || "",
      }));
      return newsDataNewsData;
    }

    if (source === "nytimes") {
      const nytimesNewsData = response?.data?.results?.map((_news) => ({
        title: _news.title || "No Title by API to show",
        description: _news.abstract || "",
        url: _news.url || "",
        type: _news.section || "No Type",
        source: { name: _news.byline || "No Source" },
        category: { name: _news.section || "No Category" },
        publishedAt: _news.published_date || "No Date",
        urlToImage: _news?.multimedia?.[0]?.url || "",
      }));
      return nytimesNewsData;
    }

    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
