import "./AdsContent.scss";

import Filters from "~/components/Filters/Filters";

const AdsContent = () => {
  return (
    <section className="ads-content">
      <h2 className="visually-hidden">Наш каталог</h2>

      <div className="ads-content__inner container">
        <Filters />
      </div>
    </section>
  );
};

export default AdsContent;
