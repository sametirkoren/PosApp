import { message } from 'antd'
import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { PRODUCT_ENDPOINT } from '../../common/urls'
import ProductItem from './ProductItem'
import Add from './Add'
import { useNavigate } from 'react-router-dom'

const Products = ({categories}) => {
  const [products, setProducts] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const fetch = async () => {
      try {
        axios
          .get(PRODUCT_ENDPOINT)
          .then(res => {
            setProducts(res.data);

          });
      } catch (error) {
        message.error("Ürünleri çekerken sorun oluştu");
        return [];
      }
    }
    fetch();
  }, [])

  return (
    <div className='products-wrapper grid grid-cols-card gap-4 '>
      {products.map((item) => (
        <ProductItem item={item} />
      ))}
        <div className='bg-purple-800 product-item border hover:shadow-lg cursor-pointer transition-all select-none flex justify-center items-center  hover:opaticy-90 min-h-[180px]' onClick={() => setIsAddModalOpen(true)}>
         <PlusOutlined className='text-white md:text-2xl' />
        </div>
        <div className='bg-orange-800 product-item border hover:shadow-lg cursor-pointer transition-all select-none flex justify-center items-center hover:opaticy-90 min-h-[180px]' onClick={() => navigate("/products")}>
         <EditOutlined className='text-white md:text-2xl' />
        </div>
        <Add categories={categories} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} products={products} setProducts={setProducts}/>
    </div>
  )
}

export default Products