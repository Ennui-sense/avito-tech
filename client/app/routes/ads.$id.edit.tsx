import axios from "axios";

import { useParams } from "react-router";
import { useEffect, useState } from "react";

import type { Item } from "~/../../server/src/types";

export function meta() {
  return [{ name: "description", content: "Ad Item Edit Page" }];
}


export default function AdEditRoute() {
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
        console.error("Ошибка при получении объявления:", error);
      } finally {
        setIsLoading(false);
      }
    };

		getItem();
  }, [id]);

  useEffect(() => {
		if (isLoading) {
			document.title = `Загрузка...`;
		}

		if (item) {
			document.title = `Авито | Редактирование`;
		}
  }, [item, isLoading]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!item) {
    return <div>Объявление не найдено</div>;
  }

  return <div className="ad-edit">Редактирование товара {item.title}</div>;
}
