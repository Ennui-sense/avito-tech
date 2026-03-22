import "./ActionsPanel.scss";

import Search from "../Search/Search";
import Display from "../Display/Display";
import Sort from "../Sort/Sort";

const ActionsPanel = () => {
  return (
    <div className="actions-panel">
      <div className="container">
        <div className="actions-panel__inner">
          <Search />
          <Display />
          <Sort />
        </div>
      </div>
    </div>
  );
};

export default ActionsPanel;
