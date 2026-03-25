import clsx from "clsx";

import "./CatalogPaginationButton.scss";

import ArrowIcon from "~/assets/icons/arrow-top.svg?react";

interface CatalogPagnationButtonProps {
  isPrev?: boolean;
  isNext?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
  number?: number;
  onClick?: () => void;
}

const CatalogPaginationButton = ({
  isNext,
  isPrev,
  number,
  isDisabled,
  isActive,
  onClick,
}: CatalogPagnationButtonProps) => {
  return (
    <button
      type="button"
			disabled={isDisabled}
      className={clsx("catalog-pagination-button", {
        "catalog-pagination-button--prev": isPrev,
        "catalog-pagination-button--next": isNext,
        "catalog-pagination-button--disabled": isDisabled,
        "catalog-pagination-button--active": isActive,
      })}
      onClick={onClick}
    >
      {isNext || isPrev ? <ArrowIcon /> : number}
    </button>
  );
};

export default CatalogPaginationButton;
