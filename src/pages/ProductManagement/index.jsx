import { Avatar, Button, Input, message, Modal, Space, Table, Tag, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdEditSquare } from 'react-icons/md';
import { MdDeleteForever } from 'react-icons/md';
import { VND } from '../../utils/handleCurrency';
import handleAPI from '../../api/handleAPI';
import { apiEndpoint } from '../../constants/apiEndpoint';

const { Title } = Typography;
const { confirm } = Modal;

const Inventory = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    const navigate = useNavigate();

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const columns = [
        {
            key: 'productName',
            dataIndex: 'productName',
            title: 'Tên sản phẩm',
            width: 300,
        },
        {
            key: 'images',
            dataIndex: 'images',
            title: 'Hình ảnh',
            width: 300,
            render: (imgs) =>
                imgs.length > 0 && (
                    <Space>
                        {imgs.map((url, index) => (
                            <Avatar
                                key={index}
                                src={url}
                                size={50}
                                style={{ border: '1px solid black' }}
                            />
                        ))}
                    </Space>
                ),
        },
        {
            key: 'code',
            dataIndex: 'code',
            title: 'Mã sản phẩm',
            width: 250,
        },
        {
            key: 'productOrigin',
            dataIndex: 'productOrigin',
            title: 'Xuất xứ',
            width: 200,
        },
        {
            key: 'categories',
            dataIndex: 'categories',
            title: 'Danh mục',
            width: 300,
            render: (categories) => (
                <Space>
                    {categories.map((category, index) => (
                        <Tag key={index}>{category}</Tag>
                    ))}
                </Space>
            ),
        },
        {
            key: 'cost',
            title: 'Giá nhập',
            dataIndex: 'cost',
            width: 150,
            render: (cost) => VND.format(cost),
        },
        {
            key: 'price',
            title: 'Giá bán',
            dataIndex: 'price',
            width: 150,
            render: (price) => VND.format(price),
        },
        {
            key: 'promotion',
            title: 'Khuyến mại',
            dataIndex: 'promotion',
            width: 150,
        },
        {
            key: 'action',
            title: 'Lựa chọn',
            align: 'center',
            fixed: 'right',
            dataIndex: '',
            width: 150,
            render: (product) => (
                <Space>
                    <Button
                        type="link"
                        icon={<MdEditSquare size={20} color="#3b82f6" />}
                        onClick={() => {
                            navigate(`/product-management/add-new-product?id=${product._id}`);
                        }}
                    />
                    <Button
                        type="link"
                        icon={<MdDeleteForever size={20} color="#ef4444" />}
                        onClick={() => {
                            confirm({
                                title: 'Xác nhận',
                                content: 'Bạn có chắc muốn xóa sản phẩm này không ?',
                                onOk: () => {
                                    deleteProduct(product._id);
                                },
                            });
                        }}
                    />
                </Space>
            ),
        },
    ];

    useEffect(() => {
        if (!searchKey) {
            getProducts();
        }
    }, [searchKey]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setIsLoading(true);
        try {
            const queryParams = `?page=${page}&pageSize=${pageSize}`;
            const res = await handleAPI(`${apiEndpoint.product.getAll}${queryParams}`);
            if (res && res.data) {
                setProducts(res.data);
                setTotal(res.data.length);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            setIsLoading(true);
            const res = await handleAPI(
                `${apiEndpoint.product.delete.replace(':id', id)}`,
                null,
                'delete'
            );
            if (res.message) {
                messageApi.success(res.message);
                getProducts();
            }
        } catch (error) {
            messageApi.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const hanleSearchProduct = async () => {};

    return (
        <div>
            {contextHolder}
            <Table
                rowSelection={rowSelection}
                loading={isLoading}
                dataSource={products}
                rowKey={'_id'}
                bordered
                columns={columns}
                pagination={{
                    showSizeChanger: true,
                    onChange(page) {
                        setPage(page);
                    },
                    onShowSizeChange(size) {
                        setPageSize(size);
                    },
                    total,
                }}
                scroll={{
                    x: '100%',
                }}
                title={() => (
                    <div className="grid grid-cols-2">
                        <div>
                            <Title level={4}>Bảng sản phẩm</Title>
                        </div>
                        <div className="text-right">
                            <Space>
                                {selectedRowKeys.length > 0 ? (
                                    <div>
                                        <span className="text-red-500 font-bold mr-3">
                                            {selectedRowKeys.length} sản phẩm được chọn
                                        </span>
                                        <Button
                                            type="primary"
                                            danger
                                            onClick={() => {
                                                confirm({
                                                    title: 'Xác nhận',
                                                    content:
                                                        'Bạn có chắc muốn xóa những sản phẩm được chọn không ?',
                                                    onOk: () => {
                                                        selectedRowKeys.forEach((id) =>
                                                            deleteProduct(id)
                                                        );
                                                    },
                                                });
                                            }}
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                ) : (
                                    ''
                                )}
                                <Input.Search
                                    value={searchKey}
                                    onChange={(val) => setSearchKey(val.target.value)}
                                    onSearch={hanleSearchProduct}
                                    placeholder="Nhập tên sản phẩm"
                                    allowClear
                                />
                                <Button type="primary">
                                    <Link to="/product-management/add-new-product">Thêm mới</Link>
                                </Button>
                            </Space>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default Inventory;
