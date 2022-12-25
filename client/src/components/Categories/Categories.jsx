import React, { useState } from 'react'
import { PlusOutlined, EditOutlined } from "@ant-design/icons"
import "./style.css";
import Add from './Add';
import Edit from './Edit';

function Categories({ categories, setCategories}) {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
    return (
        <ul className='flex gap-4 md:flex-col text-lg'>
            {categories.map((item) => (
                <li className='category-item' key={item._id}>
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