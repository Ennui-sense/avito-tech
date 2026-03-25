import "./Filters.scss";

import { FiltersTypesData } from "~/data/FiltersTypesData";

import FiltersType from "../FiltersType/FiltersType";
import Button from "../Button/Button";
import FiltersToggleButton from "../FiltersToggleButton/FiltersToggleButton";

import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { resetFilters, setNeedsRevision } from "~/store/catalogSlice";

const Filters = () => {
  const dispatch = useAppDispatch();
  const needsRevision = useAppSelector((state) => state.catalog.needsRevision);

  return (
    <aside className="filters">
      <div className="filters__body">
        <h3 className="filters__title">Фильтры</h3>

        <div className="filters__types">
          {FiltersTypesData.map(({ id, label, variants }) => (
            <FiltersType
              key={id}
              label={label}
              variants={variants}
            />
          ))}
        </div>

        <div className="filters__toggle">
          <p className="filters__toggle-text">Только требующие доработок</p>
          <FiltersToggleButton
            isActive={needsRevision}
            onClick={() => dispatch(setNeedsRevision(!needsRevision))}
          />
        </div>
      </div>

      <Button className="filters__button" onClick={() => dispatch(resetFilters())}>
        Сбросить фильтры
      </Button>
    </aside>
  );
};

export default Filters;