import React from "react";
import noApiImage from "../assets/pngs/no-image-by-api.png";

const ArticleList = ({ articles }) => {
  function dateConversion(oldDate) {
    let formattedDate = "";
    if (oldDate.includes("T")) {
      const dateParts = oldDate.split("T")[0].split("-");
      formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
    } else {
      const [datePart] = oldDate.split("/");
      const [month] = datePart.split(" ");
      const dateObject = new Date(month);
      const month_ = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so we add 1
      const day_ = String(dateObject.getDate()).padStart(2, "0");
      const year_ = dateObject.getFullYear();
      return (formattedDate = `${month_}/${day_}/${year_}`);
    }
    return formattedDate;
  }
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8  ">
      {articles.map((_article, index) => {
        return (
          <>
            <div
              key={index}
              className="sm:max-w-auto max-w-[343px] w-full shadow-md flex flex-1 flex-col h-full  rounded-b-lg    transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 mx-auto"
            >
              <img
                src={_article.urlToImage ? _article.urlToImage : noApiImage}
                alt="Article Image"
                className="h-[243px] rounded-t-lg"
              />
              <div className="flex flex-1 flex-col h-full p-4 bg-white rounded-b-lg border ">
                <div className="flex justify-between mb-2 ">
                  <span className="!mb-0 text-[#DB0000]">
                    {_article.source.name.slice(0,18)}
                  </span>
                  <span className="block  !text-[#707070] !mb-0">
                    {dateConversion(_article.publishedAt)}
                  </span>
                </div>
                <h3 className="  text-[#272727] font-bold  mb-2.5 text-center">
                  {_article.title ? _article.title : "No title by api to show"}
                </h3>

                <p className="text-[#929292] text-sm  text-center mb-3">
                  {_article.description
                    ? _article.description.slice(0, 169) + "..."
                    : "no description by the api to show"}
                </p>

                {_article.url && (
                  <a
                    className="group text-[#929292] hover:text-[#337ab7]  flex justify-center   items-center mx-auto mt-auto w-fit   transition-[0.4s]  rounded-lg  gap-x-1 mb-3 "
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
                          className="stroke-[#929292] group-hover:stroke-[#337ab7]"
                          id="Path_308"
                          data-name="Path 308"
                          d="M1491.613-700.05l6.9,6.9-6.9,6.9"
                          transform="translate(-7.09 2.6)"
                          fill="none"
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
