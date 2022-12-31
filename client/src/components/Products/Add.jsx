import { Button, Form, Input, message, Modal, Select } from 'antd'
import axios from 'axios';
import React from 'react'

function Add({categories, isAddModalOpen, setIsAddModalOpen, products, setProducts }) {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        try {
            axios
                .post("http://localhost:5000/api/products/add", values, {
                    headers: {
                        'content-type': 'application/json',
                    }
                })
            message.success("Ürün başarıyla eklendi");
            form.resetFields();
            setProducts([...products, {
                ...values,
                _id: Math.random(),
        
            }])

        } catch (error) {
            message.error("Ürün eklenemedi");
        }
    }


    return (
        <Modal
            title="Yeni Ürün Ekle"
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={false}
        >

            <Form form={form} layout='vertical' onFinish={onFinish}>
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
                        Oluştur
                    </Button>
                </Form.Item>
            </Form>
        </Modal>

    )
}

export default Add