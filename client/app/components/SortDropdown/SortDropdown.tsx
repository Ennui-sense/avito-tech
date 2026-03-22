import clsx from "clsx";
import "./SortDropdown.scss";

import type { ISortVariant } from "~/data/SortVariantsData";

interface SortDropdownProps {
  className?: string;
  onClick: (variant: ISortVariant) => void;
  data: ISortVariant[];
}

const SortDropdown = ({
  className,
  onClick,
  data,
}: SortDropdownProps) => {
  return (
    <div className={clsx("sort-dropdown", className)}>
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
