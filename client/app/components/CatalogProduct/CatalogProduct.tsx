import "./CatalogProduct.scss";

import clsx from "clsx";

import PlaceholderImageSrc from "~/assets/images/placeholder.jpg";

interface CatalogProductProps {
  category: "auto" | "electronics" | "real_estate";
  title: string;
  price: number;
  needsRevision: boolean;
  className: string;
  id: number;
}

const CATEGORY_LABELS = {
  auto: "Авто",
  electronics: "Электроника",
  real_estate: "Недвижимость",
};

const CatalogProduct = ({
  category,
  title,
  price,
  needsRevision,
  className,
  id,
}: CatalogProductProps) => {
  const formatPrice = (price: number) => {
    return `${price} ₽`;
  };

  return (
    <article className={clsx("catalog-product", className)}>
      <img
        src={PlaceholderImageSrc}
        alt=""
        className="catalog-product__image"
        width={200}
        height={150}
        loading="lazy"
      />

      <div className="catalog-product__body">
        <p className="catalog-product__category">{CATEGORY_LABELS[category]}</p>

        <div className="catalog-product__info">
          <h3 className="catalog-product__title">{title}</h3>
          <p className="catalog-product__price">{formatPrice(price)}</p>
        </div>

        {needsRevision && (
          <p className="catalog-product__revision">Требует доработок</p>
        )}
      </div>
			
      <a href={`/ads/${id}`} className="catalog-product__link"></a>
    </article>
  );
};

export default CatalogProduct;
