import type React from "react";
import "./Search.scss";

import SearchIcon from "~/assets/icons/search.svg?react";

import { useAppDispatch } from "~/hooks/redux";
import { setSearch } from "~/store/catalogSlice";

import { useState } from "react";

const Search = () => {
  const [value, setValue] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    dispatch(setSearch(value));
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
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
