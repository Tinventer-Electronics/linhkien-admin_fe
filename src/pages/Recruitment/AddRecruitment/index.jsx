import { Card, DatePicker, Form, Input, message, Typography, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiEndpoint } from '../../../constants/apiEndpoint';
import { Editor } from '@tinymce/tinymce-react';
import { FaPlus } from 'react-icons/fa6';
import { uploadFileImage } from '../../../utils/uploadFile';
import handleAPI from '../../../api/handleAPI';

const { Title } = Typography;

const AddRecruitment = () => {
    const [imageList, setImageList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
    const [pendingUploads, setPendingUploads] = useState([]);
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
            const api = `${apiEndpoint.recruitment.getRecruitmentDetail.replace(':id', id)}`;
            const res = await handleAPI(api);
            const item = res.data;
            if (item) {
                form.setFieldsValue(item);
                setContent(item.descriptions);
                if (item.image && item.image.length > 0) {
                    const image = [...imageList];
                    item.images.forEach((url) =>
                        image.push({
                            uid: `${Math.floor(Math.random() * 100000)}`,
                            name: url,
                            status: 'done',
                            url,
                        })
                    );
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

    const handleImageUpload = async () => {
        if (pendingUploads.length === 0) return;
        const editor = editorRef.current;
        const currentContent = editor.getContent();
        const uploadIdsInContent = [];
        const regex = /data-upload-id="([^"]+)"/g;
        let match;
        while ((match = regex.exec(currentContent)) !== null) {
            uploadIdsInContent.push(match[1]);
        }
        const activeUploads = pendingUploads.filter((item) => uploadIdsInContent.includes(item.id));
        for (const item of activeUploads) {
            try {
                const url = await uploadFileImage(item.file);
                const img = editor.dom.select(`img[data-upload-id="${item.id}"]`)[0];

                if (img) {
                    editor.dom.setAttrib(img, 'src', url);
                    editor.dom.setAttrib(img, 'data-upload-id', null);
                }
            } catch (error) {
                console.error('Upload thất bại', error);
            }
        }
        setPendingUploads([]);
    };

    const handleAddRecruitment = async (values) => {
        try {
            setIsLoading(true);
            handleImageUpload;
            console.log(values);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Title level={4}>{id ? 'Sửa bài tuyển dụng' : 'Thêm mới bài tuyển dụng'}</Title>
            <Form
                form={form}
                size="large"
                layout="vertical"
                onFinish={handleAddRecruitment}
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
                                <Input placeholder="Nhập mức lương" allowClear showCount />
                            </Form.Item>
                            <Form.Item
                                name="startAt"
                                label="Ngày bắt đầu ứng tuyển:"
                                rules={[{ required: true, message: 'Bạn chưa nhập trường này' }]}
                            >
                                <DatePicker className="w-full" format={'HH/MM/YYY'} allowClear />
                            </Form.Item>
                            <Form.Item
                                name="endAt"
                                label="Ngày kết thúc ứng tuyển:"
                                rules={[{ required: true, message: 'Bạn chưa nhập trường này' }]}
                            >
                                <DatePicker className="w-full" format={'HH/MM/YYY'} allowClear />
                            </Form.Item>
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

                                        // Thêm thông tin vào danh sách chờ upload
                                        setPendingUploads((prev) => [
                                            ...prev,
                                            {
                                                id: uploadId,
                                                file,
                                                tempUrl: previewUrl,
                                            },
                                        ]);

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
