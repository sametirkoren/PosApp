import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import StatisticCard from '../components/Statistics/StatisticCard'
import { Area, Pie } from '@ant-design/plots';
import { INVOICE_ENDPOINT } from '../common/urls';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

function StatisticPage() {
  const [data, setData] = useState();
  const {productItems} = useSelector((state) => state.product);
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(INVOICE_ENDPOINT)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    data,
    xField: 'createdAt',
    yField: 'subTotal',
    xAxis: {
      range: [0, 1],
    },
    isStack: true,
  };




  const config2 = {
    appendPadding: 10,
    data,
    angleField: 'subTotal',
    colorField: 'customerName',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Toplam\nFiyat',
      },
    },
    isStack: true,
  };


  const totalAmount = () => {
    const amount = data.reduce((total, item) =>  item.totalAmount + total, 0);
    return amount.toFixed(2) + " ₺";
  }


  return <>
    <Header />
    <div className='px-6 md:pb-0 pb-20 h-screen'>
      {data ? (
         <><h1 className='text-4xl font-bold text-center mb-4 dark:text-white'>İstatistikler</h1><div className='statistic-section'>
          <h2 className="text-lg dark:text-white">
            Hoş geldin{" "}
            <span className="text-green-700 font-bold text-xl">{user.username}</span>
          </h2>
          <div className='statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4'>
            <StatisticCard title={"Toplam Müşteri"} amount={data?.length} img={"images/user.png"} />
            <StatisticCard title={"Toplam Kazanç"} amount={totalAmount()} img={"images/money.png"} />
            <StatisticCard title={"Toplam Satış"} amount={data?.length} img={"images/sale.png"} />
            <StatisticCard title={"Toplam Ürün"} amount={productItems?.length} img={"images/product.png"} />
          </div>
          <div className='flex justify-between gap-10 lg:flex-row flex-col items-center'>
            <div className='lg:w-1/2 lg:h-full h-72'>
              <Area {...config} />
            </div>
            <div className='lg:w-1/2 lg:h-full h-72'>
              <Pie {...config2} />
            </div>
          </div>
        </div></>
      ) : <Spin size='large' className='absolute top-1/2 h-screen w-screen flex justify-center'/>}
       
    </div>

  </>
}

export default StatisticPage