import { Button, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { MdDeleteForever, MdEditSquare } from 'react-icons/md';
import ModalPromorion from './ModalPromotion';
import { formatDate } from '../../utils/formatDate';

const PromotionManagement = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [promotionSelected, setPromotionSelected] = useState();
    const columns = [
        {
            key: 'code',
            dataIndex: 'code',
            title: 'Mã CODE',
            width: 200,
        },
        {
            key: 'title',
            dataIndex: 'title',
            title: 'Tiêu đề',
            width: 250,
        },
        {
            key: 'description',
            dataIndex: 'description',
            title: 'Mô tả',
            width: 300,
        },
        {
            key: 'type',
            dataIndex: 'type',
            title: 'Giảm giá/khuyến mại',
            width: 200,
        },
        {
            key: 'value',
            dataIndex: 'value',
            title: 'Giá trị',
            width: 150,
            render: (value) => <Typography.Text>{value} %</Typography.Text>,
        },
        {
            key: 'numOfAvailabel',
            dataIndex: 'numOfAvailabel',
            title: 'Số lượng',
            width: 150,
        },
        {
            key: 'dateTime',
            dataIndex: '',
            title: 'Thời gian',
            width: 250,
            render: (promotion) => (
                <Typography.Text>
                    {formatDate(promotion.startAt).split(' ')[1]} -{' '}
                    {formatDate(promotion.endAt).split(' ')[1]}
                </Typography.Text>
            ),
        },
        {
            key: 'action',
            title: 'Lựa chọn',
            align: 'center',
            fixed: 'right',
            dataIndex: '',
            width: 150,
            render: (promotion) => (
                <Space>
                    <Button
                        type="link"
                        icon={<MdEditSquare size={20} color="#3b82f6" />}
                        onClick={() => {
                            setPromotionSelected(promotion);
                        }}
                    />
                    <Button type="link" icon={<MdDeleteForever size={20} color="#ef4444" />} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table
                bordered
                columns={columns}
                dataSource={[]}
                scroll={{
                    x: '100%',
                }}
                title={() => (
                    <div className="grid grid-rows-1 grid-cols-2">
                        <div>
                            <Typography.Title level={5}>
                                Bảng quản lý giảm giá/khuyến mại
                            </Typography.Title>
                        </div>
                        <div className="text-end">
                            <Button type="primary" onClick={() => setIsOpenModal(true)}>
                                Thêm mới
                            </Button>
                        </div>
                    </div>
                )}
            />
            <ModalPromorion
                setIsOpenModal={setIsOpenModal}
                open={isOpenModal}
                promotionSelected={promotionSelected}
                setPromotionSelected={setPromotionSelected}
            />
        </div>
    );
};

export default PromotionManagement;
