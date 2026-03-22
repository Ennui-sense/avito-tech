import "./Filters.scss";

import { FiltersTypesData } from "~/data/FiltersTypesData";

import FiltersType from "../FiltersType/FiltersType";

const Filters = () => {
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
					<button type="button" className="filters__toggle-button">switch</button>
				</div>
      </div>
    </aside>
  );
};

export default Filters;
