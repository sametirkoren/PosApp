import React, { useEffect, useState } from 'react'
import CartTotals from "../components/Cart/CartTotals";
import Categories from "../components/Categories/Categories";
import Header from "../components/Header/Header";
import Products from "../components/Products/Products";
import axios from 'axios';
import { CATEGORY_ENDPOINT, PRODUCT_ENDPOINT } from '../common/urls';
import { message, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { productList } from '../redux/productSlice'
function HomePage() {
    const [categories, setCategories] = useState();
    const [products, setProducts] = useState()
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        const fetch = async () => {
            try {
                axios
                    .get(`${CATEGORY_ENDPOINT}/get-all`)
                    .then(res => {
                        res.data && setCategories(res.data.map((item) => { return { ...item, value: item.title } }));

                    });
            } catch (error) {
                message.error("Kategorileri çekerken sorun oluştu");
                return [];
            }
        }
        fetch();
    }, [])

    useEffect(() => {
        const fetch = async () => {
            try {
                axios
                    .get(`${PRODUCT_ENDPOINT}/get-all`)
                    .then(res => {
                        setProducts(res.data);
                        dispatch(productList(res.data))
                    });
            } catch (error) {
                message.error("Ürünleri çekerken sorun oluştu");
                return [];
            }
        }
        fetch();
    }, [])




    return (
        <><Header setSearch={setSearch} /><div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
           {products && categories ? (
             <><div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
                    <Categories categories={categories} setCategories={setCategories} setFiltered={setFiltered} products={products} />
                </div><div className="products overflow-auto max-h-[calc(100vh_-_112px)] pb-10 flex-[8] min-h-[500px]">
                        <Products categories={categories} products={products} setProducts={setProducts} filtered={filtered} search={search} />
                    </div><div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
                        <CartTotals />
                    </div></>
           ): <Spin size='large' className='absolute top-1/2 w-screen flex justify-center'/>}
        </div></>
    )
}

export default HomePage