import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import {
  convertItemToFormData,
  convertFormDataToPut,
} from "~/utils/itemConfig";

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
  const [initialFormData, setInitialFormData] = useState<FormDataType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});

  const [priceSuggestion, setPriceSuggestion] = useState<{
    price: number;
    comment: string;
  } | null>(null);
  const [descriptionSuggestion, setDescriptionSuggestion] = useState<{
    description: string;
  } | null>(null);

  const [isSuggesting, setIsSuggesting] = useState(false);

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
      if (!value.trim()) return "Название должно быть заполнено";
      return "";
    }

    if (key === "price") {
      if (!value.trim()) return "Цена должна быть заполнена";
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
      setSaveStatus({
        type: "error",
        message: "Проверьте обязательные поля перед сохранением",
      });
      return;
    }

    try {
      setIsSaving(true);
      setSaveStatus(null);

      const put = convertFormDataToPut(formData);
      await axios.put(`http://localhost:8080/items/${id}`, put);

      setSaveStatus({
        type: "success",
        message: "Изменение сохранены",
      });

      setTimeout(() => {
        navigate(`/ads/${id}`);
      }, 1000);
    } catch (error) {
      console.error("Ошибка при сохранении:", error);

      setSaveStatus({
        type: "error",
        message:
          "При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSuggestPrice = async () => {
    if (!formData) return;

    try {
      setIsSuggesting(true);
      setPriceSuggestion(null);

      const payload = convertFormDataToPut(formData);

      console.log("sending price payload", payload);

      const res = await axios.post(
        "http://localhost:8080/ai/price-suggestion",
        {
          ...payload,
        },
      );

      setPriceSuggestion(res.data);
    } catch (error) {
      console.error("Ошибка при получении рекомендации по цене:", error);
      setSaveStatus({
        type: "error",
        message: "Не удалось получить рекомендацию по цене.",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSuggestDescription = async () => {
    if (!formData) return;

    try {
      setIsSuggesting(true);
      setDescriptionSuggestion(null);

      const payload = convertFormDataToPut(formData);

      console.log("sending description payload", payload);

      const res = await axios.post(
        "http://localhost:8080/ai/description-suggestion",
        {
          ...payload,
        },
      );

      setDescriptionSuggestion(res.data);
    } catch (error) {
      console.error("Ошибка при получении рекомендации по описанию:", error);
      setSaveStatus({
        type: "error",
        message: "Не удалось получить рекомендацию по описанию.",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleApplySuggested = (field: "price" | "description") => {
    if (field === "price") {
      if (!priceSuggestion) return;
      handleFieldChange("price", String(priceSuggestion.price));
      handleCancelSuggested(field);
      return;
    }

    if (!descriptionSuggestion) return;
    handleFieldChange("description", String(descriptionSuggestion.description));
    handleCancelSuggested(field);
  };

  const handleCancelSuggested = (field: "price" | "description") => {
    if (field === "price") {
      setPriceSuggestion(null);
      return;
    }

    setDescriptionSuggestion(null);
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
          saveStatus={saveStatus}
          priceSuggestion={priceSuggestion}
          descriptionSuggestion={descriptionSuggestion}
          isSuggesting={isSuggesting}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          onCategoryChange={handleCategoryChange}
          onParamChange={handleParamChange}
          onSave={handleSave}
          onCancel={handleCancel}
          onSuggestPrice={handleSuggestPrice}
          onSuggestDescription={handleSuggestDescription}
          onApplySuggested={handleApplySuggested}
          onCancelSuggested={handleCancelSuggested}
        />
      </main>
    </>
  );
}
