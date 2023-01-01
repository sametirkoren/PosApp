import React, { useEffect, useState } from 'react'
import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import "./style.css";
import Add from './Add';
import Edit from './Edit';

function Categories({ products, setFiltered, categories, setCategories}) {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [categoryTitle, setCategoryTitle] = useState("Tüm Ürünler");


    useEffect(() => {
        if(categoryTitle === "Tüm Ürünler"){
            setFiltered(products)
        }else{
            setFiltered(products.filter((item) => item.category === categoryTitle))
        }
    }, [products, setFiltered, categoryTitle])
    
  
    return (
        <ul className='flex gap-4 md:flex-col text-lg'>
            {categories.map((item) => (
                <li onClick={() => setCategoryTitle(item.title)} className={`category-item ${item.title === categoryTitle && "!bg-pink-700"}`} key={item._id}>
                    <span>{item.title}</span>
                </li>
            ))}

            <li onClick={() => setIsAddModalOpen(true)} className='category-item !bg-purple-800 hover:opacity-90'>
                <PlusOutlined className='md:text-2xl ' />
            </li>

            <li onClick={() => setIsEditModalOpen(true)} className='category-item !bg-orange-800 hover:opacity-90'>
                <EditOutlined className='md:text-2xl ' />
            </li>
            
            <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} categories={categories} setCategories={setCategories}/>
            <Edit isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} categories={categories} setCategories={setCategories} />
           
        </ul>
    )
}

export default Categories