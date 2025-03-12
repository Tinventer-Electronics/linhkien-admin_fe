import { Button, Form, Input, Space, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
import { appInfo } from '../../../constants/appInfo'

const Login = () => {

    const [form] = useForm()

    return (
        <div className='form__login min-h-[100vh] grid grid-rows-1 grid-cols-2 '>
            <div
                className='relative before:absolute before:content-[""] before:w-[6px] before:h-1/2 before:bg-[#ccc] before:top-1/2 before:translate-y-[-50%] before:right-[-3px] before:rounded-[999px]'
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dncscl67q/image/upload/v1733130615/cld-sample-4.jpg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>

            </div>
            <div className='flex items-center justify-center'>
                <div className='w-1/2'>
                    <h2 style={{ textAlign: 'center', marginBottom: '20px', }} className='!font-bold text-[3.3rem]'>Đăng nhập</h2>
                    <Form
                        form={form}
                        layout='vertical'
                        size='large'
                    >
                        <Form.Item name='email' label='Nhập email:' rules={[{ type: 'email', message: 'Email không hợp lệ!!' }, { required: true, message: 'Bạn chưa nhập email!!' }]}>
                            <Input className='h-[44px]' placeholder='Nhập email' allowClear />
                        </Form.Item>
                        <Form.Item name='password' label='Nhập mật khẩu:' rules={[{ required: true, message: 'Bạn chưa nhập mật khẩu!!' }]}>
                            <Input.Password className='h-[44px]' placeholder='Nhập mật khẩu' allowClear />
                        </Form.Item>
                    </Form>
                    <Button
                        className='w-full mt-8 py-6'
                        type='primary'
                        size='large'
                        onClick={() => {
                            form.submit()
                        }}
                    >
                        Đăng nhập
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Login
