import "./FiltersDropdown.scss";

import type { IFilterVariant } from "~/data/FiltersTypesData";

import { useRef } from "react";
import clsx from "clsx";

interface FiltersDropdownProps {
  onClick: (variant: IFilterVariant) => void;
  data: IFilterVariant[];
  isOpen: boolean;
  selectedValues: string[];
}

const FiltersDropdown = ({
  onClick,
  data,
  isOpen,
  selectedValues,
}: FiltersDropdownProps) => {
  const filtersDropdownRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="filters-dropdown"
      style={
        isOpen
          ? { height: filtersDropdownRef.current?.scrollHeight }
          : { height: "0px" }
      }
    >
      <div className={clsx("filters-dropdown__body")} ref={filtersDropdownRef}>
        {data.map((filter) => {
          const isSelected = selectedValues.includes(filter.value);

          return (
            <button
              type="button"
              className={clsx("filters-dropdown__button", {
                active: isSelected,
              })}
              key={filter.id}
              onClick={() => onClick(filter)}
            >
							<span className="filters-dropdown__button-field"></span>
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FiltersDropdown;
