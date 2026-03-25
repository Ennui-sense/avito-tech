import type React from "react";
import "./Search.scss";

import SearchIcon from "~/assets/icons/search.svg?react";

import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { setSearch } from "~/store/catalogSlice";

import { useState } from "react";

const Search = () => {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.catalog.search);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form className="search">
      <input
        className="search__input"
        type="text"
        name="search"
        placeholder="Найти объявление..."
        value={value}
        onChange={(e) => handleChange(e)}
      />

      <button
        className="search__button"
        type="button"
        onClick={(e) => dispatch(setSearch(value))}
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default Search;
