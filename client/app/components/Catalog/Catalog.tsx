import "./Catalog.scss";

import CatalogPagination from "../CatalogPagination/CatalogPagination";
import CatalogProduct from "../CatalogProduct/CatalogProduct";
import type { CatalogItem } from "~/routes/ads";

interface CatalogProps {
  items: CatalogItem[];
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const Catalog = ({
  items,
  total,
  currentPage,
  onPageChange,
  isLoading,
}: CatalogProps) => {
  if (isLoading) {
    return <div className="catalog">Загрузка...</div>;
  }

  return (
    <div className="catalog">
      <ul className="catalog__list">
        {items.map(({ category, title, price, needsRevision }) => (
          <li className="catalog__item" key={title}>
            <CatalogProduct
              category={category}
              title={title}
              price={price}
              needsRevision={needsRevision}
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
