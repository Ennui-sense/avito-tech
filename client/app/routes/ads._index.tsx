import ActionsPanel from "~/components/ActionsPanel/ActionsPanel";
import AdsHeader from "~/components/AdsHeader/AdsHeader";
import AdsContent from "~/sections/AdsContent/AdsContent";

import axios from "axios";
import { useState, useEffect } from "react";

import { getSortParams } from "~/utils/catalogConfig";

import { useAppDispatch, useAppSelector } from "~/hooks/redux";
import { setCurrentPage } from "~/store/catalogSlice";

import type { CatalogItem } from "~/types";

export function meta() {
  return [
    { title: "Авито | Каталог" },
    { name: "description", content: "Ads Page" },
  ];
}

const LIMIT = 10;
const API_URL = "http://localhost:8080/items";

export default function AdsRoute() {
  const dispatch = useAppDispatch();

  const { search, categories, needsRevision, sort, currentPage, displayStyle } =
    useAppSelector((state) => state.catalog);

  const [items, setItems] = useState<CatalogItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);

        const sortParams = getSortParams(sort);

        const params: Record<string, string | number | boolean | undefined> = {
          limit: LIMIT,
          skip: (currentPage - 1) * LIMIT,
          ...sortParams,
        };

        if (search.trim()) {
          params.q = search.trim();
        }

        if (categories.length) {
          params.categories = categories.join(",");
        }

        if (needsRevision) {
          params.needsRevision = true;
        }

        const res = await axios.get(API_URL, { params });

        setItems(res.data.items);
        setTotal(res.data.total);
      } catch (error) {
        console.error("Ошибка при получении данных:(", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [search, categories, needsRevision, sort, currentPage]);

  return (
    <div className="bg__gray">
      <AdsHeader total={total} />

      <main>
        <ActionsPanel />
        <AdsContent
          items={items}
          total={total}
          currentPage={currentPage}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
          isLoading={isLoading}
          displayStyle={displayStyle}
        />
      </main>
    </div>
  );
}
