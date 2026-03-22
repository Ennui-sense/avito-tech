import BlockDisplayIcon from "~/assets/icons/block-display.svg?react";
import LineDisplayIcon from "~/assets/icons/line-display.svg?react";

interface IDisplayButton {
  id: number;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const DisplayButtonsData: IDisplayButton[] = [
  {
    id: 1,
    Icon: BlockDisplayIcon,
  },
  {
    id: 2,
    Icon: LineDisplayIcon,
  },
];
