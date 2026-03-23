import ActionsPanel from "~/components/ActionsPanel/ActionsPanel";
import AdsHeader from "~/components/AdsHeader/AdsHeader";
import AdsContent from "~/sections/AdsContent/AdsContent";

import axios from "axios";
import { useState, useEffect } from "react";

export interface CatalogItem {
  category: "auto" | "electronics" | "real_estate";
  title: string;
  price: number;
  needsRevision: boolean;
};

export function meta() {
  return [
    { title: "Авито | Каталог" },
    { name: "description", content: "Ads Page" },
  ];
}

const LIMIT = 10;
const API_URL = "http://localhost:8080/items";

export default function AdsRoute() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayStyle, setDisplayStyle] = useState<"line" | "block">("block");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);

        const res = await axios.get(API_URL, {
          params: {
            limit: LIMIT,
            skip: (currentPage - 1) * LIMIT,
          },
        });

        setItems(res.data.items);
        setTotal(res.data.total);
      } catch (error) {
        console.error("Ошибка при получении данных:(", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [currentPage]);

  return (
    <div className="bg__gray">
      <AdsHeader total={total} />

      <main>
        <ActionsPanel onDisplayStyleChange={setDisplayStyle}/>
        <AdsContent
          items={items}
          total={total}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
					displayStyle={displayStyle}
        />
      </main>
    </div>
  );
}