import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
