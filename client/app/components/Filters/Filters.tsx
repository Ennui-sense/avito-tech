import "./Filters.scss";

import { FiltersTypesData } from "~/data/FiltersTypesData";

import FiltersType from "../FiltersType/FiltersType";
import Button from "../Button/Button";
import FiltersToggleButton from "../FiltersToggleButton/FiltersToggleButton";
import { useState } from "react";

const Filters = () => {
  const [toggleActive, setToggleActive] = useState<boolean>(false);

  const handleClick = () => {
    setToggleActive(!toggleActive);
  };

  return (
    <aside className="filters">
      <div className="filters__body">
        <h3 className="filters__title">Фильтры</h3>

        <div className="filters__types">
          {FiltersTypesData.map(({ id, label, value, variants }) => (
            <FiltersType key={id} label={label} variants={variants} />
          ))}
        </div>

        <div className="filters__toggle">
          <p className="filters__toggle-text">Только требующие доработок</p>
          <FiltersToggleButton
            isActive={toggleActive}
            onClick={() => handleClick()}
          />
        </div>
      </div>

      <Button className="filters__button">Сбросить фильтры</Button>
    </aside>
  );
};

export default Filters;
