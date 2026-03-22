import "./Sort.scss";

import ArrowTopIcon from "~/assets/icons/arrow-top.svg?react";

import SortDropdown from "../SortDropdown/SortDropdown";

import { useState } from "react";

import clsx from "clsx";

import { SortVariantsData } from "~/data/SortVariantsData";

import type { ISortVariant } from "~/data/SortVariantsData";

const Sort = () => {
  const initialSortVariant = SortVariantsData.find(
    (variant) => variant.id === 1,
  ) as ISortVariant;

  const [OpenDropdown, setOpenDropdown] = useState<boolean>(false);
  const [activeSortVariant, setActiveSortVariant] =
    useState<ISortVariant>(initialSortVariant);

  const manageDropdown = () => {
    setOpenDropdown(!OpenDropdown);
  };

  const chooseSort = (variant: ISortVariant) => {
    setActiveSortVariant(variant);
    setOpenDropdown(false);
  };

  return (
    <div className="sort">
      <button
        type="button"
        className={clsx("sort__button", { active: OpenDropdown })}
        onClick={() => manageDropdown()}
      >
        {activeSortVariant.label}
        <ArrowTopIcon />
      </button>
      {OpenDropdown && (
        <SortDropdown
          className="sort__dropdown"
          onClick={chooseSort}
          data={SortVariantsData}
        />
      )}
    </div>
  );
};

export default Sort;
