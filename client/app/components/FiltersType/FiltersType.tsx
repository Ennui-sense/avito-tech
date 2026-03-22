import "./FiltersType.scss";

import clsx from "clsx";

import ArrowTopIcon from "~/assets/icons/arrow-top.svg?react";

import type { IFilterVariant } from "~/data/FiltersTypesData";

import { useState } from "react";

import FiltersDropdown from "../FiltersDropdown/FiltersDropdown";

interface FiltersTypeProps {
  label: string;
  variants: IFilterVariant[];
}

const FiltersType = ({ label, variants }: FiltersTypeProps) => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  let activeFilters: IFilterVariant[] = [];

  const manageDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const chooseFilters = (addedFilter: IFilterVariant) => {
    if (!activeFilters.some((filter) => filter.id === addedFilter.id)) {
      activeFilters.push(addedFilter);
    } else {
      activeFilters = activeFilters.filter(
        (filter) => filter.id !== addedFilter.id,
      );
    }

    console.log(activeFilters);
  };
  return (
    <div className="filters-type">
      <button
        type="button"
        className={clsx("filters-type__button", { active: openDropdown })}
        onClick={() => manageDropdown()}
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
