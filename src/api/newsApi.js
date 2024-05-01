import axios from "axios";

const API_URL = "https://newsapi.org/v2/top-headlines?country=us";
const API_KEY = "&apiKey=2babd3a1b3624291b69ed99e80d1d819";

const GUARDIAN_API = "https://newsdata.io/api/1/news?";
const GUARDIAN_API_KEY = "apikey=pub_4308727ef6e1fea2cc1da250d6e6547c328d1";

const NYTIMES_API = "https://api.nytimes.com/svc/topstories/v2/home.json?";
const NYTIMES_API_KEY = "api-key=yZlid7r7Ye0lGRQaS00VEJ02Eis426z0";

export const getNewsFromApi = async (
  query,
  filter,
  source,
  selectedarticleSource,
  selectedArticleCategory,
  
) => {
  try {
    console.log(selectedarticleSource, "selectedarticleSource");
    // https://newsapi.org/ (newsAPI)
    let url = `${API_URL}${query ? `&q=${query}` : ""}${
      selectedarticleSource ? `?sources=${selectedarticleSource}` : ""
    }${selectedArticleCategory ? `&category=${selectedArticleCategory}` : ""}${
      filter ? `&${filter}` : ""
    }${API_KEY}`;

    if (source === "theGuardian") {
      url = `${GUARDIAN_API}${GUARDIAN_API_KEY}`;
    }

    if (source === "nytimes") {
      url = `${NYTIMES_API}${NYTIMES_API_KEY}`;
    }

    const response = await axios.get(url);
    
    if (source === "theGuardian") {
      console.log({ theGuardian: response });
      const theGuardianNewsData = response.data.results.map((_news) => {
        return {
          title: _news.title || "No Title by API to show",
          description: _news.description || "",
          url: _news.link || "",
          type: _news.category[0] || "No Type",
          source: { name: _news.source_id || "No Source" },
          category: { name: _news.category[0] || "No Category" },
          publishedAt: _news.pubDate || "No Date",
          urlToImage: _news.image_url || "",
        };
      });
      console.log({ theGuardianFormated: theGuardianNewsData });
      return theGuardianNewsData;
    }

    if (source === "nytimes") {
      console.log({ nytimes: response });
      const nytimesNewsData = response?.data?.results?.map((_news) => {
        return {
          title: _news.title || "No Title by API to show",
          description: _news.abstract || "",
          url: _news.url || "",
          type: _news.section || "No Type",
          source: { name: _news.byline || "No Source" },
          category: { name: _news.section || "No Category" },
          publishedAt: _news.published_date || "No Date",
          urlToImage: _news?.multimedia
            ? _news?.multimedia[0]?.url
            : "",
        };
      });
      console.log({ nytimesFormated: nytimesNewsData });
      return nytimesNewsData;
    }
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news from NewsAPI:", error);
    return [];
  }
};
