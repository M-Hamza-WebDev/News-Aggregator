// import React, { useEffect, useState } from "react";
// import { getNewsFromApi } from "../api/newsApi";

// const SourceDropDown = ({
//   articles,
//   setArticles,
//   storedArticles,
//   selectedarticleSource,
//   setSelectedArticleSource,
// }) => {
//   useEffect(() => {
//     //   setArticles(news);
//     //   setStoredArticles(news);
//   }, []);

//   const handleSourceChange = (event) => {
//     setSelectedArticleSource(event.target.value);
//     // articles.filter((i) => i.includes(selectedarticleSource));

//     console.log(articles, "articles");
//     setArticles(
//       articles.filter((source) => {
//         // Perform a case-insensitive search by converting both source and selectedarticleSource to lowercase
//         return source?.source?.name?.includes(event.target.value);
//       })
//     );

//     // async function getNews() {
//     //   console.log("124");
//     // }
//     // getNews();
//   };

//   return (
//     <div>
//       <label htmlFor="source">Article Source:</label>
//       <select
//         id="source"
//         value={selectedarticleSource}
//         onChange={handleSourceChange}
//       >
//         <option value="">Select a source</option>
//         {articles.map((article) => (
//           <option key={article?.id} value={article?.id}>
//             {article?.source?.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default SourceDropDown;
import React, { useEffect, useState } from "react";
import { getNewsFromApi } from "../api/newsApi";

const SourceDropDown = ({
  articles,
  setArticles,
  storedArticles,
  selectedarticleSource,
  setSelectedArticleSource,
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

        const sources = data.map((article) => article.source);

        // Remove duplicates and set original sources
        const uniqueSources = Array.from(
          new Set(sources.map((source) => source.name))
        ).map((name) => sources.find((source) => source.name === name));
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
    setSelectedArticleSource(selectedSourceId);
    console.log(storedArticles, "stored");
    if (selectedSourceId) {
      // Filter articles based on selected source
      const filteredArticles = storedArticles.filter((article) => {
        return article.source.name === selectedSourceId;
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
      <label htmlFor="source">Article Source:</label>
      <select
        id="source"
        value={selectedarticleSource}
        onChange={handleSourceChange}
      >
        <option value="">Select a source</option>
        {/* Render dropdown options based on original sources */}
        {originalSources.map((source) => (
          <option key={source.name} value={source.name}>
            {source.name.slice(0, 30)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SourceDropDown;
