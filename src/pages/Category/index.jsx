import { Button, Card, Form, Input, message, Modal, Space, Table, TreeSelect, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import FormItem from 'antd/es/form/FormItem'
import React, { useEffect, useState } from 'react'
// import handleAPI from '../api/handleAPI'
// import { CategoryModel, TreeData } from '../models/CategoryModel'
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import ModalCategory from './ModalCategory';
import { getTreevaluesMenu } from '../../utils/getTreevaluesMenu';
// import { replaceName } from '../utils/repalceName'
// import { getTreevalues } from '../utils/getTreevaluesMenu'

const { Title } = Typography
const { confirm } = Modal

const Category = () => {
    const [categories, setCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState()
    const [treeValues, setTreeValues] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(10)
    const [isLoading, setIsLoading] = useState(false)

    const [form] = useForm()

    const dataTest = [
        {
            _id: "1",
            title: "tesst 1",
            description: "abc",
            parentId: ""
        },
        {
            _id: "2",
            title: "tesst 2",
            description: "abc",
            parentId: ""
        },
        {
            _id: "3",
            title: "tesst 3",
            description: "abc",
            parentId: "2"
        },
        {
            _id: "4",
            title: "tesst 4",
            description: "abc",
            parentId: "3"
        },
        {
            _id: "5",
            title: "tesst 5",
            description: "abc",
            parentId: "3"
        }
    ]

    const columns = [
        {
            key: 'title',
            dataIndex: 'title',
            title: 'Tên danh mục'
        },
        {
            key: 'description',
            dataIndex: 'description',
            title: 'Mô tả'
        },
        {
            key: 'action',
            dataIndex: '',
            title: 'Lựa chọn',
            align: 'center',
            width: 150,
            fixed: 'right',
            render: (category) => <Space>
                <Button
                    type='link'
                    color='default'
                    icon={<MdEditSquare size={20} className='!text-blue-500' />}
                    onClick={() =>
                        setCategorySelected(category)
                    }
                />
                <Button
                    type='link'
                    color='default'
                    icon={<MdDeleteForever size={20} className='!text-red-500' />}
                    onClick={() =>
                        confirm({
                            title: 'Xác nhận',
                            content: 'Bạn có chắc muốn xóa danh mục này ?',
                            onOk: () => {
                                handleDeleteCategory(category._id)
                                getCategories()
                            },
                        })
                    }
                />
            </Space>
        }
    ]

    useEffect(() => {
        if (categorySelected) {
            form.setFieldsValue(categorySelected)
        }
    }, [categorySelected])

    useEffect(() => {
        getCategories()
    }, [page, pageSize])

    useEffect(() => {
        getTreeValueCategory()
    }, [])

    const getCategories = async () => {
        const treeValue = getTreevaluesMenu(dataTest, true)
        setCategories(treeValue)
    }

    const getTreeValueCategory = async () => {
        const treeValue = getTreevaluesMenu(dataTest, false)
        setTreeValues(treeValue)
    }

    const handleAddCategory = async (values) => {
        console.log(values)
        setIsLoading(true)
        const data = {}
        for(const i in values) {
            data[i] = values[i] ?? ""
        }
        data._id = dataTest.length + 1
        try {
            dataTest.push(data)
            getCategories()
            getTreeValueCategory()
            message.success("Thêm danh mục mới thành công")
            form.resetFields()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateCategory = async (values) => {
        
    }

    const handleDeleteCategory = async (id) => {

    }

    return (
        <div>
            <div className='grid grid-cols-12 gap-8'>
                <div className='col-span-4'>
                    <Card title={categorySelected ? 'Sửa danh mục' : 'Thêm mới danh mục'}>
                        <Form
                            onFinish={categorySelected ? handleUpdateCategory : handleAddCategory}
                            form={form}
                            layout='vertical'
                            size='large'>
                            <FormItem name='parentId' label='Chọn danh mục'>
                                <TreeSelect treeData={treeValues} allowClear treeDefaultExpandAll placeholder='Chọn danh mục' />
                            </FormItem>
                            <FormItem name='title' label='Tên danh mục' rules={[{ required: true, message: 'Vui lòng nhập tên danh mục.' }]}>
                                <Input allowClear placeholder='Nhập tên danh mục' />
                            </FormItem>
                            <FormItem name='description' label='Mô tả'>
                                <Input.TextArea cols={4} allowClear />
                            </FormItem>
                            <div className='flex justify-end'>
                                <Space>
                                    <Button onClick={() => {
                                        setCategorySelected(undefined)
                                        form.resetFields()
                                    }}
                                    >
                                        Làm mới
                                    </Button>
                                    <Button
                                        loading={isLoading}
                                        type='primary'
                                        disabled={categorySelected ? false : true}
                                        onClick={() => form.submit()}
                                    >
                                        Sửa
                                    </Button>
                                    <Button
                                        loading={isLoading}
                                        type='primary'
                                        disabled={categorySelected ? true : false}
                                        onClick={() => form.submit()}
                                    >
                                        Thêm mới
                                    </Button>
                                </Space>
                            </div>
                        </Form>
                    </Card>
                </div>

                <div className='col-span-8'>
                    <Table
                        loading={isLoading}
                        bordered
                        columns={columns}
                        dataSource={categories}
                        pagination={{
                            showSizeChanger: true,
                            onShowSizeChange(current, size) {
                                setPageSize(size)
                            },
                            total,
                            onChange(page, pageSize) {
                                setPage(page)
                            },
                        }}
                        scroll={{
                            y: 'calc(100vh - 300px)'
                        }}
                        title={() => (
                            <div>
                                <Title style={{ margin: '0' }} level={5}>Bảng danh mục</Title>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default Category

