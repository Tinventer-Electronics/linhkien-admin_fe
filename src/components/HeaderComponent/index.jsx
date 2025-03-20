import { Avatar, Button, Dropdown, Input, Space } from 'antd';
import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdNotificationsNone } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { removeAuth } from '../../redux/reducers/authReducer';

const HeaderComponent = () => {
    const dispatch = useDispatch();

    const items = [
        {
            key: 'logout',
            label: 'Đăng xuất',
            onClick: () => {
                dispatch(removeAuth());
                localStorage.removeItem('authData');
            },
        },
    ];
    return (
        <div className="p-2 grid grid-cols-2 bg-white">
            <div>
                <Input
                    placeholder="Search product, supplier, order"
                    prefix={<FiSearch />}
                    size="large"
                    style={{
                        borderRadius: 100,
                        width: '70%',
                    }}
                />
            </div>
            <div className="text-end">
                <Space>
                    <Button type="text" icon={<MdNotificationsNone size={30} color="#ccc" />} />
                    <Dropdown menu={{ items }}>
                        <Avatar size={40}>
                            <FaRegUser color="black" />{' '}
                        </Avatar>
                    </Dropdown>
                </Space>
            </div>
        </div>
    );
};

export default HeaderComponent;
