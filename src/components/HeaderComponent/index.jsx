import { Avatar, Button, Dropdown, Input, Space } from 'antd';
import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdNotificationsNone } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { removeAuth } from '../../redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
// import handleAPI from '../../api/handleApi';
// import { apiEndpoint } from '../../constants/apiEndpoint';
// import { useSelector } from 'react-redux';
// import { authSelector, refreshToken } from '../../redux/reducers/authReducer';

const HeaderComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const auth = useSelector(authSelector);
    const logout = () => {
        dispatch(removeAuth());
        localStorage.removeItem('authData');
        navigate('/');
    };

    // const getProducts = async () => {
    //     try {
    //         const res = await handleAPI(apiEndpoint.product.getAll);
    //         console.log(res);
    //     } catch (error) {
    //         console.log(error);
    //         if (error.error === 'jwt expired') {
    //             handleRefreshToken();
    //         }
    //     }
    // };

    // const handleRefreshToken = async () => {
    //     try {
    //         const res = await handleAPI(`${apiEndpoint.auth.refreshToken}?id=${auth._id}`);
    //         dispatch(refreshToken(res.data.token));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const items = [
        {
            key: 'logout',
            label: 'Đăng xuất',
            onClick: logout,
        },
    ];

    return (
        <div className="py-4 px-8 grid grid-cols-2 bg-white">
            <Input
                placeholder="Tìm kiếm sản phẩm, nhà cung cấp..."
                prefix={<FiSearch />}
                size="large"
                style={{
                    borderRadius: 100,
                    width: '70%',
                }}
            />

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
