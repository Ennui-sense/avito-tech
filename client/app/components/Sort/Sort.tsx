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

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [activeSortVariant, setActiveSortVariant] =
    useState<ISortVariant>(initialSortVariant);

  const manageDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const chooseSort = (variant: ISortVariant) => {
    setActiveSortVariant(variant);
    setOpenDropdown(false);
  };

  return (
    <div className="sort">
      <button
        type="button"
        className={clsx("sort__button", { active: openDropdown })}
        onClick={() => manageDropdown()}
      >
        {activeSortVariant.label}
        <ArrowTopIcon />
      </button>
			<SortDropdown
				className="sort__dropdown"
				onClick={chooseSort}
				data={SortVariantsData}
				isOpen={openDropdown}
			/>
      {/* {OpenDropdown && (
      )} */}
    </div>
  );
};

export default Sort;
