import BlockDisplayIcon from "~/assets/icons/block-display.svg?react";
import LineDisplayIcon from "~/assets/icons/line-display.svg?react";

export interface IDisplayButton {
  id: number;
	value: "line" | "block";
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const DisplayButtonsData: IDisplayButton[] = [
  {
    id: 1,
    Icon: BlockDisplayIcon,
		value: "block"
  },
  {
    id: 2,
    Icon: LineDisplayIcon,
		value: "line"
  },
];
