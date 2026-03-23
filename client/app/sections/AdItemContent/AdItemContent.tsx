import "./AdItemContent.scss";

import PlaceholderImageSrc from "~/assets/images/placeholder.jpg";

import type { FieldInfo } from "~/routes/ads.$id._index";

import AdItemNotification from "~/components/AdItemNotification/AdItemNotification";
import AdItemCharacterisctics from "~/components/AdItemCharacterisctics/AdItemCharacterisctics";
import AdItemDescription from "~/components/AdItemDescription/AdItemDescription";

interface AdItemContentProps {
  missingFields: FieldInfo[];
  includedFields: FieldInfo[];
  description: string | undefined;
}

const AdItemContent = ({
  missingFields,
  includedFields,
  description,
}: AdItemContentProps) => {
  return (
    <section className="ad-item-content">
      <h2 className="ad-item-content__title visually-hidden">
        Информация об объявлении
      </h2>
      <div className="ad-item-content__inner container">
        <div className="ad-item-content__body">
          <img
            src={PlaceholderImageSrc}
            alt=""
            className="ad-item-content__image"
            width={480}
            height={360}
            loading="lazy"
          />

          <div className="ad-item-content__info">
            {missingFields.length !== 0 && (
              <AdItemNotification missingFields={missingFields} />
            )}

            <AdItemCharacterisctics includedFields={includedFields} />
          </div>
        </div>

        <AdItemDescription description={description} />
      </div>
    </section>
  );
};

export default AdItemContent;
