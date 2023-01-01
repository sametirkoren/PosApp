import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CATEGORY_ENDPOINT, PRODUCT_ENDPOINT } from '../../common/urls';

function Edit() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState({});
    const [form] = Form.useForm();



    useEffect(() => {
       const fetch = async () => {
           try {
               axios
               .get(`${CATEGORY_ENDPOINT}/get-all`)
               .then(res => {
                        res.data && setCategories(res.data.map((item) => {return {...item, value: item.title}}));
   
               });
           } catch (error) {
               message.error("Kategorileri çekerken sorun oluştu");
               return [];
           }
       }
       fetch();
    }, [])

    useEffect(() => {
        const fetch = async () => {
          try {
            axios
              .get(`${PRODUCT_ENDPOINT}/get-all`)
              .then(res => {
                setProducts(res.data);
    
              });
          } catch (error) {
            message.error("Ürünleri çekerken sorun oluştu");
            return [];
          }
        }
        fetch();
      }, [])

    const onFinish = (values) => {
        try {
            axios
                .put(`${PRODUCT_ENDPOINT}/update`, JSON.stringify({ ...values, productId: editingItem._id}), {
                    headers: {
                        'content-type': 'application/json',
                    }
                })
            message.success("Ürün başarıyla güncellendi");
            setProducts(products.map((item) => {
                if(item._id === editingItem._id){
                    return values;
                }
                return item;
            }))

        } catch (error) {
            message.error("Ürün güncellenemedi");
        }
    }

    const deleteProduct = async (id) => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({
              "productId": id
            });
            
            var requestOptions = {
              method: 'DELETE',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`${PRODUCT_ENDPOINT}/delete`, requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
            message.success("Ürün başarıyla silindi");
            setProducts(products.filter((item) => item._id !== id ))
        } catch (error) {
            message.error("Ürün silinemedi")
        }
    }

    const columns = [{
        title: "Ürün Adı",
        dataIndex: "title",
        width:"8%",
        render: (_, record) => {
            return (
                <p>{record.title}</p>
            )
        }
    },
    {
        title: "Ürün Resmi",
        dataIndex: "image",
        width:"4%",
        render: (_, record) => {
            return (
                <img src={record.image} className="w-full h-20 object-cover" alt={record.title} />
            )
        }
    },
    {
        title: "Ürün Fiyatı",
        dataIndex: "price",
        width:"8%",
    },
    {
        title: "Kategori",
        dataIndex: "category",
        width:"8%",
    },
    {
        title: "İşlemler",
        dataIndex: "action",
        width:"8%",
        render: (text, record) => {
            return (
                <div>
                    <Button className='pl-0' type='link' onClick={() => {
                        setIsEditModalOpen(true)
                        setEditingItem(record)
                    }}>Düzenle</Button>
                    <Button type='link' danger onClick={() => deleteProduct(record._id)}>Sil</Button>

                </div>
            )
        }
    }
    ]
    return (
        <>
            <Table rowKey={"_id"} columns={columns} dataSource={products} bordered scroll={{x: 1000, y: 600}}></Table>
            <Modal
            title="Ürün Düzenle"
            open={isEditModalOpen}
            onCancel={() => setIsEditModalOpen(false)}
            footer={false}
        >

            <Form form={form} layout='vertical' onFinish={onFinish} initialValues={editingItem}>
                <Form.Item name="title" label="Ürün Adı" rules={[
                    { required: true, message: "Ürün Adı Alanı Boş Geçilemez" }
                ]}>
                    <Input placeholder='Ürün Adı Giriniz' />
                </Form.Item>
                <Form.Item name="image" label="Ürün Resmi" rules={[
                    { required: true, message: "Ürün Resim Alanı Boş Geçilemez" }
                ]}>
                    <Input placeholder='Ürün Resim Url Giriniz' />
                </Form.Item>
                <Form.Item name="price" label="Ürün Fiyatı" rules={[
                    { required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez" }
                ]}>
                    <Input  placeholder='Ürün Fiyatı Giriniz' type='number'/>
                </Form.Item>
                <Form.Item name="category" label="Kategori" rules={[
                    { required: true, message: "Kategori Alanı Boş Geçilemez" }
                ]}>
                   <Select options={categories} showSearch placeholder="Kategori Seçiniz" > 

                   </Select>
                </Form.Item>
                <Form.Item className='flex justify-end mb-0'>
                    <Button type='primary' htmlType='submit'>
                        Güncelle
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}

export default Edit