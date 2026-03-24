import type {
  SelectOption,
  ItemCategory,
  CategoryFieldConfig,
  Item,
  FormDataType,
} from "~/types";

export const CATEGORY_OPTIONS: SelectOption[] = [
  { value: "electronics", label: "Электроника" },
  { value: "auto", label: "Авто" },
  { value: "real_estate", label: "Недвижимость" },
];

export const ITEM_CONFIG: Record<
  ItemCategory,
  {
    label: string;
    fields: CategoryFieldConfig[];
  }
> = {
  auto: {
    label: "Авто",
    fields: [
      {
        key: "brand",
        label: "Бренд",
        inputType: "text",
      },
      {
        key: "model",
        label: "Модель",
        inputType: "text",
      },
      {
        key: "yearOfManufacture",
        label: "Год выпуска",
        inputType: "number",
      },
      {
        key: "transmission",
        label: "Коробка передач",
        inputType: "select",
        options: [
          { value: "automatic", label: "Автомат" },
          { value: "manual", label: "Механика" },
        ],
      },
      {
        key: "mileage",
        label: "Пробег",
        inputType: "number",
      },
      {
        key: "enginePower",
        label: "Мощность",
        inputType: "number",
      },
    ],
  },

  electronics: {
    label: "Электроника",
    fields: [
      {
        key: "type",
        label: "Тип",
        inputType: "select",
        options: [
          { value: "phone", label: "Телефон" },
          { value: "laptop", label: "Ноутбук" },
          { value: "misc", label: "Разное" },
        ],
      },
      {
        key: "brand",
        label: "Бренд",
        inputType: "text",
      },
      {
        key: "model",
        label: "Модель",
        inputType: "text",
      },
      {
        key: "color",
        label: "Цвет",
        inputType: "text",
      },
      {
        key: "condition",
        label: "Состояние",
        inputType: "select",
        options: [
          { value: "new", label: "Новое" },
          { value: "used", label: "Б/У" },
        ],
      },
    ],
  },

  real_estate: {
    label: "Недвижимость",
    fields: [
      {
        key: "type",
        label: "Тип",
        inputType: "select",
        options: [
          { value: "flat", label: "Квартира" },
          { value: "house", label: "Дом" },
          { value: "room", label: "Комната" },
        ],
      },
      {
        key: "address",
        label: "Адрес",
        inputType: "text",
      },
      {
        key: "area",
        label: "Площадь",
        inputType: "number",
      },
      {
        key: "floor",
        label: "Этаж",
        inputType: "number",
      },
    ],
  },
};

export const getCategoryFields = (
  category: "auto" | "real_estate" | "electronics",
) => {
  return ITEM_CONFIG[category].fields;
};

export const convertItemToFormData = (item: Item): FormDataType => {
  return {
    category: item.category,
    title: item.title ?? "",
    price: item.price !== null ? String(item.price) : "",
    description: item.description ?? "",
    params: Object.fromEntries(
      Object.entries(item.params).map(([key, value]) => [key, String(value ?? "")]),
    ),
  };
};

const NUMERIC_PARAM_KEYS = [
  "yearOfManufacture",
  "mileage",
  "enginePower",
  "area",
  "floor",
];

export const convertFormDataToPut = (formData: FormDataType) => {
  const params = Object.fromEntries(
    Object.entries(formData.params)
      .map(([key, value]) => {
        if (NUMERIC_PARAM_KEYS.includes(key)) {
          return [key, Number(value)];
        }

        return [key, value];
      }),
  );

  return {
    category: formData.category,
    title: formData.title.trim(),
    description: formData.description.trim() || undefined,
    price: Number(formData.price),
    params,
  };
};
