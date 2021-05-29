import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getResults = async () => {
      if (searchTerm === "") {
        setSearchResults([]);
      } else {
        const res = await fetch(`/api/search?q=${searchTerm}`);
        const { results } = await res.json();

        setSearchResults(results);
      }
    };
    getResults();
  }, [searchTerm]);
  return (
    <div className="searchbar">
      <div className="searchbar-container">
        <div className="searchbar-container-inner">
          <form>
            <input
              type="search"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Posts..."
            />

            <FaSearch className="icon" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Searchbar);
