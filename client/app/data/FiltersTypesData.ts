export interface IFilterVariant {
  id: number;
  label: string;
  value: string;
}

interface IFilterType {
  id: number;
  label: string;
  value: string;
  variants: IFilterVariant[];
}

export const FiltersTypesData: IFilterType[] = [
  {
    id: 1,
    label: "Категория",
    value: "category",
    variants: [
      {
        id: 1,
        label: "Авто",
        value: "auto",
      },
      {
        id: 2,
        label: "Электроника",
        value: "electronics",
      },
      {
        id: 3,
        label: "Недвижимость",
        value: "real_estate",
      },
    ],
  },
];
