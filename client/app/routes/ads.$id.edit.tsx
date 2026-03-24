import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import { convertItemToFormData, convertFormDataToPut } from "~/utils/itemConfig";

import AdEditHeader from "~/components/AdEditHeader/AdEditHeader";
import AdEditContent from "~/sections/AdEditContent/AdEditContent";

import type { Item, FormDataType, FormErrors, TouchedFields } from "~/types";

export function meta() {
  return [{ name: "description", content: "Ad Item Edit Page" }];
}

export default function AdEditRoute() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const [initialFormData, setInitialFormData] = useState<FormDataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});

  useEffect(() => {
    const getItem = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(`http://localhost:8080/items/${id}`);
        const convertedData = convertItemToFormData(res.data);

        setItem(res.data);
        setFormData(convertedData);
        setInitialFormData(convertedData);
      } catch (error) {
        console.error("Ошибка при получении объявления:", error);
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
      document.title = "Авито | Редактирование";
    }
  }, [item, isLoading]);

  const validateField = (key: "title" | "price", value: string) => {
    if (key === "title") {
      if (!value.trim()) return "Введите название";
      return "";
    }

    if (key === "price") {
      if (!value.trim()) return "Введите цену";
      if (Number.isNaN(Number(value))) return "Цена должна быть числом";
      if (Number(value) < 0) return "Цена не может быть меньше 0";
      return "";
    }
  };

  const setFieldError = (key: "title" | "price", value: string) => {
    const errorMessage = validateField(key, value);

    setErrors((prev) => ({
      ...prev,
      [key]: errorMessage || undefined,
    }));
  };

  const handleFieldChange = (
    key: "title" | "price" | "description",
    value: string,
  ) => {
    setFormData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [key]: value,
      };
    });

    if (key === "title" || key === "price") {
      if (touched[key]) {
        setFieldError(key, value);
      }
    }
  };

  const handleFieldBlur = (key: "title" | "price") => {
    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));

    if (!formData) return;

    setFieldError(key, formData[key]);
  };

  const handleCategoryChange = (value: Item["category"]) => {
    setFormData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        category: value,
        params: {},
      };
    });
  };

  const handleParamChange = (key: string, value: string) => {
    setFormData((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        params: {
          ...prev.params,
          [key]: value,
        },
      };
    });
  };

  const handleCancel = () => {
    if (!initialFormData) return;
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
  };

  const handleSave = async () => {
    if (!formData || !id) return;

    const titleError = validateField("title", formData.title);
    const priceError = validateField("price", formData.price);

    setErrors({
      title: titleError || undefined,
      price: priceError || undefined,
    });

    setTouched({
      title: true,
      price: true,
    });

    if (titleError || priceError) {
      return;
    }

    try {
      setIsSaving(true);

      const put = convertFormDataToPut(formData);
      await axios.put(`http://localhost:8080/items/${id}`, put);

      navigate(`/ads/${id}`);
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!item || !formData) {
    return <div>Объявление не найдено</div>;
  }

  const isFormChanged =
    initialFormData !== null &&
    JSON.stringify(formData) !== JSON.stringify(initialFormData);

  return (
    <>
      <AdEditHeader />
      <main>
        <AdEditContent
          formData={formData}
          errors={errors}
          touched={touched}
          isSaving={isSaving}
          isFormChanged={isFormChanged}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          onCategoryChange={handleCategoryChange}
          onParamChange={handleParamChange}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </main>
    </>
  );
}