import clsx from "clsx";
import "./SortDropdown.scss";

import type { ISortVariant } from "~/data/SortVariantsData";

import { useRef } from "react";

interface SortDropdownProps {
  className?: string;
  onClick: (variant: ISortVariant) => void;
  data: ISortVariant[];
  isOpen: boolean;
}

const SortDropdown = ({
  className,
  onClick,
  data,
  isOpen,
}: SortDropdownProps) => {
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="sort-dropdown"
      style={
        isOpen
          ? { height: sortDropdownRef.current?.scrollHeight }
          : { height: "0px" }
      }
    >
      <div
        className={clsx("sort-dropdown__body", className)}
        ref={sortDropdownRef}
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
    </div>
  );
};

export default SortDropdown;
