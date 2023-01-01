import { Button, Card, message, Table } from 'antd'
import React, {useState} from 'react'
import { useEffect } from 'react';
import { INVOICE_ENDPOINT } from '../common/urls';
import Header from '../components/Header/Header'
import PrintInvoice from '../components/Invoice/PrintInvoice';
import axios from 'axios';

function InvoicePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState();
    useEffect(() => {
      const fetch = async () => {
        try {
            axios
            .get(INVOICE_ENDPOINT)
            .then(res => {
                     setInvoices(res.data);

            });
        } catch (error) {
            message.error("Faturaları çekerken sorun oluştu");
            return [];
        }
    }
    fetch();

    }, [])
      
      const columns = [
        {
          title: 'Müşteri Adı',
          dataIndex: 'customerName',
          key: 'customerName',
        },
        {
          title: 'Telefon Numarası',
          dataIndex: 'customerPhoneNumber',
          key: 'customerPhoneNumber',
        },
        {
          title: 'Oluşturma Tarihi',
          dataIndex: 'createdAt',
          key: 'createdAt',
          render: (text) => {
            return (
              <span>{text.substring(0,10)}</span>
            )
          }
        },
        {
          title: 'Ödeme Yöntemi',
          dataIndex: 'paymentMethod',
          key: 'paymentMethod',
        },
        {
          title: 'Toplam Fiyat',
          dataIndex: 'totalAmount',
          key: 'totalAmount',
          render: (text) => {
            return (
              <span>{text}₺</span>
            )
          }
        },
        {
          title: 'Aksiyonlar',
          dataIndex: 'actions',
          key: 'actions',
          render: (_, record) => {
            return (
              <Button  onClick={() => {
                setIsModalOpen(true)
                setSelectedInvoice(record)
              }} type="link" className='pl-0'>Yazdır</Button>
            )
          }
        },
      ];
  return <>
    <Header />
    <div className='px-6 h-screen'>
        <h1 className='text-4xl font-bold text-center mb-4 dark:text-white'>Faturalar</h1>
        <Table dataSource={invoices} columns={columns} pagination={false}  bordered scroll={{
          y:300
        }}/>
    </div>
    <PrintInvoice selectedInvoice={selectedInvoice} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
  </>
}

export default InvoicePage