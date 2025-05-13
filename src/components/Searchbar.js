import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Searchbar.scss";
import { ReactComponent as SearchIcon } from "../images/search.svg";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Поиск"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="search-btn" onClick={handleSearch}>
        <SearchIcon />
      </button>
    </div>
  );
};

export default Searchbar;
