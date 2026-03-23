import "./CatalogPagination.scss";

import CatalogPaginationButton from "../CatalogPaginationButton/CatalogPaginationButton";

interface CatalogPaginationProps {
  total: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const LIMIT = 10;

const CatalogPagination = ({
  total,
  currentPage,
  onPageChange,
}: CatalogPaginationProps) => {
  const totalPages = Math.ceil(total / LIMIT);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  console.log(pageNumbers);

  return (
    <div className="catalog-pagination">
      <CatalogPaginationButton
        isPrev
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      <ul className="catalog-pagination__list">
        {pageNumbers.map((number) => (
          <li key={number}>
            <CatalogPaginationButton
              number={number}
              isActive={number === currentPage}
              onClick={() => onPageChange(number)}
            />
          </li>
        ))}
      </ul>

      <CatalogPaginationButton
        isNext
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};

export default CatalogPagination;
