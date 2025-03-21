import { Button, Modal, Space, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { MdEditSquare } from 'react-icons/md';
import { RiUserForbidFill } from 'react-icons/ri';
import { FiFilter } from 'react-icons/fi';
import ModalSupplier from './ModalSupplier';

const { Title } = Typography;
const { confirm } = Modal;

const SupplierManagement = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [supplierSlected, setSupplierSlected] = useState();
    const dataTest = [
        {
            index: 1,
            name: 'test1',
            product: 'Sản phẩm 1',
            email: 'namtdvp10@gmail.com',
            contact: '0963764782',
        },
    ];

    const columns = [
        {
            key: 'index',
            dataIndex: 'index',
            title: '#',
            align: 'center',
            width: 50,
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Tên nhà cung cấp',
            width: 250,
        },
        {
            key: 'product',
            dataIndex: 'product',
            title: 'Sản phẩm',
            width: 250,
        },
        {
            key: 'email',
            dataIndex: 'email',
            title: 'Email',
            width: 250,
        },
        {
            key: 'contact',
            dataIndex: 'contact',
            title: 'Số điện thoại',
            width: 150,
        },
        {
            key: 'buttonAction',
            dataIndex: '',
            title: 'Tùy chọn',
            fixed: 'right',
            align: 'center',
            width: 100,
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
                            confirm({
                                title: 'Xác nhận',
                                content: 'Bạn có chắc muốn xóa nhà cung cấp này không ?',
                            });
                        }}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={dataTest}
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
            />

            <ModalSupplier
                setIsOpenModal={setIsOpenModal}
                open={isOpenModal}
                supplier={supplierSlected}
                setSupplier={setSupplierSlected}
            />
        </div>
    );
};

export default SupplierManagement;
