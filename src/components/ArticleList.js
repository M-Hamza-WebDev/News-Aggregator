import React from "react";

const ArticleList = ({ articles }) => {
  return (
    <div>
      {articles.map((_article, index) => {
        return (
          <div key={index}>
            {_article.title && <h3>{_article.title}</h3>}
            {_article.description && <p>{_article.description}</p>}
            {_article.url && (
              <a href={_article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ArticleList;
