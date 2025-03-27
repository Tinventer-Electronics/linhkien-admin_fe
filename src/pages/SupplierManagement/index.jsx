import { Button, message, Modal, Space, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { MdEditSquare } from 'react-icons/md';
import { RiUserForbidFill } from 'react-icons/ri';
import { FiFilter } from 'react-icons/fi';
import ModalSupplier from './ModalSupplier';
import { apiEndpoint } from '../../constants/apiEndpoint';
import handleAPI from '../../api/handleAPI';

const { Title } = Typography;

const SupplierManagement = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [supplierSlected, setSupplierSlected] = useState();
    const [isloading, setIsloading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        getSuppliers();
    }, []);

    const getSuppliers = async () => {
        setIsloading(true);
        try {
            const res = await handleAPI(apiEndpoint.supplier.getAll);
            if (res.data) {
                const suppliers = res.data.map((item, index) => {
                    return { ...item, index: index + 1 };
                });
                setData(suppliers);
            }
        } catch (error) {
            messageApi.error(error.message);
            console.log(error.message);
        } finally {
            setIsloading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await handleAPI(
                `${apiEndpoint.supplier.delete.replace(':id', id)}`,
                null,
                'delete'
            );
            if (res.message) {
                messageApi.success(res.message);
                getSuppliers();
            }
        } catch (error) {
            messageApi.error(error.message);
        }
    };

    const columns = [
        {
            key: 'index',
            dataIndex: 'index',
            title: '#',
            align: 'center',
            width: 50,
        },
        {
            key: 'photoUrl',
            dataIndex: 'photoUrl',
            title: 'Ảnh',
            width: 100,
            render: (photoUrl) =>
                photoUrl ? (
                    <img
                        src={photoUrl}
                        alt="supplier"
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/50';
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        N/A
                    </div>
                ),
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên nhà cung cấp',
            width: 250,
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: 'Email',
            width: 250,
        },
        {
            key: 'phone',
            dataIndex: 'phone',
            title: 'Số điện thoại',
            width: 150,
        },
        {
            key: 'product',
            dataIndex: 'product',
            title: 'Sản phẩm',
            width: 250,
        },
        {
            key: 'price',
            dataIndex: 'price',
            title: 'Giá',
            width: 250,
        },
        {
            key: 'buttonAction',
            dataIndex: '',
            title: 'Tùy chọn',
            fixed: 'right',
            align: 'center',
            width: 150,
            render: (item) => (
                <Space>
                    <Button
                        color="default"
                        type="link"
                        icon={<MdEditSquare size={20} color="#3b82f6" />}
                        onClick={() => {
                            setIsOpenModal(true);
                            setSupplierSlected(item);
                        }}
                    />
                    <Button
                        color="danger"
                        type="link"
                        icon={<RiUserForbidFill size={20} color="#ef4444 " />}
                        onClick={() => {
                            Modal.confirm({
                                title: 'Xác nhận',
                                content: 'Bạn có chắc muốn xóa nhà cung cấp này không ?',
                                onOk: () => handleDelete(item._id),
                                okText: 'Xóa',
                                cancelText: 'Hủy',
                            });
                        }}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            {contextHolder}
            <Table
                loading={isloading}
                dataSource={data}
                columns={columns}
                rowKey={'index'}
                bordered
                title={() => (
                    <div className="grid grid-rows-1 grid-cols-2">
                        <div>
                            <Title level={5}>Bảng nhà cung cấp</Title>
                        </div>
                        <div className="text-end">
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setIsOpenModal(true);
                                    }}
                                >
                                    Thêm Mới
                                </Button>
                                <Button icon={<FiFilter />}>Lọc</Button>
                                <Button>Xuất File Excel</Button>
                            </Space>
                        </div>
                    </div>
                )}
                scroll={{ x: '100%' }}
            />

            <ModalSupplier
                setIsOpenModal={setIsOpenModal}
                open={isOpenModal}
                supplier={supplierSlected}
                setSupplier={setSupplierSlected}
            />
        </>
    );
};

export default SupplierManagement;
