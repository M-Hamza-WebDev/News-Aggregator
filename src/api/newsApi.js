import axios from "axios";

const API_URL = "https://newsapi.org/v2/top-headlines?country=us";
const API_KEY = "&apiKey=2babd3a1b3624291b69ed99e80d1d819";

const GUARDIAN_API = "https://content.guardianapis.com/search?";
const GUARDIAN_API_KEY = "api-key=bf536b98-a820-43f3-8c31-029dfec47afa";

const NYTIMES_API = "https://api.nytimes.com/svc/topstories/v2/home.json?";
const NYTIMES_API_KEY = "api-key=yZlid7r7Ye0lGRQaS00VEJ02Eis426z0";

export const getNewsFromApi = async (query, filter, source) => {
  try {
    // https://newsapi.org/ (newsAPI)
    let url = `${API_URL}${query ? `&q=${query}` : ""}${
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
      console.log({ theGuardian: response.data.response.results });
      const theGuardianNewsData = response.data.response.results.map(
        (_news) => {
          return {
            title: _news.webTitle,
            description: null,
            url: _news.webUrl,
            type: _news.pillarName,
            publishDate: _news.webPublicationDate,
          };
        }
      );
      console.log({ theGuardianFormated: theGuardianNewsData });
      return theGuardianNewsData;
    }

    if (source === "nytimes") {
      console.log({ nytimes: response.data.results });
      const nytimesNewsData = response.data.results.map((_news) => {
        return {
          title: _news.title,
          description: _news.abstract,
          url: _news.url,
          type: _news.section,
          publishDate: _news.published_date,
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
