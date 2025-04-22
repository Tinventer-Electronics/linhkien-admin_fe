import { BsBarChartSteps } from 'react-icons/bs';
import { MdOutlineInventory2 } from 'react-icons/md';
import { TiHomeOutline } from 'react-icons/ti';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { RiDiscountPercentLine } from 'react-icons/ri';

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
                label: <Link to={'/product-management/add-new-product'}>Thiết lập sản phẩm</Link>,
            },
        ],
    },
    {
        key: 'supplier',
        label: <Link to={'/supplier'}>Quản lý nhà cung cấp</Link>,
        icon: <FaRegCircleUser size={18} />,
    },
    {
        key: 'promotion',
        label: <Link to={'/promotion'}>Quản lý giảm giá/khuyến mại</Link>,
        icon: <RiDiscountPercentLine size={18} />,
    },
    {
        key: 'recruitment',
        label: 'Quản lý bài tuyển dụng',
        icon: <MdOutlineInventory2 size={18} />,
        children: [
            {
                key: 'recruitment-list',
                label: <Link to={'/recruitment-management'}>Quản lý bài đăng</Link>,
            },
            {
                key: 'recruitment-add',
                label: (
                    <Link to={'/recruitment-management/add-new-recruitment'}>
                        Thiết lập bài đăng
                    </Link>
                ),
            },
        ],
    },
];
