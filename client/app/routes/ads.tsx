import ActionsPanel from "~/components/ActionsPanel/ActionsPanel";
import AdsHeader from "~/components/AdsHeader/AdsHeader";
import AdsContent from "~/sections/AdsContent/AdsContent";

import axios from "axios";
import { useState, useEffect } from "react";

export function meta() {
  return [
    { title: "Авито | Каталог" },
    { name: "description", content: "Ads Page" },
  ];
}

export default function AdsRoute() {
  // const API_URL = "http://localhost:8080/items?limit=10&skip=20"
  // const [data, setData] = useState<null | any>(null)

  // useEffect(() => {
  // 	const getProducts = async () => {
  // 		const res = await axios({
  // 			url: API_URL
  // 		})

  // 		console.log(res.data);

  // 	}

  // 	getProducts()
  // })

  return (
    <div className="bg__gray">
      <AdsHeader />
      <main>
        <ActionsPanel />
        <AdsContent />
      </main>
    </div>
  );
}
