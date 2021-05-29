import React from "react";
import Post from "./Post";

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      <div className="search-results-container">
        <h2 className="">{results.length} Results</h2>
        {results.map((res, index) => {
          return <Post key={index} post={res} compact={true} />;
        })}
      </div>
    </div>
  );
};

export default React.memo(SearchResults);
