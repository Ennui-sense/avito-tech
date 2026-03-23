import "./Catalog.scss";

import CatalogPagination from "../CatalogPagination/CatalogPagination";
import CatalogProduct from "../CatalogProduct/CatalogProduct";
import type { CatalogItem } from "~/routes/ads";
import clsx from "clsx";

interface CatalogProps {
  items: CatalogItem[];
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
	displayStyle: "line" | "block"
}

const Catalog = ({
  items,
  total,
  currentPage,
  onPageChange,
  isLoading,
	displayStyle
}: CatalogProps) => {
  if (isLoading) {
    return <div className="catalog">Загрузка...</div>;
  }

  return (
    <div className="catalog">
      <ul className={clsx("catalog__list", `catalog__list--${displayStyle}`)}>
        {items.map(({ category, title, price, needsRevision }) => (
          <li className="catalog__item" key={title}>
            <CatalogProduct
              category={category}
              title={title}
              price={price}
              needsRevision={needsRevision}
							className={`catalog-product--${displayStyle}`}
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
