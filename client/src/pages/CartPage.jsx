import { Button, Card, Table } from 'antd'
import React, {useState} from 'react'
import CreateInvoice from '../components/Cart/CreateInvoice';
import Header from '../components/Header/Header'

function CartPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];
  return <>
    <Header />
    <div className='px-6 h-screen'>
    <h1 className='text-4xl font-bold text-center mb-4 dark:text-white'>Sepet</h1>
        <Table dataSource={dataSource} columns={columns} pagination={false}  bordered/>
        <div className="cart-total flex justify-end mt-4">
            <Card className='w-72'>
                <div className='flex justify-between'>
                    <span>Ara Toplam</span>
                    <span>549.00₺</span>
                </div>
                <div className='flex justify-between my-2'>
                    <span>KDV Toplam %8</span>
                    <span className='text-red-600'>+43.92₺</span>
                </div>
                <div className='flex justify-between'>
                    <b>Toplam</b>
                    <b>592₺</b>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className='mt-4 w-full' type='primary' size='large'>Sipariş Oluştur</Button>
            </Card>
        </div>
    </div>
    <CreateInvoice isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
  </>
}

export default CartPage