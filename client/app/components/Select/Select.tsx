import "./Select.scss";

import ArrowTopIcon from "~/assets/icons/arrow-top.svg?react";
import SelectDropdown from "../SelectDropdown/SelectDropdown";

import { useState } from "react";
import clsx from "clsx";

import type { SelectOption } from "~/types";

interface SelectProps {
  value: string;
  options: SelectOption[];
  label?: string;
  className?: string;
  onChange: (value: string) => void;
  isError?: boolean;
}

const Select = ({
  value,
  options,
  className,
  isError,
  label,
  onChange,
}: SelectProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const activeOption = options.find((option) => option.value === value);

  const manageDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  const chooseOption = (option: SelectOption) => {
    onChange(option.value);
    setOpenDropdown(false);
  };

  return (
    <div
      className={clsx("select", className, {
        "select--error": isError,
      })}
    >
      {label && <p className="select__label">{label}</p>}

      <button
        type="button"
        className={clsx("select__button", { active: openDropdown })}
        onClick={manageDropdown}
      >
        {activeOption?.label ?? "Выберите значение"}

        <ArrowTopIcon />
      </button>

      {openDropdown && (
        <SelectDropdown
          onClick={chooseOption}
          options={options}
          className="select__dropdown"
        />
      )}
    </div>
  );
};

export default Select;
