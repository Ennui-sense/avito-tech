import "./AdEditContent.scss";

import type {
  FormDataType,
  FormErrors,
  TouchedFields,
  ItemCategory,
  SelectOption,
} from "~/types";

import { CATEGORY_OPTIONS, getCategoryFields } from "~/utils/itemConfig";

import Fieldset from "~/components/Fieldset/Fieldset";
import Input from "~/components/Input/Input";
import Select from "~/components/Select/Select";
import Button from "~/components/Button/Button";
import Notification from "~/components/Notification/Notification";
import AiHint from "~/components/AiHint/AiHint";

import { useEffect } from "react";

interface AdEditContentProps {
  formData: FormDataType;
  errors: FormErrors;
  touched: TouchedFields;
  isSaving: boolean;
  isFormChanged: boolean;
  saveStatus: { type: "success" | "error"; message: string } | null;
  priceSuggestion: { price: number; comment: string } | null;
  descriptionSuggestion: { description: string } | null;
  isPriceSuggesting: boolean;
  isDescriptionSuggesting: boolean;
  onFieldChange: (
    key: "title" | "price" | "description",
    value: string,
  ) => void;
  onFieldBlur: (key: "title" | "price") => void;
  onCategoryChange: (value: ItemCategory) => void;
  onParamChange: (key: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onSuggestPrice: () => void;
  onSuggestDescription: () => void;
  onApplySuggested: (field: "price" | "description") => void;
  onCancelSuggested: (field: "price" | "description") => void;
}

const AdEditContent = ({
  formData,
  errors,
  touched,
  isSaving,
  isFormChanged,
  saveStatus,
  priceSuggestion,
  descriptionSuggestion,
  isPriceSuggesting,
  isDescriptionSuggesting,
  onFieldChange,
  onFieldBlur,
  onCategoryChange,
  onParamChange,
  onSave,
  onCancel,
  onSuggestPrice,
  onSuggestDescription,
  onApplySuggested,
  onCancelSuggested,
}: AdEditContentProps) => {
  const categoryFields = getCategoryFields(formData.category);

  const isParamFieldEmpty = (key: string) =>
    !String(formData.params[key] ?? "").trim();

  return (
    <section className="ad-edit-content">
      <h2 className="ad-edit-content__title visually-hidden">
        Поля для редактирования объявления
      </h2>

      <div className="ad-edit-content__inner container">
        <form
          className="ad-edit-content__form"
          onSubmit={(event) => event.preventDefault()}
        >
          <Fieldset
            className="ad-edit-content__category"
            legend="Категория"
            inputType="select"
            value={formData.category}
            options={CATEGORY_OPTIONS}
            onChange={(value) => onCategoryChange(value as ItemCategory)}
          />
          <Fieldset
            className="ad-edit-content__name"
            legend="Название"
            inputType="text"
            value={formData.title}
            onChange={(value) => onFieldChange("title", value)}
            onBlur={() => onFieldBlur("title")}
            error={touched.title ? errors.title : undefined}
            required
          />

          <div className="ad-edit-content__manage-price">
            <Fieldset
              className="ad-edit-content__price"
              legend="Цена"
              inputType="number"
              value={formData.price}
              onChange={(value) => onFieldChange("price", value)}
              onBlur={() => onFieldBlur("price")}
              error={touched.price ? errors.price : undefined}
              required
            />

            <AiHint
              onSuggestPrice={onSuggestPrice}
              onApplySuggested={() => onApplySuggested("price")}
              isSuggesting={isPriceSuggesting}
              priceSuggestion={priceSuggestion}
              onCancelSuggested={() => onCancelSuggested("price")}
              initialText="Узнать рыночную цену"
              field="price"
            />
          </div>

          <fieldset className="ad-edit-content__characteristics">
            <legend className="ad-edit-content__characteristics-title">
              Характеристики
            </legend>

            {categoryFields.map((field) =>
              field.inputType !== "select" ? (
                <Input
                  key={field.key}
                  inputType={field.inputType}
                  id={field.key}
                  label={field.label}
                  value={String(formData.params[field.key] ?? "")}
                  onChange={(value) => onParamChange(field.key, value)}
                  isError={isParamFieldEmpty(field.key)}
                />
              ) : (
                <Select
                  key={field.key}
                  value={String(formData.params[field.key] ?? "")}
                  options={field.options as SelectOption[]}
                  className={`fieldset--${field.key}`}
                  onChange={(value) => onParamChange(field.key, value)}
                  isError={isParamFieldEmpty(field.key)}
                  label={field.label}
                />
              ),
            )}
          </fieldset>

          <div className="ad-edit-content__manage-description">
            <Fieldset
              className="ad-edit-content__description"
              legend="Описание"
              inputType="textarea"
              value={formData.description}
              onChange={(value) => onFieldChange("description", value)}
            />

            <AiHint
              onSuggestDescription={onSuggestDescription}
              onApplySuggested={() => onApplySuggested("description")}
              isSuggesting={isDescriptionSuggesting}
              descriptionSuggestion={descriptionSuggestion}
              onCancelSuggested={() => onCancelSuggested("description")}
              initialText={
                formData.description
                  ? "Улучшить описание"
                  : "Придумать описание"
              }
              field="description"
            />
          </div>

          <div className="ad-edit-content__actions">
            {saveStatus && (
              <Notification
                className="ad-edit-content__actions-notification"
                type={saveStatus.type}
                message={saveStatus.message}
              />
            )}

            <Button
              variant="accent"
              size="large"
              className="ad-edit-content__action-button"
              disabled={!isFormChanged || isSaving}
              onClick={onSave}
            >
              {isSaving ? "Сохранение..." : "Сохранить"}
            </Button>

            <Button
              variant="gray"
              size="large"
              className="ad-edit-content__action-button"
              onClick={onCancel}
            >
              Отменить
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdEditContent;
