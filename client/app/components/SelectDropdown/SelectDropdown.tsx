import clsx from "clsx";
import "./SelectDropdown.scss";
import type { SelectOption } from "~/types";

interface SelectDropdownProps {
  onClick: (option: SelectOption) => void;
  options: SelectOption[];
  className: string;
}

const SelectDropdown = ({ onClick, options, className }: SelectDropdownProps) => {
  return (
    <div className={clsx("select-dropdown", className)}>
      {options.map((option) => (
        <button
          type="button"
          className="select-dropdown__button"
          key={option.value}
          onClick={() => onClick(option)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SelectDropdown;