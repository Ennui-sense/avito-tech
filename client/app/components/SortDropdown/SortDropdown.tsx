import "./SortDropdown.scss";

import clsx from "clsx";

import type { ISortOption } from "~/data/SortOptionsData";

interface SortDropdownProps {
  className?: string;
  onClick: (option: ISortOption) => void;
  data: ISortOption[];
}

const SortDropdown = ({ className, onClick, data }: SortDropdownProps) => {
  return (
    <div
      className={clsx("sort-dropdown", className)}
    >
      {data.map((variant) => (
        <button
          type="button"
          className="sort-dropdown__button"
          key={variant.id}
          onClick={() => onClick(variant)}
        >
          {variant.label}
        </button>
      ))}
    </div>
  );
};

export default SortDropdown;
