import { BsBarChartSteps } from 'react-icons/bs';
import { MdOutlineInventory2 } from 'react-icons/md';
import { TiHomeOutline } from 'react-icons/ti';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export const items = [
    {
        key: 'dashboard',
        label: <Link to={'/'}>Trang chủ</Link>,
        icon: <TiHomeOutline size={18} />,
    },
    {
        key: 'category',
        label: <Link to={'/category'}>Danh mục</Link>,
        icon: <BsBarChartSteps size={18} />,
    },
    {
        key: 'product',
        label: 'Quản lý sản phẩm',
        icon: <MdOutlineInventory2 size={18} />,
        children: [
            {
                key: 'product-list',
                label: <Link to={'/product-management'}>Bảng sản phẩm</Link>,
            },
            {
                key: 'product-add',
                label: <Link to={'/product-management/add-new-product'}>Thêm sản phẩm</Link>,
            },
        ],
    },
    {
        key: 'supplier',
        label: <Link to={'/supplier'}>Quản lý nhà cung cấp</Link>,
        icon: <FaRegCircleUser size={18} />,
    },
];
