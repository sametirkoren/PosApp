import { Button, Form, Input, message, Modal } from 'antd'
import axios from 'axios';
import React from 'react'

function Add({ isAddModalOpen, setIsAddModalOpen, categories, setCategories }) {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        try {
            axios
                .post("http://localhost:5000/api/categories/add", values, {
                    headers: {
                        'content-type': 'application/json',
                    }
                })
            message.success("Kategori başarıyla eklendi");
            form.resetFields();
            setCategories([...categories, {
                _id: Math.random(),
                title: values.title
            }])

        } catch (error) {
            message.error("Kategori eklenemedi");
        }
    }


    return (
        <Modal
            title="Yeni Kategori Ekle"
            open={isAddModalOpen}
            onCancel={() => setIsAddModalOpen(false)}
            footer={false}
        >

            <Form form={form} layout='vertical' onFinish={onFinish}>
                <Form.Item name="title" label="Kategori Ekle" rules={[
                    { required: true, message: "Kategori Alanı Boş Geçilemez" }
                ]}>
                    <Input />
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