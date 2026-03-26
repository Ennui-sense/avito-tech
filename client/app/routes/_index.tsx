import BgImageSrc from "~/assets/images/bg-image.jpg";

export function meta() {
  return [
    { title: "Авито | Главная" },
    { name: "description", content: "Main page" },
  ];
}

export default function IndexRoute() {
  return (
    <div className="main-page">
      <img
        src={BgImageSrc}
        alt=""
        className="main-page__image"
        width={1400}
        height={800}
        loading="lazy"
      />

      <div className="main-page__content">
        <h1 className="main-page__title">
          Тестовое задание на
          <br />
          стажировку
          <br /> в Авито
        </h1>

        <a href="/ads" className="main-page__link">
          Перейти к просмотру
        </a>
      </div>
    </div>
  );
}
