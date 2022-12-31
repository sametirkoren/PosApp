import React from 'react'
import { addProduct } from '../../redux/cartSlice'
import { useDispatch } from 'react-redux'
import { message } from 'antd';
function ProductItem({item}) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({...item, quantity: 1}));
    message.success("Ürün Sepete Eklendi.")
  }
  return (
    <div onClick={handleClick} className='product-item border hover:shadow-lg cursor-pointer transition-all select-none'>
          <div className='product-image'>
            <img src={item.image} alt="" className='h-28 object-cover w-full border-b' />
          </div>
          <div className='product-info flex flex-col p-3'>
            <span className='font-bold dark:text-white'>{item.title}</span>
            <span className='dark:text-white'>{item.price}₺</span>
          </div>
        </div>
  )
}

export default ProductItem