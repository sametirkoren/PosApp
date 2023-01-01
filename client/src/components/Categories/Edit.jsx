import { Button, Form, Input, message, Modal, Table } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import { CATEGORY_ENDPOINT } from '../../common/urls';

function Edit({ isEditModalOpen, setIsEditModalOpen, categories, setCategories }) {

    const [editingRow, setEditingRow] = useState({});


    const onFinish = (values) => {
        try {
            axios
                .put(`${CATEGORY_ENDPOINT}/update`, JSON.stringify({ ...values, categoryId: editingRow._id }), {
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

    const deleteCategory = async (id) => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({
              "categoryId": id
            });
            
            var requestOptions = {
              method: 'DELETE',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };
            
            fetch(`${CATEGORY_ENDPOINT}/delete`, requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));
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