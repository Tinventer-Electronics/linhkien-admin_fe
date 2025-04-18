import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react';
import './styles.scss';
import handleAPI from '../../../api/handleAPI';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../../redux/reducers/authReducer';
import { localDataNames } from '../../../constants/appInfo';
import { apiEndpoint } from '../../../constants/apiEndpoint';

const Login = () => {
    const [isloading, setIsloading] = useState(false);
    const [form] = useForm();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        setIsloading(true);
        try {
            const res = await handleAPI(apiEndpoint.auth.login, values, 'post');
            if (res.data) {
                message.success('Đăng nhập thành công!!');
                dispatch(addAuth(res.data));
                localStorage.setItem(localDataNames.authData, JSON.stringify(res.data));
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setIsloading(false);
        }
    };

    return (
        <div className="form__login min-h-[100vh] grid grid-rows-1 grid-cols-2">
            <div className='relative before:absolute before:content-[""] before:w-[2px] before:h-3/4 before:bg-[#b22222] before:top-1/2 before:translate-y-[-50%] before:right-[-3px] before:rounded-[999px]'>
                <img
                    src="https://res.cloudinary.com/duc0g3qrs/image/upload/v1744962531/demo/10173532_o9ysnl.jpg"
                    alt="Ảnh đăng nhập"
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="flex items-center justify-center">
                <div className="w-1/2">
                    <h2
                        style={{ textAlign: 'center', marginBottom: '20px' }}
                        className="!font-bold text-[3.3rem]"
                    >
                        Đăng nhập
                    </h2>
                    <Form form={form} layout="vertical" size="large" onFinish={onFinish}>
                        <Form.Item
                            name="email"
                            label="Nhập email:"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ!!',
                                },
                                {
                                    required: true,
                                    message: 'Bạn chưa nhập email!!',
                                },
                            ]}
                        >
                            <Input className="h-[44px]" placeholder="Nhập email" allowClear />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Nhập mật khẩu:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Bạn chưa nhập mật khẩu!!',
                                },
                            ]}
                        >
                            <Input.Password
                                className="h-[44px]"
                                placeholder="Nhập mật khẩu"
                                allowClear
                            />
                        </Form.Item>
                    </Form>
                    <Button
                        className="w-full mt-8 py-6"
                        type="primary"
                        size="large"
                        onClick={() => {
                            form.submit();
                        }}
                        loading={isloading}
                    >
                        Đăng nhập
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
