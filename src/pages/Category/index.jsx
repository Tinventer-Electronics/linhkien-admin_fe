import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Form,
    Input,
    message,
    Modal,
    Space,
    Table,
    TreeSelect,
    Typography,
    Upload,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { MdEditSquare } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import { getTreevaluesMenu } from '../../utils/getTreevaluesMenu';
import handleAPI from '../../api/handleAPI';
import { apiEndpoint } from '../../constants/apiEndpoint';
import { replaceName } from '../../utils/replaceName';
import { ReloadOutlined } from '@ant-design/icons';
import { FaPlus } from 'react-icons/fa6';

const { Title } = Typography;
const { confirm } = Modal;

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState();
    const [treeValues, setTreeValues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [fileList, setFileList] = useState([]);

    const [form] = useForm();

    const columns = [
        {
            key: 'categoryName',
            dataIndex: 'categoryName',
            title: 'Tên danh mục',
            width: 250,
        },
        {
            key: 'description',
            dataIndex: 'description',
            title: 'Mô tả',
            width: 300,
        },
        {
            key: 'action',
            dataIndex: '',
            title: 'Lựa chọn',
            align: 'center',
            width: 150,
            fixed: 'right',
            render: (category) => (
                <Space>
                    <Button
                        type="link"
                        color="default"
                        icon={<MdEditSquare size={20} className="!text-blue-500" />}
                        onClick={() => {
                            form.resetFields();
                            setCategorySelected(category);
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
                                    handleDeleteCategory(category._id);
                                },
                            })
                        }
                    />
                </Space>
            ),
        },
    ];

    useEffect(() => {
        if (categorySelected) {
            form.setFieldsValue(categorySelected);
            if (categorySelected.image) {
                const image = [];
                image.push({
                    uid: `${Math.floor(Math.random() * 100000)}`,
                    name: categorySelected.image,
                    status: 'done',
                    url: categorySelected.image,
                });
                setFileList(image);
            }
        }
    }, [categorySelected, form]);

    useEffect(() => {
        getCategories();
        getTreeValueCategory();
    }, []);

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

    const getCategories = async () => {
        setIsLoading(true);
        try {
            const res = await handleAPI(apiEndpoint.category.getAll, null, 'get');
            const treeValue = getTreevaluesMenu(res.data, true);
            setCategories(treeValue);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getTreeValueCategory = async () => {
        try {
            const res = await handleAPI(apiEndpoint.category.getAll, null, 'get');
            const treeValue = getTreevaluesMenu(res.data, false);
            setTreeValues(treeValue);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleAddCategory = async (values) => {
        setIsLoadingCreate(true);
        const formData = new FormData();
        try {
            values.parentId && formData.append('parentId', values.parentId);
            formData.append('categoryName', values.categoryName);
            fileList.length > 0 && formData.append('image', fileList[0].originFileObj);
            formData.append('slug', replaceName(values.categoryName));
            values.description && formData.append('description', values.description);
            const res = await handleAPI(apiEndpoint.category.create, formData, 'post');
            getCategories();
            getTreeValueCategory();
            message.success(res.message);
            form.resetFields();
            setFileList([]);
        } catch (error) {
            message.error(error.message);
        } finally {
            setIsLoadingCreate(false);
        }
    };

    const handleUpdateCategory = async (values) => {
        setIsLoadingUpdate(true);
        try {
            const formData = new FormData();
            values.parentId && formData.append('parentId', values.parentId);
            formData.append('categoryName', values.categoryName);
            fileList.length > 0 &&
            fileList[0].originFileObj &&
            Object.keys(fileList[0].originFileObj).length > 0
                ? formData.append('image', fileList[0].originFileObj)
                : formData.append('image', '');

            formData.append('slug', replaceName(values.categoryName));
            values.description && formData.append('description', values.description);
            //const datas = { ...values, slug: replaceName(values.categoryName) };
            const res = await handleAPI(
                apiEndpoint.category.update.replace(':id', categorySelected._id),
                formData,
                'put'
            );
            getCategories();
            getTreeValueCategory();
            message.success(res.message);
            form.resetFields();
            setFileList([]);
            setCategorySelected(undefined);
        } catch (error) {
            message.error(error.message);
        } finally {
            setIsLoadingUpdate(false);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const res = await handleAPI(
                apiEndpoint.category.delete.replace(':id', id),
                null,
                'delete'
            );
            getCategories();
            getTreeValueCategory();
            message.success(res.message);
        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
                <Card title={categorySelected ? 'Sửa danh mục' : 'Thêm mới danh mục'}>
                    <p className="mb-5">Chọn ảnh danh mục:</p>
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
                        onFinish={categorySelected ? handleUpdateCategory : handleAddCategory}
                        form={form}
                        layout="vertical"
                        size="large"
                    >
                        <FormItem name="parentId" label="Chọn danh mục cha">
                            <TreeSelect
                                treeData={treeValues}
                                allowClear
                                placeholder="Chọn danh mục cha"
                            />
                        </FormItem>
                        <FormItem
                            name="categoryName"
                            label="Tên danh mục"
                            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục.' }]}
                        >
                            <Input allowClear placeholder="Nhập tên danh mục" />
                        </FormItem>
                        <FormItem name="description" label="Mô tả">
                            <Input.TextArea cols={4} allowClear />
                        </FormItem>
                        <div className="flex justify-end items-center">
                            <Space>
                                <Button
                                    onClick={() => {
                                        setCategorySelected(undefined);
                                        form.resetFields();
                                    }}
                                >
                                    <ReloadOutlined />
                                </Button>
                                <Button
                                    loading={isLoadingUpdate}
                                    type="primary"
                                    disabled={categorySelected ? false : true}
                                    onClick={() => form.submit()}
                                >
                                    Sửa
                                </Button>
                                <Button
                                    loading={isLoadingCreate}
                                    type="primary"
                                    disabled={categorySelected ? true : false}
                                    onClick={() => form.submit()}
                                >
                                    Thêm mới
                                </Button>
                            </Space>
                        </div>
                    </Form>
                </Card>
            </div>

            <div className="col-span-8">
                <Table
                    loading={isLoading}
                    bordered
                    columns={columns}
                    dataSource={categories}
                    pagination={false}
                    scroll={{
                        y: 'calc(100vh - 220px)',
                        x: '100%',
                    }}
                    title={() => (
                        <div>
                            <Title style={{ margin: '0' }} level={5}>
                                Bảng danh mục
                            </Title>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default Category;
