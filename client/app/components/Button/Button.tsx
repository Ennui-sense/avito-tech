import clsx from "clsx";
import "./Button.scss";

interface ButtonProps {
  className: string;
  children: string;
}

const Button = ({ className, children }: ButtonProps) => {
  return (
    <button
      type="button"
      className={clsx("button", className)}
    >
      {children}
    </button>
  );
};

export default Button;
