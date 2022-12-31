import React, { useEffect, useState } from 'react'
import CartTotals from "../components/Cart/CartTotals";
import Categories from "../components/Categories/Categories";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
import axios from 'axios';
import { CATEGORY_ENDPOINT } from '../common/urls';
import { message } from 'antd';
function HomePage() {
  const [categories, setCategories] = useState([]);


 useEffect(() => {
    const fetch = async () => {
        try {
            axios
            .get(CATEGORY_ENDPOINT)
            .then(res => {
                     res.data && setCategories(res.data.map((item) => {return {...item, value: item.title}}));

            });
        } catch (error) {
            message.error("Kategorileri çekerken sorun oluştu");
            return [];
        }
    }
    fetch();
 }, [])

 

  return (
    <><Header /><div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
              <Categories categories={categories} setCategories={setCategories} />
          </div>
          <div className="products overflow-auto max-h-[calc(100vh_-_112px)] pb-10 flex-[8]">
              <Products categories={categories} />
          </div>
          <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
              <CartTotals />
          </div>
      </div></>
  )
}

export default HomePage