import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import React from 'react'
import { useState } from 'react'
import ProductItem from './ProductItem'
import Add from './Add'
import { useNavigate } from 'react-router-dom'

const Products = ({search,products, setProducts , categories, filtered}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div className='products-wrapper grid grid-cols-card gap-4 '>
      {filtered.filter((product) => product.title.toLowerCase().includes(search)).map((item) => (
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