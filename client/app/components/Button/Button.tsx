import clsx from "clsx";
import "./Button.scss";

interface ButtonProps {
  className: string;
  children: string;
  href?: string;
  variant?: "accent" | "gray" | "light" | "yellow";
  disabled?: boolean;
  onClick?: () => void;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  direction?: "row" | "row-reverse";
  size?: "default" | "small" | "x-small" | "large";
}

const Button = ({
  className,
  children,
  href,
  variant,
  disabled,
  Icon,
  direction = "row",
  size = "default",
  onClick,
}: ButtonProps) => {
  return href ? (
    <a
      href={href}
      className={clsx(
        "button",
        className,
        `button--${variant}`,
        `button--${size}`,
      )}
      style={{ flexDirection: direction }}
    >
      {children}

      {Icon && <Icon />}
    </a>
  ) : (
    <button
      type="button"
      className={clsx(
        "button",
        className,
        `button--${variant}`,
        `button--${size}`,
      )}
      onClick={onClick}
      disabled={disabled}
      style={{ flexDirection: direction }}
    >
      {children}

      {Icon && <Icon />}
    </button>
  );
};

export default Button;
