import clsx from "clsx";
import "./Button.scss";

import EditIcon from "~/assets/icons/edit.svg?react";

interface ButtonProps {
  className: string;
  children: string;
  href?: string;
  isEdit?: boolean;
  variant?: "accent" | "gray";
	onClick?: () => void;
}

const Button = ({
  className,
  children,
  href,
  isEdit,
  variant,
	onClick
}: ButtonProps) => {
  return href ? (
    <a href={href} className={clsx("button", className, `button--${variant}`)}>
      {children}

      {isEdit && <EditIcon />}
    </a>
  ) : (
    <button
      type="button"
      className={clsx("button", className, `button--${variant}`)}
			onClick={onClick}
    >
      {children}

      {isEdit && <EditIcon />}
    </button>
  );
};

export default Button;
