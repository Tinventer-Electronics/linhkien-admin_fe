import React, { useEffect, useState } from 'react';
import BaseModal from '../../../components/common/BaseModal';
import { Upload, Form, Input, message } from 'antd';
import { FaPlus } from 'react-icons/fa6';
import { uploadFile } from '../../../utils/uploadFile';
import { replaceName } from '../../../utils/replaceName';
import handleAPI from '../../../api/handleAPI';
import { apiEndpoint } from '../../../constants/apiEndpoint';

const ModalSupplier = ({ setIsOpenModal, ...props }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const { supplier, setSupplier } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (supplier) {
            // Đặt giá trị form
            form.setFieldsValue(supplier);

            // Nếu có ảnh, thêm vào fileList
            if (supplier.photoUrl) {
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: supplier.photoUrl,
                    },
                ]);
            } else {
                // Nếu không có ảnh, làm trống fileList
                setFileList([]);
            }
        }
    }, [supplier, form]);

    const handleChangeUpLoad = ({ fileList: newFileList }) => {
        if (newFileList.length > 0) {
            const file = newFileList[0];

            if (file.originFileObj) {
                setFileList([
                    {
                        ...file,
                        url: URL.createObjectURL(file.originFileObj),
                        status: 'done',
                    },
                ]);
            } else {
                setFileList([file]);
            }
        } else {
            setFileList([]);
        }
    };

    const content = (
        <div>
            <div className="flex justify-center mb-8">
                <Upload
                    listType="picture-circle"
                    fileList={fileList}
                    onChange={handleChangeUpLoad}
                    maxCount={1}
                    beforeUpload={() => false}
                    showUploadList={{ showRemoveIcon: true }}
                >
                    {fileList.length >= 1 ? null : (
                        <>
                            <FaPlus style={{ marginRight: '5px' }} />
                            Tải lên
                        </>
                    )}
                </Upload>
            </div>

            <Form
                disabled={isLoading}
                layout="horizontal"
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                size="large"
                labelAlign="left"
            >
                <Form.Item
                    name="name"
                    label="Tên nhà cung cấp"
                    rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp.' }]}
                >
                    <Input placeholder="Nhập tên nhà cung cấp" allowClear />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại nhà cung cấp.',
                        },
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại nhà cung cấp" allowClear />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập email nhà cung cấp.',
                        },
                    ]}
                >
                    <Input placeholder="Nhập email nhà cung cấp" type="email" allowClear />
                </Form.Item>
                <Form.Item name="product" label="Sản phẩm">
                    <Input placeholder="Nhập tên sản phẩm" allowClear />
                </Form.Item>
                <Form.Item name="price" label="Giá">
                    <Input placeholder="Nhập giá sản phẩm" type="number" allowClear />
                </Form.Item>
            </Form>
        </div>
    );

    const handleCreate = async () => {
        setIsLoading(true);
        try {
            const values = await form.validateFields();
            let imageUrl = '';
            if (fileList.length > 0 && fileList[0].originFileObj) {
                imageUrl = await uploadFile(fileList[0].originFileObj);
                if (!imageUrl) {
                    message.error('Không thể tải lên hình ảnh. Vui lòng thử lại.');
                    return;
                }
            }
            const supplierData = {
                ...values,
                slug: replaceName(values.name),
                photoUrl: imageUrl,
            };

            const res = await handleAPI(apiEndpoint.supplier.create, supplierData, 'post');
            console.log('res', res.data);

            if (res.data) {
                message.success(res.message);
                handleCancel();
            }
        } catch (error) {
            if (error.message) {
                message.error(error.message);
            }
            console.log('Validate Failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const values = await form.validateFields();

            let imageUrl = supplier?.photoUrl || '';

            if (fileList.length > 0 && fileList[0].originFileObj) {
                imageUrl = await uploadFile(fileList[0].originFileObj);
                if (!imageUrl) {
                    message.error('Không thể tải lên hình ảnh. Vui lòng thử lại.');
                    return;
                }
            } else if (fileList.length === 0) {
                imageUrl = '';
            }

            const supplierData = {
                ...values,
                slug: replaceName(values.name),
                photoUrl: imageUrl,
            };

            const res = await handleAPI(
                `${apiEndpoint.supplier.update.replace(':id', supplier._id)}`,
                supplierData,
                'put'
            );

            if (res.data) {
                message.success(res.message);
                handleCancel();
            }
        } catch (error) {
            if (error.message) {
                message.error(error.message);
            }
            console.log('Validate Failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setIsOpenModal(false);
        setSupplier(undefined);
        setFileList([]);
    };

    return (
        <BaseModal
            wrapClassName="modal-create-supplier"
            title={supplier ? 'Sửa nhà cung cấp' : 'Thêm nhà cung cấp'}
            onOk={supplier ? handleUpdate : handleCreate}
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
