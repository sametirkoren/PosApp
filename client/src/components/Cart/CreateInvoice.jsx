import { Button, Card, Form, Input, Modal, Select } from 'antd'
import React from 'react'

function CreateInvoice({isModalOpen, setIsModalOpen}) {
    const onFinish = (values) => {
        console.log(values);
    }
  return (
    <Modal open={isModalOpen} footer={false} title="Fatura Oluştur" onCancel={() => setIsModalOpen(false)}>
        <Form onFinish={onFinish} layout='vertical'>
            <Form.Item name="customerName" label="Müşteri Adı" rules={[{ required: true}]}>
                <Input placeholder='Bir Müşteri Adı Yazınız'/>
            </Form.Item>
            <Form.Item name="phoneNumber" label="Telefon Numarası" rules={[{ required: true}]}>
                <Input maxLength={11} placeholder='Bir Telefon Numarası Yazınız'/>
            </Form.Item>
            <Form.Item name="paymentMethod" label="Ödeme Yöntemi" rules={[{ required: true}]}>
                <Select defaultValue={"Nakit"}>
                    <Select.Option value="Nakit">Nakit</Select.Option>
                    <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
                </Select>
            </Form.Item>
            <Card >
                <div className='flex justify-between'>
                    <span>Ara Toplam</span>
                    <span>549.00₺</span>
                </div>
                <div className='flex justify-between my-2'>
                    <span>KDV Toplam %8</span>
                    <span className='text-red-600'>+43.92₺</span>
                </div>
                <div className='flex justify-between'>
                    <b>Toplam</b>
                    <b>592₺</b>
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