import "./Display.scss";

import DisplayButton from "../DisplayButton/DisplayButton";

import { DisplayButtonsData } from "~/data/DisplayButtonsData";

import { useState } from "react";

import type { IDisplayButton } from "~/data/DisplayButtonsData";

interface DisplayProps {
  onDisplayStyleChange: (display: "line" | "block") => void;
}

const Display = ({ onDisplayStyleChange }: DisplayProps) => {
  const [activeId, setActiveId] = useState<number>(1);

  const handleClick = (button: IDisplayButton) => {
    setActiveId(button.id);
    onDisplayStyleChange(button.value);
  };

  return (
    <div className="display">
      {DisplayButtonsData.map((button) => (
        <DisplayButton
          key={button.id}
          Icon={button.Icon}
          onClick={() => handleClick(button)}
          active={activeId === button.id}
        />
      ))}
    </div>
  );
};

export default Display;
