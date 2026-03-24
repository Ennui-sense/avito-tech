import clsx from "clsx";
import "./Input.scss";

import InputSuffixIcon from "~/assets/icons/input-suffix.svg?react";

interface InputProps {
  inputType: "number" | "text" | "textarea";
  label?: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  isError?: boolean;
}

const Input = ({
  inputType,
  label,
  id,
  value,
  onChange,
  onBlur,
  error,
  isError,
}: InputProps) => {
  const fieldsWithoutLabel = ["name", "price", "description"];

  return (
    <div
      className={clsx("input", {
        "input--error": Boolean(error) || isError,
      })}
    >
      <label
        htmlFor={id}
        className={clsx("input__label", {
          "visually-hidden": fieldsWithoutLabel.includes(id),
        })}
      >
        {label}
      </label>

      <div
        className={clsx("input__field", {
          "input__field--textarea": inputType === "textarea",
        })}
      >
        {inputType === "textarea" ? (
          <textarea
            className="input__field-input"
            id={id}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
          />
        ) : (
          <input
            type={inputType}
            className="input__field-input"
            id={id}
            placeholder={label}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onBlur={onBlur}
          />
        )}

        {inputType !== "textarea" && (
          <button
            type="button"
            className="input__field-button"
            onClick={() => onChange("")}
          >
            <InputSuffixIcon />
          </button>
        )}
      </div>

      {error && <p className="input__error">{error}</p>}
    </div>
  );
};

export default Input;
