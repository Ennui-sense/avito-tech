import "./Search.scss";

import SearchIcon from "~/assets/icons/search.svg?react";

const Search = () => {
  return (
    <form action="" className="search">
      <input
        className="search__input"
        type="text"
        name="search"
        placeholder="Найти объявление...."
      />

      <button className="search__button" type="button">
        <SearchIcon />
      </button>
    </form>
  );
};

export default Search;
