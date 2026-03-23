import "./AdItemCharacterisctics.scss";

import type { FieldInfo } from "~/routes/ads.$id._index";

interface AdItemCharacteriscticsProps {
  includedFields: FieldInfo[];
}

const AdItemCharacterisctics = ({
  includedFields,
}: AdItemCharacteriscticsProps) => {
  return (
    <div className="ad-item-characteristics">
      <h3 className="ad-item-characteristics__title">Характеристики</h3>
      <ul className="ad-item-characteristics__list">
        {includedFields.map((field) => (
          <li className="ad-item-characteristics__item" key={field.key}>
            <p className="ad-item-characteristics__label">{field.label}</p>
            <p className="ad-item-characteristics__value">
              {field.value as string}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdItemCharacterisctics;
