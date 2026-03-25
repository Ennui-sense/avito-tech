import "./FiltersType.scss";

import clsx from "clsx";
import { useState } from "react";

import ArrowTopIcon from "~/assets/icons/arrow-top.svg?react";

import type { IFilterVariant } from "~/data/FiltersTypesData";

import FiltersDropdown from "../FiltersDropdown/FiltersDropdown";

import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { toggleCategory, type Category } from "~/store/catalogSlice";

interface FiltersTypeProps {
  label: string;
  variants: IFilterVariant[];
}

const FiltersType = ({ label, variants }: FiltersTypeProps) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const activeCategories = useAppSelector((state) => state.catalog.categories);

  const manageDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  const chooseFilters = (addedFilter: IFilterVariant) => {
    dispatch(toggleCategory(addedFilter.value as Category));
  };

  const selectedValues = activeCategories;

  return (
    <div className="filters-type">
      <button
        type="button"
        className={clsx("filters-type__button", { active: openDropdown })}
        onClick={manageDropdown}
      >
        {label}
        <ArrowTopIcon />
      </button>

      <FiltersDropdown
        onClick={chooseFilters}
        data={variants}
        isOpen={openDropdown}
      />
    </div>
  );
};

export default FiltersType;