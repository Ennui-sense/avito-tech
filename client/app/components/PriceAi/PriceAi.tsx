import "./PriceAi.scss";
import Button from "../Button/Button";

import LightBulbIcon from "~/assets/icons/light-bulb.svg?react";
import AgainIcon from "~/assets/icons/again.svg?react";
import LoadingIcon from "~/assets/icons/loading.svg?react";

interface PriceAiProps {
  onSuggestPrice: () => void;
  onApplySuggestedPrice: () => void;
  onCancelSuggestedPrice: () => void;
  isSuggestingPrice: boolean;
  priceSuggestion: { price: number; comment: string } | null;
}

const PriceAi = ({
  onApplySuggestedPrice,
  onCancelSuggestedPrice,
  onSuggestPrice,
  isSuggestingPrice,
  priceSuggestion,
}: PriceAiProps) => {
  return (
    <div className="price-ai">
      <Button
        className="price-ai__button"
        onClick={onSuggestPrice}
        disabled={isSuggestingPrice}
        Icon={
          priceSuggestion
            ? AgainIcon
            : isSuggestingPrice
              ? LoadingIcon
              : LightBulbIcon
        }
        variant="yellow"
        direction="row-reverse"
      >
        {priceSuggestion
          ? "Повторить запрос"
          : isSuggestingPrice
            ? "Оцениваем..."
            : "Узнать рыночную цену"}
      </Button>

      {priceSuggestion && (
        <div className="price-ai__suggestion">
          <p className="price-ai__suggestion-title">Ответ AI:</p>
          <p className="price-ai__suggestion-text">
            Рекомендуемая цена: {priceSuggestion.price.toLocaleString("ru-RU")}{" "}
            ₽{<br />}
            {priceSuggestion.comment}
          </p>

          <div className="price-ai__suggestion-buttons">
            <Button
              className="price-ai__suggestion-button"
              onClick={onApplySuggestedPrice}
              variant="accent"
              size="x-small"
            >
              Применить
            </Button>
            <Button
              className="price-ai__suggestion-button"
              onClick={onCancelSuggestedPrice}
              size="x-small"
            >
              Закрыть
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceAi;
