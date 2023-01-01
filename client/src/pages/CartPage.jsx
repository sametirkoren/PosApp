import { Button, Card, message, Table } from 'antd'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CreateInvoice from '../components/Cart/CreateInvoice';
import Header from '../components/Header/Header'
import { decrease, deleteCart, increase } from '../redux/cartSlice';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

function CartPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    
      const columns = [
        {
          title: 'Ürün Resm',
          dataIndex: 'image',
          key: 'image',
          width: '125px',
          render: (text) => {
            return (<img  src={text} className="w-full h-20 object-cover" />)
          }
        },
        {
          title: 'Ürün Adı',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Kategori',
          dataIndex: 'category',
          key: 'category',
        },
        {
          title: 'Ürün Fiyatı',
          dataIndex: 'price',
          key: 'price',
          render: (text) => {
            return (
              <span>{text.toFixed(2)}₺</span>
            )
          }
        },
        {
          title: 'Ürün Adedi',
          dataIndex: 'quantity',
          key: 'quantity',
          render: (text, record) => {
            return (
              <div className='flex items-center gap-x-1'><Button onClick={() => {
                dispatch(increase(record));
                message.success("Ürün Sepete Eklendi");
              } } icon={<PlusCircleOutlined />} type='primary' size='small' className='w-full flex items-center justify-center !rounded-full' /><span className='font-bold dark:text-black'>{record.quantity}</span><Button onClick={() => {
                dispatch(decrease(record));
                message.success("Ürün Sepetten Silindi");
              } } icon={<MinusCircleOutlined />} type='primary' size='small' className='w-full flex items-center justify-center !rounded-full' /></div>
            )
          }
        },
        {
          title: 'Toplam Fiyat',
          render: (text, record) => {
            return (
              <span>{(record.quantity * record.price).toFixed(2)}₺</span>
            )
          }
        },
        {
          title: 'Aksiyonlar',
          render: (_, record) => {
            return (
              <Button type="link" danger onClick={() => {
                dispatch(deleteCart(record))
                message.success("Ürün Sepetten Silindi")
            }} >Sil</Button>
            )
          }
        },
      ];
  return <>
    <Header />
    <div className='px-6 h-screen'>
    <h1 className='text-4xl font-bold text-center mb-4 dark:text-white'>Sepet</h1>
        <Table dataSource={cart.cartItems} columns={columns} pagination={false}  bordered/>
        <div className="cart-total flex justify-end mt-4">
            <Card className='w-72'>
                <div className='flex justify-between'>
                    <span>Ara Toplam</span>
                    <span className='dark:text-black'>{(cart.total).toFixed(2)}₺</span>
                </div>
                <div className='flex justify-between my-2'>
                    <span>KDV Toplam %{cart.tax}</span>
                    <span className='text-red-600'>+{((cart.total * cart.tax) / 100).toFixed(2)}₺</span>
                </div>
                <div className='flex justify-between'>
                    <b>Genel Toplam</b>
                    <span className='dark:text-black'>{((cart.total + (cart.total * cart.tax) / 100)).toFixed(2)}₺</span>
                </div>
                <Button disabled={cart.cartItems.length === 0} onClick={() => setIsModalOpen(true)} className='mt-4 w-full' type='primary' size='large'>Sipariş Oluştur</Button>
            </Card>
        </div>
    </div>
    <CreateInvoice isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
  </>
}

export default CartPage