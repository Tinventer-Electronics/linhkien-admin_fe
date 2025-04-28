import { Button, message, Modal, Space, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { VND } from '../../utils/handleCurrency';
import { MdDeleteForever, MdEditSquare } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { apiEndpoint } from '../../constants/apiEndpoint';
import handleAPI from '../../api/handleAPI';
import { formatDate } from '../../utils/formatDate';

const { Title } = Typography;
const { confirm } = Modal;

const Recruitment = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [recruitment, setRecruitment] = useState([]);

    const navigate = useNavigate();

    const columns = [
        {
            key: 'title',
            dataIndex: 'title',
            title: 'Tiêu đề bài đăng',
            width: 450,
        },
        {
            key: 'salary',
            dataIndex: 'salary',
            title: 'Mức lương',
            width: 150,
            render: (salary) => VND.format(salary),
        },
        {
            key: 'startAt',
            dataIndex: 'startAt',
            title: 'Ngày bắt đầu',
            width: 150,
            render: (date) => formatDate(date).split(' ')[1],
        },
        {
            key: 'endAt',
            dataIndex: 'endAt',
            title: 'Ngày kết thúc',
            width: 150,
            render: (date) => formatDate(date).split(' ')[1],
        },
        {
            key: 'action',
            title: 'Lựa chọn',
            align: 'center',
            fixed: 'right',
            dataIndex: '',
            width: 150,
            render: (recruitment) => (
                <Space>
                    <Button
                        type="link"
                        icon={<MdEditSquare size={20} color="#3b82f6" />}
                        onClick={() => {
                            navigate(
                                `/recruitment-management/add-new-recruitment?id=${recruitment._id}`
                            );
                        }}
                    />
                    <Button
                        type="link"
                        icon={<MdDeleteForever size={20} color="#ef4444" />}
                        onClick={() => {
                            confirm({
                                title: 'Xác nhận',
                                content: 'Bạn có chắc muốn xóa bài viết này không ?',
                                onOk: () => {
                                    handleDeleteRecruitment(recruitment._id);
                                },
                            });
                        }}
                    />
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getAllRecruitment();
    }, []);

    const getAllRecruitment = async () => {
        try {
            setIsLoading(true);
            const api = apiEndpoint.recruitment.getAll;
            const res = await handleAPI(api);
            res.data && setRecruitment(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteRecruitment = async (id) => {
        try {
            setIsLoading(true);
            const api = `${apiEndpoint.recruitment.delete.replace(':id', id)}`;
            await handleAPI(api, null, 'delete');
            messageApi.success('Xóa bài viết thành công');
            getAllRecruitment();
        } catch (error) {
            messageApi.error(error.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {contextHolder}
            <Table
                loading={isLoading}
                dataSource={recruitment}
                rowKey={'_id'}
                bordered
                columns={columns}
                scroll={{
                    x: '100%',
                }}
                title={() => (
                    <div className="grid grid-cols-2">
                        <div>
                            <Title level={4}>Bảng sản phẩm</Title>
                        </div>
                        <div className="text-right">
                            <Button type="primary" size="large">
                                <Link to="/recruitment-management/add-new-recruitment">
                                    Thêm mới
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default Recruitment;
