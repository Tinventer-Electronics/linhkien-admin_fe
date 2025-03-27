import { Layout } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SiderComponent from '../components/SiderComponent';
import HeaderComponent from '../components/HeaderComponent';
import Dashboard from '../pages/Dashboard';
import Category from '../pages/Category';
import ProductManagement from '../pages/ProductManagement';
import AddProduct from '../pages/ProductManagement/AddProduct';
import SupplierManagement from '../pages/SupplierManagement';
import PromotionManagement from '../pages/PromotionManagement';

const { Content } = Layout;

const MainRouter = () => {
    return (
        <Layout>
            <SiderComponent />
            <Layout>
                <HeaderComponent />
                <Content
                    className="overflow-y-auto p-[20px]"
                    style={{ height: 'calc(100vh - 62.5px)' }}
                >
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/product-management">
                            <Route index element={<ProductManagement />} />
                            <Route path="add-new-product" element={<AddProduct />} />
                        </Route>
                        <Route path="/supplier" element={<SupplierManagement />} />
                        <Route path="/promotion" element={<PromotionManagement />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainRouter;
