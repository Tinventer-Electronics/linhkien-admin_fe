import { Button, Card, DatePicker, Form, Input, message, Typography, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiEndpoint } from '../../../constants/apiEndpoint';
import { Editor } from '@tinymce/tinymce-react';
import { FaPlus } from 'react-icons/fa6';
import handleAPI from '../../../api/handleAPI';
import { replaceName } from '../../../utils/replaceName';
import dayjs from 'dayjs';

const { Title } = Typography;

const AddRecruitment = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [imageList, setImageList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
    const editorRef = useRef(null);

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            getRecruitmentDetail(id);
        }
    }, [id]);

    const getRecruitmentDetail = async (id) => {
        try {
            const api = `${apiEndpoint.recruitment.getById.replace(':id', id)}`;
            const res = await handleAPI(api);
            const item = res.data;
            if (item) {
                form.setFieldsValue({
                    ...item,
                    startAt: dayjs(item.startAt),
                    endAt: dayjs(item.endAt),
                });
                setContent(item.content);
                if (item.image) {
                    const image = [];
                    image.push({
                        uid: `${Math.floor(Math.random() * 100000)}`,
                        name: item.image,
                        status: 'done',
                        url: item.image,
                    });
                    setImageList(image);
                }
            }
        } catch (error) {
            message.error(error.message);
            console.log(error);
        }
    };

    const handleChangeUpLoad = ({ fileList: newFileList }) => {
        const items = newFileList.map((file) =>
            file.originFileObj
                ? {
                      ...file,
                      url: file.originFileObj && URL.createObjectURL(file.originFileObj),
                      status: 'done',
                  }
                : { ...file }
        );
        setImageList(items);
    };

    const handleAddRecruitment = async (values) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('startAt', values.startAt);
            formData.append('endAt', values.endAt);
            formData.append('salary', values.salary);
            imageList.length > 0 &&
            imageList[0].originFileObj &&
            Object.keys(imageList[0].originFileObj).length > 0
                ? formData.append('image', imageList[0].originFileObj)
                : formData.append('image', '');

            formData.append('slug', replaceName(values.title));
            const editor = editorRef.current;
            const content = editor.getContent();
            formData.append('content', content);
            const api = apiEndpoint.recruitment.create;
            const res = await handleAPI(api, formData, 'post');
            messageApi.success(res.message);
            form.resetFields();
            setImageList([]);
            if (editorRef.current) {
                editorRef.current.setContent('');
            }
            setContent('');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateRecruiment = async (values) => {
        setIsLoading(true);
        const editor = editorRef.current;
        const content = editor.getContent();
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('startAt', values.startAt);
            formData.append('endAt', values.endAt);
            formData.append('salary', values.salary);
            formData.append('slug', replaceName(values.title));
            formData.append('content', content);
            imageList.length > 0 &&
            imageList[0].originFileObj &&
            Object.keys(imageList[0].originFileObj).length > 0
                ? formData.append('image', imageList[0].originFileObj)
                : formData.append('image', imageList[0].url);
            const res = await handleAPI(
                apiEndpoint.recruitment.update.replace(':id', id),
                formData,
                'put'
            );
            message.success(res.message);
            form.resetFields();
            setImageList([]);
            setContent('');
        } catch (error) {
            message.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {contextHolder}
            <Title level={4}>{id ? 'Sửa bài tuyển dụng' : 'Thêm mới bài tuyển dụng'}</Title>
            <Form
                form={form}
                size="large"
                layout="vertical"
                onFinish={id ? handleUpdateRecruiment : handleAddRecruitment}
                disabled={isLoading}
            >
                <div className="grid grid-cols-12 gap-10 mt-5">
                    <div className="col-span-6">
                        <Card className="mb-10" title="Chọn ảnh sản phẩm">
                            <Upload
                                className="mb-14"
                                listType="picture-card"
                                fileList={imageList}
                                onChange={handleChangeUpLoad}
                                maxCount={1}
                                beforeUpload={() => false}
                                showUploadList={{ showRemoveIcon: true }}
                            >
                                {imageList.length >= 1 ? null : (
                                    <>
                                        <FaPlus style={{ marginRight: '5px' }} />
                                        Tải lên
                                    </>
                                )}
                            </Upload>
                            <Form.Item
                                name="title"
                                label="Tiêu đề bài tuyển dụng:"
                                rules={[{ required: true, message: 'Bạn chưa nhập tiêu đề' }]}
                            >
                                <Input
                                    placeholder="Nhập tên sản phẩm"
                                    allowClear
                                    maxLength={150}
                                    showCount
                                />
                            </Form.Item>
                        </Card>
                    </div>
                    <div className="col-span-6">
                        <Card>
                            <Form.Item
                                name="salary"
                                label="Mức lương:"
                                rules={[{ required: true, message: 'Bạn chưa nhập trường này' }]}
                            >
                                <Input type="number" placeholder="Nhập mức lương" allowClear />
                            </Form.Item>
                            <Form.Item
                                name="startAt"
                                label="Ngày bắt đầu ứng tuyển:"
                                rules={[{ required: true, message: 'Bạn chưa nhập trường này' }]}
                            >
                                <DatePicker
                                    className="w-full"
                                    format={'DD/MM/YYYY'}
                                    placeholder="Chọn ngày"
                                    allowClear
                                />
                            </Form.Item>
                            <Form.Item
                                name="endAt"
                                label="Ngày kết thúc ứng tuyển:"
                                rules={[{ required: true, message: 'Bạn chưa nhập trường này' }]}
                            >
                                <DatePicker
                                    className="w-full"
                                    format={'DD/MM/YYYY'}
                                    placeholder="Chọn ngày"
                                    allowClear
                                />
                            </Form.Item>

                            <div className="text-end">
                                <Button
                                    loading={isLoading}
                                    onClick={() => form.submit()}
                                    type="primary"
                                >
                                    {id ? 'Sửa bài viết' : 'Đăng bài'}
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
                <div>
                    <label className="mb-3 block">Nhập nội dung:</label>
                    <Editor
                        disabled={isLoading}
                        apiKey="coe6w4dimiz7zarp3pxo9vcu389puehn385e39rkz6ywuv32"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={content !== '' ? content : ''}
                        init={{
                            language: 'vi',
                            plugins: [
                                'autolink',
                                'lists',
                                'link',
                                'image',
                                'media',
                                'table',
                                'wordcount',
                                'preview',
                            ],
                            forced_root_block: 'p',
                            toolbar:
                                'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | link image media | numlist bullist | preview | removeformat',
                            mergetags_list: [
                                { value: 'First.Name', title: 'First Name' },
                                { value: 'Email', title: 'Email' },
                            ],
                            file_picker_callback: (callback, value, meta) => {
                                if (meta.filetype === 'image') {
                                    const input = document.createElement('input');
                                    input.setAttribute('type', 'file');
                                    input.setAttribute('accept', 'image/*');
                                    input.onchange = () => {
                                        const file = input.files?.[0];
                                        if (!file) return;

                                        // Tạo ID duy nhất cho mỗi ảnh
                                        const uploadId = Date.now().toString();
                                        const previewUrl = URL.createObjectURL(file);

                                        // Chèn ảnh với ID để dễ tìm lại sau này
                                        editorRef.current.insertContent(
                                            `<img src="${previewUrl}" data-upload-id="${uploadId}" />`
                                        );
                                    };
                                    input.click();
                                }
                            },
                        }}
                    />
                </div>
            </Form>
        </div>
    );
};

export default AddRecruitment;
