import { Button, Card, Form, Input, message, Modal, Select } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { reset } from '../../redux/cartSlice';

function CreateInvoice({ isModalOpen, setIsModalOpen }) {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        try {
            axios
                .post("http://localhost:5000/api/invoices/add", JSON.stringify({ ...values, cartItems: cart.cartItems, subTotal: cart.total, tax: ((cart.total * cart.tax) / 100).toFixed(2), totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2) }), {
                    headers: {
                        'content-type': 'application/json',
                    }
                })
            message.success("Fatura başarıyla oluşturuldu");
            dispatch(reset());
            navigate("/invoice");

        } catch (error) {
            message.error("Fatura oluşturalamadı");
        }
    }
    return (
        <Modal open={isModalOpen} footer={false} title="Fatura Oluştur" onCancel={() => setIsModalOpen(false)}>
            <Form onFinish={onFinish} layout='vertical'>
                <Form.Item name="customerName" label="Müşteri Adı" rules={[{ required: true }]}>
                    <Input placeholder='Bir Müşteri Adı Yazınız' />
                </Form.Item>
                <Form.Item name="customerPhoneNumber" label="Telefon Numarası" rules={[{ required: true }]}>
                    <Input maxLength={11} placeholder='Bir Telefon Numarası Yazınız' />
                </Form.Item>
                <Form.Item name="paymentMethod" label="Ödeme Yöntemi" rules={[{ required: true }]}>
                    <Select placeholder="Bir ödeme yöntemi seçiniz">
                        <Select.Option value="Nakit">Nakit</Select.Option>
                        <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
                    </Select>
                </Form.Item>
                <Card >
                    <div className='flex justify-between'>
                        <span>Ara Toplam</span>
                        <span className='dark:text-black'>{(cart.total).toFixed(2)}₺</span>
                    </div>
                    <div className='flex justify-between my-2'>
                        <span>KDV %{cart.tax}</span>
                        <span className='text-red-600'>+{((cart.total * cart.tax) / 100).toFixed(2)}₺</span>
                    </div>
                    <div className='flex justify-between'>
                        <b>Genel Toplam</b>
                        <span className='dark:text-black'>{((cart.total + (cart.total * cart.tax) / 100)).toFixed(2)}₺</span>
                    </div>
                    <div className='flex justify-end'>
                        <Button htmlType='submit' className='mt-4' type='primary' size='large'>Sipariş Oluştur</Button>
                    </div>
                </Card>
            </Form>
        </Modal>
    )
}

export default CreateInvoice