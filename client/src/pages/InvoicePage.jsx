import { Button, Input, message, Space, Spin, Table } from 'antd'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { INVOICE_ENDPOINT } from '../common/urls';
import Header from '../components/Header/Header'
import PrintInvoice from '../components/Invoice/PrintInvoice';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';


function InvoicePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoices, setInvoices] = useState();
  const [selectedInvoice, setSelectedInvoice] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null)

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



  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Müşteri Adı',
      dataIndex: 'customerName',
      key: 'customerName',
      ...getColumnSearchProps("customerName")
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
      ...getColumnSearchProps("customerPhoneNumber")
    },
    {
      title: 'Oluşturma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        return (
          <span>{text.substring(0, 10)}</span>
        )
      }
    },
    {
      title: 'Ödeme Yöntemi',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      ...getColumnSearchProps("paymentMethod")
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => {
        return (
          <span>{text}₺</span>
        )
      },
      sorter: (a, b) => a.totalAmount - b.totalAmount

    },
    {
      title: 'Aksiyonlar',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        return (
          <Button onClick={() => {
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
      {invoices ? (<><h1 className='text-4xl font-bold text-center mb-4 dark:text-white'>Faturalar</h1><Table dataSource={invoices} columns={columns} pagination={false} bordered scroll={{
        y: 450
      }} /></>) : <Spin size='large' className='absolute top-1/2 h-screen w-screen flex justify-center'/>}

    </div>
    <PrintInvoice selectedInvoice={selectedInvoice} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
  </>
}

export default InvoicePage