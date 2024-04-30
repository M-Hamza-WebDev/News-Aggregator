import React from "react";
import noApiImage from "../assets/pngs/no-image-by-api.png";

const ArticleList = ({ articles }) => {
  console.log(articles, "dsds");
  return (
    <div className="grid grid-cols-3 gap-8  ">
      {articles.map((_article, index) => {
        return (
          <>
       
              <div
                key={index}
                className="shadow-md flex flex-1 flex-col h-full  rounded-b-lg    transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 "
              >
                <img
                  src={_article.urlToImage ? _article.urlToImage : noApiImage}
                  alt="Article Image"
                  className="h-[243px] rounded-t-lg"
                />
                <div className="flex flex-1 flex-col h-full p-4 bg-white rounded-b-lg border ">
                  {_article.title && (
                    <h3 className="  text-[#272727] font-bold w-[90%] mb-2.5 text-center">
                      {_article.title}
                    </h3>
                  )}
                  {_article.description && (
                    <p className="text-[#929292] text-sm mb-4 text-center">
                      {_article.description.slice(0, 169) + "..."}
                    </p>
                  )}
                  {_article.url && (
                    <a
                      className="text-[#929292] flex justify-center   items-center mx-auto mt-auto w-fit   transition-[0.4s] px-5 py-3 rounded-lg  gap-x-1  "
                      href={_article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                      >
                        <g
                          id="button-icon"
                          transform="translate(-1472.526 706.474)"
                        >
                          <rect
                            id="Rectangle_147"
                            data-name="Rectangle 147"
                            width="31"
                            height="31"
                            rx="15"
                            transform="translate(1472.526 -706.474)"
                            fill="#fff"
                            opacity="0.2"
                          ></rect>
                          <path
                            id="Path_308"
                            data-name="Path 308"
                            d="M1491.613-700.05l6.9,6.9-6.9,6.9"
                            transform="translate(-7.09 2.6)"
                            fill="none"
                            stroke="#929292"
                            strokelinecap="round"
                            strokewidth="{2.5}"
                          ></path>
                        </g>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
          </>
        );
      })}
    </div>
  );
};

export default ArticleList;
