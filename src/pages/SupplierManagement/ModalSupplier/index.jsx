import React, { useState } from 'react';
import BaseModal from '../../../components/common/BaseModal';
import { Avatar, Button, Form, Input } from 'antd';
import { FaRegUser } from 'react-icons/fa6';
import Paragraph from 'antd/es/skeleton/Paragraph';

const ModalSupplier = ({ setIsOpenModal, ...props }) => {
    const { supplier, setSupplier } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    if (supplier) {
        form.setFieldsValue(supplier);
    }

    const content = (
        <div>
            <label htmlFor="inpFile" className="flex justify-center items-center gap-5 my-5">
                <div className="flex justify-center">
                    <Avatar
                        size={100}
                        style={{
                            backgroundColor: 'white',
                            border: '2px dashed #5d6679',
                            textAlign: 'center',
                        }}
                    >
                        <FaRegUser size={70} />
                    </Avatar>
                </div>
                <div>
                    <Paragraph style={{ margin: '0px' }}>Kéo hình ảnh vào đây</Paragraph>
                    <Paragraph style={{ margin: '0px' }}>hoặc</Paragraph>
                    <Button type="link" style={{ padding: '0px' }}>
                        Chọn file
                    </Button>
                </div>
            </label>

            <Form
                disabled={isLoading}
                layout="horizontal"
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                size="large"
            >
                <Form.Item
                    name={'name'}
                    label={'Tên nhà cung cấp'}
                    rules={[{ required: true, message: 'Vui lòng nhạp tên nhà cung cấp.' }]}
                >
                    <Input placeholder="Nhập tên nhà cung cấp" allowClear />
                </Form.Item>
                <Form.Item name={'product'} label={'Sản phẩm'}>
                    <Input placeholder="Nhập tên sản phẩm" allowClear />
                </Form.Item>
                <Form.Item name={'price'} label={'Giá'}>
                    <Input placeholder="Nhập giá sản phẩm" type="number" allowClear />
                </Form.Item>
                <Form.Item name={'email'} label={'Email'}>
                    <Input placeholder="Nhập email nhà cung cấp" type="email" allowClear />
                </Form.Item>
                <Form.Item name={'contact'} label={'Số điện thoại'}>
                    <Input placeholder="Nhập số điện thoại nhà cung cấp" allowClear />
                </Form.Item>
            </Form>

            <div className="hidden">
                <input accept="image/*" type="file" id="inpFile" />
            </div>
        </div>
    );

    const handleCreate = async () => {
        setIsLoading(true);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsOpenModal(false);
        setSupplier(undefined);
    };

    return (
        <BaseModal
            wrapClassName="modal-create-supplier"
            title={supplier ? 'Sửa nhà cung cấp' : 'Thêm nhà cung cấp'}
            onOk={handleCreate}
            okText={supplier ? 'Sửa' : 'Thêm mới'}
            onCancel={handleCancel}
            cancelText="Hủy"
            okButtonProps={{ loading: isLoading }}
            width={700}
            content={content}
            {...props}
        />
    );
};

export default ModalSupplier;
