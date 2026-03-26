import "./AdItemHeader.scss";

import Button from "../Button/Button";

import EditIcon from "~/assets/icons/edit.svg?react";
import ArrowIcon from "~/assets/icons/arrow-top.svg?react";

interface AdsItemHeaderProps {
  title: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  price: number | null;
}

const AdsItemHeader = ({
  title,
  createdAt,
  updatedAt,
  id,
  price,
}: AdsItemHeaderProps) => {
  const formatPrice = (price: number | null) => {
    return price ? `${price} ₽` : "Цена не указана";
  };

  const formatTime = (time: string) => {
    const date = new Date(time);
    return date.toLocaleString("ru-RU", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <header className="ad-item-header">
      <div className="ad-item-header__inner container">
        <div className="ad-item-header__top">
          <div className="ad-item-header__top-body">
            <a href="/ads" className="ad-item-header__back-link">
              <ArrowIcon />
							К моим объявлениям
            </a>
            <h1 className="ad-item-header__title">{title}</h1>
          </div>

          <p className="ad-item-header__price">{formatPrice(price)}</p>
        </div>

        <div className="ad-item-header__bottom">
          <Button
            className="ad-item-header__edit-link"
            href={`/ads/${id}/edit`}
            variant="accent"
            Icon={EditIcon}
            size="large"
          >
            Редактировать
          </Button>

          <div className="ad-item-header__time">
            <p className="ad-item-header__created">
              Опубликовано: {formatTime(createdAt)}
            </p>
            <p className="ad-item-header__updated">
              Отредактировано: {formatTime(updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdsItemHeader;
