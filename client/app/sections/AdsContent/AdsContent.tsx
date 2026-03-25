import "./AdsContent.scss";

import Filters from "~/components/Filters/Filters";
import Catalog from "~/components/Catalog/Catalog";
import type { CatalogItem } from "~/types";

interface AdsContentProps {
  items: CatalogItem[];
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  displayStyle: "line" | "block";
}

const AdsContent = ({
  items,
  total,
  currentPage,
  onPageChange,
  isLoading,
  displayStyle,
}: AdsContentProps) => {
  return (
    <section className="ads-content">
      <h2 className="ads-content__title visually-hidden">
        Список моих объявлений
      </h2>

      <div className="ads-content__inner container">
        <Filters />

        {total === 0 ? (
          <p className="ads-content__text">Объявлений не найдено</p>
        ) : (
          <Catalog
            items={items}
            total={total}
            currentPage={currentPage}
            onPageChange={onPageChange}
            isLoading={isLoading}
            displayStyle={displayStyle}
          />
        )}
      </div>
    </section>
  );
};

export default AdsContent;
