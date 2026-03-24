import clsx from "clsx";
import "./Fieldset.scss";

import Select from "../Select/Select";
import Input from "../Input/Input";

import type { SelectOption } from "~/types";

interface FieldsetProps {
  legend: string;
  className: string;
  inputType: "select" | "text" | "number" | "textarea";
  options?: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
}

const Fieldset = ({
  legend,
  className,
  inputType,
  options,
  value,
  onChange,
  onBlur,
  error,
}: FieldsetProps) => {
  return (
    <fieldset className={clsx("fieldset", className)}>
      <legend className="fieldset__legend">{legend}</legend>

      {inputType === "select" ? (
        <Select
          value={value}
          options={options ?? []}
          className={`fieldset--${className.split("__").at(-1)}`}
          onChange={onChange}
          isError={Boolean(error)}
        />
      ) : (
        <Input
          inputType={inputType}
          id={legend}
          label={inputType === "textarea" ? undefined : legend}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
        />
      )}
    </fieldset>
  );
};

export default Fieldset;