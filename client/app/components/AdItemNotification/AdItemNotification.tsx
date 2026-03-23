import "./AdItemNotification.scss";

import WarningIcon from "~/assets/icons/warning.svg?react";

import type { FieldInfo } from "~/routes/ads.$id._index";

interface AdItemNotificationProps {
  missingFields: FieldInfo[];
}

const AdItemNotification = ({ missingFields }: AdItemNotificationProps) => {
  return (
    <div className="ad-item-notification">
      <WarningIcon />

      <div className="ad-item-notification__body">
        <h3 className="ad-item-notification__title">Требуются доработки</h3>
        <p className="ad-item-notification__text">
          У объявления не заполнены поля:
        </p>
        <ul className="ad-item-notification__list">
          {missingFields.map((field) => (
            <li className="ad-item-notification__item" key={field.key}>
              {field.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdItemNotification;
