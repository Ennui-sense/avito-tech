import "./AdsHeader.scss";

import { useState, useEffect } from "react";

import axios from "axios";

const AdsHeader = () => {
  // const API_URL = "http://localhost:8080/items"
  // const [count, setCount] = useState<null | number>(null)

  // useEffect(() => {
  // 	const getProducts = async () => {
  // 		const res = await axios({
  // 			url: API_URL
  // 		})

	// 		console.log(res.data);
  // 		setCount(res.data.total)
			
  // 	}

  // 	getProducts()
  // })

  return (
    <header className="ads-header">
      <div className="ads-header__inner container">
        <div className="ads-header__content">
          <h1 className="ads-header__title">Мои объявления</h1>
          <p className="ads-header__count">32 объявления</p>
        </div>
      </div>
    </header>
  );
};

export default AdsHeader;
