import { Button, Form, Input, message, Modal, Table } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'

function Edit({ isEditModalOpen, setIsEditModalOpen, categories, setCategories }) {

    const [editingRow, setEditingRow] = useState({});


    const onFinish = (values) => {
        try {
            axios
                .put("http://localhost:5000/api/categories/update", JSON.stringify({ ...values, categoryId: editingRow._id }), {
                    headers: {
                        'content-type': 'application/json',
                    }
                })
            message.success("Kategori başarıyla güncellendi");
            setCategories(categories.map((item) => {
                if (item._id === editingRow._id) {
                    return { ...item, title: values.title }
                }
                return item;
            }))

        } catch (error) {
            message.error("Kategori güncellenemedi");
        }
    }

    const deleteCategory = (id) => {
        try {
            axios
                .delete("http://localhost:5000/api/categories/delete", JSON.stringify({categoryId: id}), {
                    headers: {
                        'content-type': 'application/json',
                    }
                })
            message.success("Kategori başarıyla silindi");
            setCategories(categories.filter((item) => item._id !== id ))
        } catch (error) {
            message.error("Kategori silinemedi")
        }
    }

    const columns = [{
        title: "Kategori Başlığı",
        dataIndex: "title",
        render: (_, record) => {
            if (record._id === editingRow._id) {
                return (<Form.Item className='mb-0' name="title">
                    <Input defaultValue={record.title} />
                </Form.Item>)
            } else {
                return (
                    <p>{record.title}</p>
                )
            }
        }
    },
    {
        title: "İşlemler",
        dataIndex: "action",
        render: (text, record) => {
            return (
                <div>
                    <Button className='pl-0' type='link' onClick={() => setEditingRow(record)}>Düzenle</Button>
                    <Button className='text-gray-500' type='link' htmlType='submit'>Kaydet</Button>
                    <Button type='link' danger onClick={() => deleteCategory(record._id)}>Sil</Button>

                </div>
            )
        }
    }
    ]
    return (
        <Modal
            title="Kategori İşlemleri"
            open={isEditModalOpen}
            onCancel={() => setIsEditModalOpen(false)}
            footer={false}
        >
            <Form onFinish={onFinish}>
                <Table rowKey={"_id"} columns={columns} dataSource={categories} bordered></Table>
            </Form>
        </Modal>
    )
}

export default Edit