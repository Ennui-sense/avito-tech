import axios from "axios";

import { useParams } from "react-router";
import { useEffect, useState } from "react";

import type { Item } from "~/../../server/src/types";

export function meta() {
  return [{ name: "description", content: "Ad Item Page" }];
}

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
    }

    if (item) {
      document.title = `Авито | ${item.title}`;
    }
  }, [item, isLoading]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!item) {
    return <div>Объявление не найдено</div>;
  }

  return (
    <div className="ad-details">
      <h1>{item.title}</h1>

      <a href={`/ads/${item.id}/edit`}>Редактировать</a>
    </div>
  );
}
