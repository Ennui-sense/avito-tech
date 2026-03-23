import "./AdsContent.scss";

import Filters from "~/components/Filters/Filters";
import Catalog from "~/components/Catalog/Catalog";
import type { CatalogItem } from "~/routes/ads._index";

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
      <h2 className="ads-content___title visually-hidden">
        Список моих объявлений
      </h2>

      <div className="ads-content__inner container">
        <Filters />
        <Catalog
          items={items}
          total={total}
          currentPage={currentPage}
          onPageChange={onPageChange}
          isLoading={isLoading}
					displayStyle={displayStyle}
        />
      </div>
    </section>
  );
};

export default AdsContent;
