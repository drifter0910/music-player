import React from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSearch } from "react-icons/ai";
const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="search-bar__nav">
        <button className="backward">
          <AiOutlineArrowLeft />
        </button>
        <button className="forward">
          <AiOutlineArrowRight />
        </button>
      </div>
      <form action="">
        <div className="search-bar__container">
          <AiOutlineSearch />
          <input type="text" placeholder="Tìm kiếm bài hát" />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
