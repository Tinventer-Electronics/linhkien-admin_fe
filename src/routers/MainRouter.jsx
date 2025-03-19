import { Affix, Layout } from 'antd'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiderComponent from '../components/SiderComponent'
import HeaderComponent from '../components/HeaderComponent'
import Dashboard from '../pages/Dashboard'
import Category from '../pages/Category'
import ProductManagement from '../pages/ProductManagement'
import AddProduct from '../pages/ProductManagement/AddProduct'

const {Content, Footer} = Layout

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Affix offsetTop={0}>
          <SiderComponent/>
        </Affix>
        <Layout>
          <Affix offsetTop={0}>
            <HeaderComponent/>
          </Affix>
          <Content className='mx-auto p-6 container'>
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/category' element={<Category/>}/>
              <Route>
                <Route path='/product-management' element={<ProductManagement/>}/>
                <Route path='/product-management/add-new-product' element={<AddProduct/>}/>
              </Route>
            </Routes>
          </Content>
        </Layout>
      </Layout> 
    </BrowserRouter>
  )
}

export default MainRouter
