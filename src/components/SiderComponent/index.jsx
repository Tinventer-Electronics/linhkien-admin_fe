import { Layout, Menu, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { appInfo } from '../../constants/appInfo';
import { items } from './menuItems';
import { useLocation } from 'react-router-dom';

const { Sider } = Layout;
const { Text } = Typography;

const SiderComponent = () => {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState(['']);
    const [openKeys, setOpenKeys] = useState(['']);

    useEffect(() => {
        const pathname = location.pathname;

        // Xác định key dựa trên đường dẫn
        if (pathname === '/' || pathname === '/dashboard') {
            setSelectedKeys(['dashboard']);
            setOpenKeys([]);
        } else if (pathname === '/category') {
            setSelectedKeys(['category']);
            setOpenKeys([]);
        } else if (pathname.includes('/product-management')) {
            setOpenKeys(['product']);

            if (pathname === '/product-management') {
                setSelectedKeys(['product-list']);
            } else if (pathname === '/product-management/add-new-product') {
                setSelectedKeys(['product-add']);
            }
        } else if (pathname === '/supplier') {
            setSelectedKeys(['supplier']);
            setOpenKeys([]);
        } else if (pathname === '/promotion') {
            setSelectedKeys(['promotion']);
            setOpenKeys([]);
        }
    }, [location]);

    const onOpenChange = (keys) => {
        setOpenKeys(keys);
    };

    return (
        <Sider theme="light" width={280} className="h-[100vh] pr-1">
            <div className="flex items-center ml-12 py-4">
                <p className="font-bold text-[2rem] text-[#b22221]">()</p>
                <Text
                    style={{
                        marginLeft: '5px',
                        fontWeight: 'bold',
                        fontSize: '2rem',
                        color: '#b22221',
                    }}
                >
                    {appInfo.title}
                </Text>
            </div>
            <Menu
                mode="inline"
                items={items}
                theme="light"
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
            />
        </Sider>
    );
};

export default SiderComponent;
