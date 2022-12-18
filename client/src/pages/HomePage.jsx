import React from 'react'
import CartTotals from "../components/Cart/CartTotals";
import Categories from "../components/Categories/Categories";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";

function HomePage() {
  return (
    <><Header /><div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
              <Categories />
          </div>
          <div className="products overflow-auto max-h-[calc(100vh_-_112px)] pb-10 flex-[8]">
              <Products />
          </div>
          <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
              <CartTotals />
          </div>
      </div></>
  )
}

export default HomePage