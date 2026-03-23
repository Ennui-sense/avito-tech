import clsx from "clsx";
import "./DisplayButton.scss";

interface DisplayButtonProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
  active: boolean;
}

const DisplayButton = ({
  Icon,
  onClick,
  active,
}: DisplayButtonProps) => {
  return (
    <button
      type="button"
      className={clsx("display-button", { active: active })}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
};

export default DisplayButton;
