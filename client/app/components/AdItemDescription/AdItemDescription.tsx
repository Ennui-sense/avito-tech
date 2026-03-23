import "./AdItemDescription.scss";

interface AdItemDescriptionProps {
  description: string | undefined;
}

const AdItemDescription = ({ description }: AdItemDescriptionProps) => {
  return (
    <div className="ad-item-description">
      <h3 className="ad-item-description__title">Описание</h3>
      <p className="ad-item-description__text">
        {description ? description : "Отсутствует"}
      </p>
    </div>
  );
};

export default AdItemDescription;
