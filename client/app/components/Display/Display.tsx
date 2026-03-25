import "./Display.scss";

import DisplayButton from "../DisplayButton/DisplayButton";
import { DisplayButtonsData } from "~/data/DisplayButtonsData";

import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { setDisplayStyle } from "~/store/catalogSlice";

import type { IDisplayButton } from "~/data/DisplayButtonsData";

const Display = () => {
  const dispatch = useAppDispatch();
  const displayStyle = useAppSelector((state) => state.catalog.displayStyle);

  const handleClick = (button: IDisplayButton) => {
    dispatch(setDisplayStyle(button.value));
  };

  return (
    <div className="display">
      {DisplayButtonsData.map((button) => (
        <DisplayButton
          key={button.id}
          Icon={button.Icon}
          onClick={() => handleClick(button)}
          active={displayStyle === button.value}
        />
      ))}
    </div>
  );
};

export default Display;