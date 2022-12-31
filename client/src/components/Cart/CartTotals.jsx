import { Button, message } from 'antd'
import { ClearOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrease, deleteCart, increase, reset } from '../../redux/cartSlice';

function CartTotals() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className='cart h-full max-h-[calc(100vh_-_90px)] flex flex-col'>
            <h2 className='bg-blue-600 text-center py-4 text-white font-bold tracking-wide'>Sepetteki Ürünler</h2>
            <ul className='cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto'>
                {cart.cartItems.length > 0 ?  cart.cartItems.map((item) => (
                    <li className='cart-item flex justify-between' key={item._id}>
                        <div className='flex items-center'>
                            <img onClick={() => dispatch(deleteCart(item))} src={item.image} alt={item.title} className='w-16 h-16 object-cover' />
                            <div className='flex flex-col ml-2'>
                                <b className='dark:text-white'>{item.title}</b>
                                <span className='dark:text-white'>{item.price}₺ x {item.quantity}</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-x-1'>
                            <Button onClick={() => {
                                dispatch(increase(item))
                                message.success("Ürün Sepete Eklendi")
                            }} icon={<PlusCircleOutlined />} type='primary' size='small' className='w-full flex items-center justify-center !rounded-full' />
                            <span className='font-bold dark:text-white'>{item.quantity}</span>
                            <Button onClick={() => {
                                 dispatch(decrease(item))
                                 message.success("Ürün Sepetten Silindi")
                            }} icon={<MinusCircleOutlined />} type='primary' size='small' className='w-full flex items-center justify-center !rounded-full' />
                        </div>
                    </li>
                )): <div className='flex justify-center items-center h-screen font-bold dark:text-white'>Sepette hiç ürün yok</div>}

            </ul>
            <div className='cart-totals mt-auto'>
                <div className='border-t border-b'>
                    <div className='flex justify-between p-2'>
                        <b className='dark:text-white'>Ara Toplam</b>
                        <span className='dark:text-white'>{(cart.total).toFixed(2)}₺</span>
                    </div>
                    <div className='flex justify-between p-2'>
                        <b className='dark:text-white'>KDV %{cart.tax}</b>
                        <span className='text-red-700'>+{((cart.total * cart.tax) / 100).toFixed(2)}₺</span>
                    </div>
                </div>
                <div className='border-b mt-4'>
                    <div className='flex justify-between p-2'>
                        <b className='text-xl text-green-500 '>Genel Toplam</b>
                        <span className='text-xl dark:text-white'>{((cart.total + (cart.total * cart.tax) / 100)).toFixed(2)}₺</span>
                    </div>
                </div>
                <div className='py-4 px-2'>
                    <Button disabled={cart.cartItems.length === 0} type='primary' size='large' className='w-full dark:text-white'>Sipariş Oluştur</Button>
                    <Button disabled={cart.cartItems.length === 0} onClick={() => {
                        dispatch(reset())
                        message.success("Sepet Temizlendi.")
                    }} icon={<ClearOutlined />} type='primary' size='large' className='dark:text-white w-full mt-2 flex items-center justify-center'>Temizle</Button>
                </div>
            </div>
        </div>
    )
}

export default CartTotals