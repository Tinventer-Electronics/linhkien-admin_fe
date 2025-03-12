import { Affix, Layout } from 'antd'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiderComponent from '../components/SiderComponent'
import HeaderComponent from '../components/HeaderComponent'
import Dashboard from '../pages/Dashboard'

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
          </Routes>
        </Content>
      </Layout>
    </Layout>
      
    </BrowserRouter>
  )
}

export default MainRouter
