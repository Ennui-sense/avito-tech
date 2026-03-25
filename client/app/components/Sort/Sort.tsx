import "./Sort.scss";

import ArrowTopIcon from "~/assets/icons/arrow-top.svg?react";
import SortDropdown from "../SortDropdown/SortDropdown";

import { useState } from "react";
import clsx from "clsx";

import { SortOptionsData } from "~/data/SortOptionsData";
import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { setSort } from "~/store/catalogSlice";

import type { ISortOption } from "~/data/SortOptionsData";

const Sort = () => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector((state) => state.catalog.sort);

  const [openDropdown, setOpenDropdown] = useState(false);

  const activeSort =
    SortOptionsData.find((option) => option.value === currentSort) ||
    SortOptionsData[0];

  const manageDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  const chooseSort = (sort: ISortOption) => {
    dispatch(setSort(sort.value));
    setOpenDropdown(false);
  };

  return (
    <div className="sort">
      <button
        type="button"
        className={clsx("sort__button", { active: openDropdown })}
        onClick={manageDropdown}
      >
        {activeSort.label}
        <ArrowTopIcon />
      </button>

      {openDropdown && (
        <SortDropdown
          className="sort__dropdown"
          onClick={chooseSort}
          data={SortOptionsData}
        />
      )}
    </div>
  );
};

export default Sort;