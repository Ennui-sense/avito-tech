import "./FiltersToggleButton.scss";

import clsx from "clsx";

interface FilterToggleButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const FiltersToggleButton = ({
  isActive,
  onClick,
}: FilterToggleButtonProps) => {
  return (
    <button
      type="button"
      className={clsx("filters-toggle-button", { active: isActive })}
      onClick={onClick}
    >
      <span className="filters-toggle-button__thumb"></span>
      <span className="filters-toggle-button__label visually-hidden">
        Фильтр для отображения товаров, требующих доработок
      </span>
    </button>
  );
};

export default FiltersToggleButton;
