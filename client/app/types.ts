export type Item = {
  id: number;
  title: string;
  description?: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
} & (
  | {
      category: "auto";
      params: AutoItemParams;
    }
  | {
      category: "real_estate";
      params: RealEstateItemParams;
    }
  | {
      category: "electronics";
      params: ElectronicsItemParams;
    }
);

type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: "automatic" | "manual";
  mileage?: number;
  enginePower?: number;
};

type RealEstateItemParams = {
  type?: "flat" | "house" | "room";
  address?: string;
  area?: number;
  floor?: number;
};

type ElectronicsItemParams = {
  type?: "phone" | "laptop" | "misc";
  brand?: string;
  model?: string;
  condition?: "new" | "used";
  color?: string;
};

export type FormDataType = {
  category: Item["category"];
  title: string;
  price: string;
  description: string;
  params: Record<string, string>;
};

export type ItemCategory = "auto" | "electronics" | "real_estate";

export type SelectOption = {
  value: string;
  label: string;
};

export type CategoryFieldConfig = {
  key: string;
  label: string;
  inputType: "text" | "number" | "select" | "textarea";
  options?: SelectOption[];
};

export type FormErrors = {
  title?: string;
  price?: string;
};

export type TouchedFields = {
  title?: boolean;
  price?: boolean;
};