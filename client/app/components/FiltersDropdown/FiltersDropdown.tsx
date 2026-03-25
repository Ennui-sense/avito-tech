import "./FiltersDropdown.scss";

import type { IFilterVariant } from "~/data/FiltersTypesData";

import { useRef } from "react";
import clsx from "clsx";

interface FiltersDropdownProps {
  onClick: (variant: IFilterVariant) => void;
  data: IFilterVariant[];
  isOpen: boolean;
}

const FiltersDropdown = ({ onClick, data, isOpen }: FiltersDropdownProps) => {
  const filterDropdownRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="filter-dropdown"
      style={
        isOpen
          ? { height: filterDropdownRef.current?.scrollHeight }
          : { height: "0px" }
      }
    >
      <div className={clsx("filter-dropdown__body")} ref={filterDropdownRef}>
        {data.map((filter) => (
          <div className="filter-dropdown__field" key={filter.id}>
            <input
              type="checkbox"
              name={filter.value}
              id={filter.value}
              className="filter-dropdown__input"
              onClick={() => onClick(filter)}
            />
            <label htmlFor={filter.value} className="filter-dropdown__label">
              {filter.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FiltersDropdown;
