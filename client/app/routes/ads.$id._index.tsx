import axios from "axios";
import { useParams } from "react-router";

import { useEffect, useState } from "react";

import type { Item } from "~/../../server/src/types";

import AdItemHeader from "~/components/AdItemHeader/AdItemHeader";
import AdItemContent from "~/sections/AdItemContent/AdItemContent";

export function meta() {
  return [{ name: "description", content: "Ad Item Page" }];
}

export const FIELDS = {
  auto: {
    brand: "Бренд",
    model: "Модель",
    yearOfManufacture: "Год выпуска",
    transmission: "Коробка передач",
    mileage: "Пробег",
    enginePower: "Мощность",
  },
  real_estate: {
    type: "Тип",
    address: "Адрес",
    area: "Площадь",
    floor: "Этаж",
  },
  electronics: {
    type: "Тип",
    brand: "Бренд",
    model: "Модель",
    condition: "Состояние",
    color: "Цвет",
  },
};

const PARAMS = {
  transmission: {
    automatic: "Автомат",
    manual: "Механика",
  },
  real_estate_type: {
    flat: "Квартира",
    house: "Дом",
    room: "Комната",
  },
  electronics_type: {
    phone: "Телефон",
    laptop: "Ноутбук",
    misc: "Разное",
  },
  condition: {
    new: "Новое",
    used: "Б/У",
  },
};

export type FieldInfo = {
  key: string;
  label: string;
  value: unknown;
};

const formatValue = (value: unknown, key: string, category: string) => {
  if (key === "transmission") {
    return PARAMS.transmission[value as keyof typeof PARAMS.transmission];
  }

  if (key === "condition") {
    return PARAMS.condition[value as keyof typeof PARAMS.condition];
  }

  if (key === "type" && category === "real_estate") {
    return PARAMS.real_estate_type[
      value as keyof typeof PARAMS.real_estate_type
    ];
  }

  if (key === "type" && category === "electronics") {
    return PARAMS.electronics_type[
      value as keyof typeof PARAMS.electronics_type
    ];
  }

  return value;
};

const sortFields = (item: Item) => {
  const missingFields: FieldInfo[] = [];
  const includedFields: FieldInfo[] = [];

  const categoryFields = FIELDS[item.category];

  Object.entries(categoryFields).forEach(([key, label]) => {
    const value = formatValue(item.params[key as keyof typeof item.params], key, item.category);

    const field = {
      key,
      label,
      value,
    };

    if (!value) {
      missingFields.push(field);
    } else {
      includedFields.push(field);
    }
  });

  return { missingFields, includedFields };
};

export default function AdDetailsRoute() {
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`http://localhost:8080/items/${id}`);
        setItem(res.data);
      } catch (error) {
        console.error("Ошибка при получении данных:(", error);
      } finally {
        setIsLoading(false);
      }
    };

    getItem();
  }, [id]);

  useEffect(() => {
    if (isLoading) {
      document.title = "Загрузка...";
    } else if (item) {
      document.title = `Авито | ${item.title}`;
    }
  }, [item, isLoading]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!item) {
    return <div>Объявление не найдено</div>;
  }

  const { missingFields, includedFields } = sortFields(item);

  console.log(missingFields);
  console.log(includedFields);

  return (
    <>
      <AdItemHeader
        title={item.title}
        createdAt={item.createdAt}
        updatedAt={item.updatedAt}
        id={item.id}
        price={item.price}
      />

      <main>
        <AdItemContent
          missingFields={missingFields}
          includedFields={includedFields}
          description={item.description}
        />
      </main>
    </>
  );
}
