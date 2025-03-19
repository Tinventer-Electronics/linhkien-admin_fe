import { Layout, Menu, Typography } from 'antd'
import React from 'react'
import { TiHomeOutline } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { appInfo } from '../../constants/appInfo'
import { BsBarChartSteps } from 'react-icons/bs';
import { MdOutlineInventory2 } from "react-icons/md";

const { Sider } = Layout
const { Text } = Typography

const SiderComponent = () => {
    const items = [
        {
            key: 'dashboard',
            label: <Link to={'/dashboard'}>Trang chủ</Link>,
            icon: <TiHomeOutline size={18} />
        },
        {
            key: 'category',
            label: <Link to={'/category'}>Danh mục</Link>,
            icon: <BsBarChartSteps size={18}/>
        },
        {
            key: 'product',
            label: <Link to={'/product-management'}>Quản lý sản phẩm</Link>,
            icon: <MdOutlineInventory2 size={18} />,
            children: [
                {
                    key: '',
                    label: <Link to={'/product-management'}>Bảng sản phẩm</Link>
                },
                {
                    key: 'inventory',
                    label: <Link to={'/product-management/add-new-product'}>Thêm sản phẩm</Link>
                }
            ]
        },
    ]
    return (
        <Sider theme='light' width={300} className='h-[100vh] p-2'>
            <div className='flex items-center pl-5'>
                <img src='https://res.cloudinary.com/dncscl67q/image/upload/v1733130615/cld-sample-4.jpg' alt="Logo" width={28} />
                <Text style={{ marginLeft: '5px', fontWeight: 'bold', fontSize: '2rem'}}>{appInfo.title}</Text>
            </div>
            <Menu mode='inline' items={items} theme='light' />
        </Sider>
    )
}

export default SiderComponent
