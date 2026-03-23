import "./Catalog.scss";

import CatalogPagination from "../CatalogPagination/CatalogPagination";
import CatalogProduct from "../CatalogProduct/CatalogProduct";
import type { CatalogItem } from "~/routes/ads._index";
import clsx from "clsx";

interface CatalogProps {
  items: CatalogItem[];
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  displayStyle: "line" | "block";
}

const Catalog = ({
  items,
  total,
  currentPage,
  onPageChange,
  isLoading,
  displayStyle,
}: CatalogProps) => {
  if (isLoading) {
    return <div className="catalog">Загрузка...</div>;
  }

  return (
    <div className="catalog">
      <ul className={clsx("catalog__list", `catalog__list--${displayStyle}`)}>
        {items.map(({ category, title, price, needsRevision }, index) => (
          <li className="catalog__item" key={title}>
            <CatalogProduct
              category={category}
              title={title}
              price={price}
              needsRevision={needsRevision}
              className={`catalog-product--${displayStyle}`}
              id={index + 1}
            />
          </li>
        ))}
      </ul>

      <CatalogPagination
        total={total}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Catalog;
