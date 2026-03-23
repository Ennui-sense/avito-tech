import "./AdsHeader.scss";

interface AdsHeaderProps {
	total: number;
}

const AdsHeader = ({total}: AdsHeaderProps) => {
  return (
    <header className="ads-header">
      <div className="ads-header__inner container">
        <div className="ads-header__content">
          <h1 className="ads-header__title">Мои объявления</h1>
          <p className="ads-header__count">{total} объявления</p>
        </div>
      </div>
    </header>
  );
};

export default AdsHeader;
