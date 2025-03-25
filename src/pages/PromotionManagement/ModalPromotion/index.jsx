import { DatePicker, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import BaseModal from '../../../components/common/BaseModal';

const ModalPromorion = ({ setIsOpenModal, ...props }) => {
    const { promotionSelected, setPromotionSelected } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    if (promotionSelected) {
        form.resetFields();
    }

    const content = (
        <Form form={form} layout="vertical" size="large">
            <Form.Item
                label="Tiêu đề:"
                name="title"
                rules={[{ message: 'Vui lòng nhập tiêu đề!!', required: true }]}
            >
                <Input placeholder="Nhập tiêu đề" allowClear />
            </Form.Item>
            <Form.Item label="Mô tả:" name="description">
                <Input.TextArea rows={4} placeholder="Nhập mô tả" allowClear />
            </Form.Item>
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <Form.Item
                        label="Lựa chọn:"
                        name="type"
                        rules={[{ message: 'Vui lòng chọn loại chương trình!!', required: true }]}
                        initialValue={'Giảm giá'}
                    >
                        <Select
                            options={[
                                { value: 'Giảm giá', label: 'Giảm giá' },
                                { value: 'Khuyến mại', label: 'Khuyến mại' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng:"
                        name="numOfAvailabel"
                        rules={[{ message: 'Vui lòng nhập số lượng!!', required: true }]}
                    >
                        <Input
                            type="number"
                            placeholder="Nhập số lượng áp dụng"
                            min={0}
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ngày bắt đầu:"
                        name="startAt"
                        rules={[{ message: 'Vui lòng nhập ngày bắt đầu !!', required: true }]}
                    >
                        <DatePicker
                            className="w-full"
                            showTime
                            format={'DD/MM/YYYY HH:mm:ss'}
                            placeholder="Chọn ngày bắt đầu"
                        />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label="Tạo mã CODE:"
                        name="code"
                        rules={[{ message: 'Vui lòng tạo mã CODE !!', required: true }]}
                    >
                        <Input placeholder="Tạo mã CODE" allowClear />
                    </Form.Item>
                    <Form.Item
                        label="Giảm giá/khuyến mại:"
                        name="value"
                        rules={[{ message: 'Vui lòng nhập giá trị!!', required: true }]}
                    >
                        <Input type="number" placeholder="Nhập giá trị" min={0} allowClear />
                    </Form.Item>
                    <Form.Item
                        label="Ngày kết thúc:"
                        name="endAt"
                        rules={[{ message: 'Vui lòng nhập ngày kết thúc !!', required: true }]}
                    >
                        <DatePicker
                            className="w-full"
                            showTime
                            format={'DD/MM/YYYY HH:mm:ss'}
                            placeholder="Chọn ngày kết thúc"
                        />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );

    const handleCreate = async () => {
        setIsLoading(true);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsOpenModal(false);
        setPromotionSelected(undefined);
    };

    return (
        <BaseModal
            wrapClassName="modal-create-promotionSelected"
            title={
                promotionSelected
                    ? 'Sửa chương trình khuyến mãi/giảm giá'
                    : 'Thêm chương trình khuyến mãi/giảm giá'
            }
            onOk={handleCreate}
            okText={promotionSelected ? 'Sửa' : 'Thêm mới'}
            onCancel={handleCancel}
            cancelText="Hủy"
            okButtonProps={{ loading: isLoading }}
            width={700}
            content={content}
            {...props}
        />
    );
};

export default ModalPromorion;
