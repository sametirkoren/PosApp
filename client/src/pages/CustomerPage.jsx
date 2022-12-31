import { Table } from 'antd'
import React from 'react'
import Header from '../components/Header/Header'

function CustomerPage() {
 
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
        <h1 className='text-4xl font-bold text-center mb-4 dark:text-white'>Müşteriler</h1>
        <Table dataSource={dataSource} columns={columns} pagination={false}  bordered/>
    </div>
  </>
}

export default CustomerPage