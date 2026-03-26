import "./AiHint.scss";
import Button from "../Button/Button";

import LightBulbIcon from "~/assets/icons/light-bulb.svg?react";
import AgainIcon from "~/assets/icons/again.svg?react";
import LoadingIcon from "~/assets/icons/loading.svg?react";

interface AiHintProps {
  onSuggestPrice?: () => void;
  onSuggestDescription?: () => void;
  onApplySuggested: () => void;
  onCancelSuggested: () => void;
  isSuggesting: boolean;
  priceSuggestion?: { price: number; comment: string } | null;
  descriptionSuggestion?: { description: string } | null;
  initialText: string;
  field: "description" | "price";
}

const AiHint = ({
  onApplySuggested,
  onCancelSuggested,
  onSuggestPrice,
  onSuggestDescription,
  isSuggesting,
  priceSuggestion,
  descriptionSuggestion,
  initialText,
  field,
}: AiHintProps) => {
  const hasSuggetion =
    field === "price"
      ? Boolean(priceSuggestion)
      : Boolean(descriptionSuggestion);

  return (
    <div className="ai-hint">
      <Button
        className="ai-hint__button"
        onClick={field === "price" ? onSuggestPrice : onSuggestDescription}
        disabled={isSuggesting}
        Icon={
          hasSuggetion ? AgainIcon : isSuggesting ? LoadingIcon : LightBulbIcon
        }
        variant="yellow"
        direction="row-reverse"
				largePaddingInline
      >
        {hasSuggetion
          ? "Повторить запрос"
          : isSuggesting
            ? "Выполняется запрос"
            : initialText}
      </Button>

      {hasSuggetion && (
        <div className="ai-hint__suggestion">
          <p className="ai-hint__suggestion-title">Ответ AI:</p>
          {priceSuggestion && (
            <p className="ai-hint__suggestion-text">
              Рекомендуемая цена:{" "}
              {priceSuggestion.price.toLocaleString("ru-RU")} ₽{<br />}
              {priceSuggestion.comment}
            </p>
          )}
          {descriptionSuggestion && (
            <p className="ai-hint__suggestion-text">
              {descriptionSuggestion.description}
            </p>
          )}

          <div className="ai-hint__suggestion-buttons">
            <Button
              className="ai-hint__suggestion-button"
              onClick={onApplySuggested}
              variant="accent"
              size="x-small"
            >
              Применить
            </Button>
            <Button
              className="ai-hint__suggestion-button"
              onClick={onCancelSuggested}
              size="x-small"
							border={true}
            >
              Закрыть
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiHint;
