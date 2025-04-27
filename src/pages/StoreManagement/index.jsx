import {
    Button,
    Card,
    Divider,
    Form,
    Input,
    message,
    Modal,
    Space,
    Table,
    Typography,
    Upload,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { MdDeleteForever, MdEditSquare } from 'react-icons/md';
import { apiEndpoint } from '../../constants/apiEndpoint';
import handleAPI from '../../api/handleAPI';
import { replaceName } from '../../utils/replaceName';

const { confirm } = Modal;

const StoreManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [fileList, setFileList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [itemSelected, setItemSelected] = useState();

    const [form] = useForm();

    const columns = [
        {
            key: 'title',
            dataIndex: 'title',
            title: 'Tiêu đề',
        },
        {
            key: 'image',
            dataIndex: 'image',
            title: 'Background',
            render: (image) => (
                <>
                    <div
                        style={{
                            width: '100%',
                            aspectRatio: '1 / 0.3',
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: 8,
                            border: '1px solid #f0f0f0',
                        }}
                    />
                </>
            ),
        },
        {
            key: 'action',
            dataIndex: '',
            title: 'Lựa chọn',
            align: 'center',
            width: 150,
            fixed: 'right',
            render: (item) => (
                <Space>
                    <Button
                        type="link"
                        color="default"
                        icon={<MdEditSquare size={20} className="!text-blue-500" />}
                        onClick={() => {
                            form.resetFields();
                            setItemSelected(item);
                        }}
                    />
                    <Button
                        type="link"
                        color="default"
                        icon={<MdDeleteForever size={20} className="!text-red-500" />}
                        onClick={() =>
                            confirm({
                                title: 'Xác nhận',
                                content: 'Bạn có chắc muốn xóa danh mục này ?',
                                okText: 'Xóa',
                                cancelText: 'Hủy',
                                onOk: () => {
                                    handleDeleteitem(item._id);
                                },
                            })
                        }
                    />
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getDatas();
    }, []);

    useEffect(() => {
        if (itemSelected) {
            form.setFieldsValue(itemSelected);
            if (itemSelected.image) {
                const image = [];
                image.push({
                    uid: `${Math.floor(Math.random() * 100000)}`,
                    name: itemSelected.image,
                    status: 'done',
                    url: itemSelected.image,
                });
                setFileList(image);
            }
        }
    }, [itemSelected, form]);

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

    const getDatas = async () => {
        setIsLoading(true);
        try {
            const res = await handleAPI(apiEndpoint.store.getAll);
            setItems(res.data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNew = async (values) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            values.title ? formData.append('title', values.title) : formData.append('title', '');
            formData.append('slug', replaceName(values.title));
            fileList.length > 0
                ? formData.append('image', fileList[0].originFileObj)
                : formData.append('image', '');
            const api = apiEndpoint.store.create;
            await handleAPI(api, formData, 'post');
            messageApi.success('Thêm mới thành công');
            form.resetFields();
            setFileList([]);
            getDatas();
        } catch (error) {
            console.log(error);
            messageApi.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (values) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            fileList.length > 0
                ? fileList[0].originFileObj && Object.keys(fileList[0].originFileObj).length > 0
                    ? formData.append('image', fileList[0].originFileObj)
                    : formData.append('image', fileList[0].url)
                : formData.append('image', '');

            formData.append('slug', replaceName(values.title));
            values.title ? formData.append('title', values.title) : formData.append('title', '');
            const res = await handleAPI(
                apiEndpoint.store.update.replace(':id', itemSelected._id),
                formData,
                'put'
            );
            messageApi.success(res.message);
            form.resetFields();
            setFileList([]);
            setItemSelected(undefined);
            getDatas();
        } catch (error) {
            messageApi.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteitem = async (id) => {
        try {
            const res = await handleAPI(
                apiEndpoint.store.delete.replace(':id', id),
                null,
                'delete'
            );
            message.success(res.message);
            getDatas();
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div>
            {contextHolder}
            <Card className="mb-8">
                <Typography.Title level={3}>Thiết lập background website</Typography.Title>
                <div className="flex justify-around items-center">
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChangeUpLoad}
                        maxCount={1}
                        beforeUpload={() => false}
                        showUploadList={{ showRemoveIcon: true }}
                    >
                        {fileList.length >= 1 ? null : (
                            <>
                                <FaPlus style={{ marginRight: '5px' }} />
                                Tải ảnh
                            </>
                        )}
                    </Upload>
                    <Form
                        form={form}
                        layout="vertical"
                        size="large"
                        onFinish={itemSelected ? handleUpdate : handleAddNew}
                    >
                        <Form.Item
                            name="title"
                            label="Nhập tiêu đề"
                            rules={[
                                { required: true, message: 'Bạn chưa nhập tiêu đề cho background' },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="Nhập tiêu đề"
                                className="w-[450px]"
                                rows={3}
                            />
                        </Form.Item>
                        <Divider />
                        <div className="flex justify-center">
                            <Button
                                type="primary"
                                onClick={() => form.submit()}
                                loading={isLoading}
                            >
                                {itemSelected ? 'Sửa' : 'Thêm mới'}
                            </Button>
                        </div>
                    </Form>
                </div>
            </Card>
            <Table
                columns={columns}
                dataSource={items}
                bordered
                scroll={{
                    x: '100%',
                }}
            />
        </div>
    );
};

export default StoreManagement;
