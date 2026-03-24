import "./Sort.scss";

import ArrowTopIcon from "~/assets/icons/arrow-top.svg?react";

import SortDropdown from "../SortDropdown/SortDropdown";

import { useState } from "react";

import clsx from "clsx";

import { SortOptionsData } from "~/data/SortOptionsData";

import type { ISortOption } from "~/data/SortOptionsData";

const Sort = () => {
  const initialSort = SortOptionsData.find(
    (variant) => variant.id === 1,
  ) as ISortOption;

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [activeSort, setActiveSort] =
    useState<ISortOption>(initialSort);

  const manageDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const chooseSort = (sort: ISortOption) => {
    setActiveSort(sort);
    setOpenDropdown(false);
  };

  return (
    <div className="sort">
      <button
        type="button"
        className={clsx("sort__button", { active: openDropdown })}
        onClick={() => manageDropdown()}
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
