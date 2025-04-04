import { Form, Input, message, Modal, TreeSelect } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import React, { useState } from 'react';
import { replaceName } from '../../../utils/replaceName';

const ModalCategory = ({ visible, values, onAddNew, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [form] = useForm();

    const handleAddCategory = async (values) => {
        setIsLoading(true);
        const data = {};
        for (const i in values) {
            data[i] = values[i] ?? '';
        }
        data.slug = replaceName(values.title);
        try {
            onAddNew();
            handleClose();
        } catch (error) {
            message.error(error.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            closable={!isLoading}
            title="Thêm danh mục"
            open={visible}
            onCancel={handleClose}
            onClose={handleClose}
            okButtonProps={{ loading: isLoading }}
            onOk={() => form.submit()}
        >
            <Form form={form} layout="vertical" onFinish={handleAddCategory} size="large">
                <FormItem name="parentId" label="Chọn danh mục">
                    <TreeSelect
                        treeData={values}
                        allowClear
                        treeDefaultExpandAll
                        placeholder="Chọn danh mục"
                    />
                </FormItem>
                <FormItem
                    name="title"
                    label="Tên danh mục"
                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục.' }]}
                >
                    <Input placeholder="Nhập tên danh mục" allowClear />
                </FormItem>
                <FormItem name="description" label="Mô tả">
                    <Input.TextArea rows={4} allowClear />
                </FormItem>
            </Form>
        </Modal>
    );
};

export default ModalCategory;
