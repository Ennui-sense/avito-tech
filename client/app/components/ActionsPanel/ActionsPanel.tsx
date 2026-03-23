import "./ActionsPanel.scss";

import Search from "../Search/Search";
import Display from "../Display/Display";
import Sort from "../Sort/Sort";

interface ActionPanelProps {
  onDisplayStyleChange: (display: "line" | "block") => void;
}

const ActionsPanel = ({ onDisplayStyleChange }: ActionPanelProps) => {
  return (
    <div className="actions-panel">
      <div className="container">
        <div className="actions-panel__inner">
          <Search />
          <Display onDisplayStyleChange={onDisplayStyleChange} />
          <Sort />
        </div>
      </div>
    </div>
  );
};

export default ActionsPanel;
