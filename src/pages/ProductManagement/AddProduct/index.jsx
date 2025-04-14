import { Button, Card, Divider, Form, Input, message, Spin, TreeSelect, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useEffect, useRef, useState } from 'react';
import Upload from 'antd/es/upload';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import handleAPI from '../../../api/handleAPI';
import { apiEndpoint } from '../../../constants/apiEndpoint';
import { getTreevaluesMenu } from '../../../utils/getTreevaluesMenu';
import { uploadFileImage } from '../../../utils/uploadFile';
import { replaceName } from '../../../utils/replaceName';
import { findSlugsByIdsInTreeCategories } from '../../../utils/findSlugsByIdsInTreeCategories';
import { processFormData } from '../../../utils/formDataProcessor';

const { Title } = Typography;

const AddProduct = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [categories, setCategories] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
    const [pendingUploads, setPendingUploads] = useState([]);
    const editorRef = useRef(null);

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const navigate = useNavigate();

    const [form] = Form.useForm();

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        if (id) {
            getProductDetail(id);
        }
    }, [id]);

    const getCategories = async () => {
        try {
            const res = await handleAPI(apiEndpoint.category.getAll);
            const categoriesData = getTreevaluesMenu(res.data, false);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const getProductDetail = async (id) => {
        try {
            const api = `${apiEndpoint.product.getProductDetail.replace(':id', id)}`;
            const res = await handleAPI(api);
            const item = res.data;
            if (item) {
                form.setFieldsValue(item);
                setContent(item.descriptions);
                if (item.images && item.images.length > 0) {
                    const images = [...fileList];
                    item.images.forEach((url) =>
                        images.push({
                            uid: `${Math.floor(Math.random() * 100000)}`,
                            name: url,
                            status: 'done',
                            url,
                        })
                    );
                    setImageList(images);
                }
            }
        } catch (error) {
            message.error(error.message);
            console.log(error);
        }
    };

    //đây là hàm upload để xem trước ảnh
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

    // hàm thêm sản phẩm
    const handleAddProduct = async (values) => {
        setIsLoading(true);
        try {
            await handleImageUpload();
            const content = editorRef.current.getContent();
            const urlFiles = [];
            if (imageList.length > 0) {
                for (const i of imageList) {
                    const url = await uploadFileImage(i.originFileObj);
                    if (url) {
                        urlFiles.push(url);
                    }
                }
            }
            let datas = {
                ...values,
                descriptions: content,
                images: urlFiles,
                slug: replaceName(`${values.productName}`),
                categories: findSlugsByIdsInTreeCategories(categories, values.categories),
            };
            datas = processFormData(datas, ['code', 'productOrigin']);
            console.log(datas);
            const res = await handleAPI(apiEndpoint.product.create, datas, 'POST');
            if (res && res.data) {
                messageApi.success(res.message);
            }
            form.resetFields();
            setContent('');
            setImageList([]);
            setFileList([]);
            setPendingUploads([]);
            editorRef.current.setContent('');
        } catch (error) {
            messageApi.error(error.message);
            form.resetFields();
            setContent('');
            setImageList([]);
            setFileList([]);
            setPendingUploads([]);
            editorRef.current.setContent('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateProduct = async (values) => {
        setIsLoading(true);
        try {
            await handleImageUpload();
            const content = editorRef.current.getContent();
            const urlFiles = [];
            if (imageList.length > 0) {
                for (const i of imageList) {
                    const url = await uploadFileImage(i.originFileObj);
                    if (url) {
                        urlFiles.push(url);
                    } else {
                        urlFiles.push(i.url);
                    }
                }
            }
            let datas = {
                ...values,
                descriptions: content,
                images: urlFiles,
                slug: replaceName(`${values.productName}`),
                categories: findSlugsByIdsInTreeCategories(categories, values.categories),
                code: values.code.toUpperCase(),
                productOrigin: values.productOrigin.toUpperCase(),
            };
            const res = await handleAPI(
                apiEndpoint.product.update.replace(':id', id),
                datas,
                'put'
            );
            if (res && res.data) {
                console.log(res);
                messageApi.success(res.message);
            }
            form.resetFields();
            setContent('');
            setImageList([]);
            setFileList([]);
            setPendingUploads([]);
            editorRef.current.setContent('');
            navigate('/product-management');
        } catch (error) {
            messageApi.error(error.message);
            form.resetFields();
            setContent('');
            setImageList([]);
            setFileList([]);
            setPendingUploads([]);
            editorRef.current.setContent('');
        } finally {
            setIsLoading(false);
        }
    };

    // đây là hàm upload  ảnh và thay thế trong tinymce lên cloudinary lấy từ tinymce
    const handleImageUpload = async () => {
        if (pendingUploads.length === 0) return;
        // Lấy nội dung hiện tại của trình soạn thảo
        const editor = editorRef.current;
        const currentContent = editor.getContent();
        // Tìm tất cả ID của ảnh vẫn còn trong nội dung
        const uploadIdsInContent = [];
        const regex = /data-upload-id="([^"]+)"/g;
        let match;
        while ((match = regex.exec(currentContent)) !== null) {
            uploadIdsInContent.push(match[1]);
        }
        // Lọc danh sách chờ upload để chỉ bao gồm những ảnh vẫn còn trong nội dung
        const activeUploads = pendingUploads.filter((item) => uploadIdsInContent.includes(item.id));
        // Tiến hành tải lên chỉ những ảnh còn lại
        for (const item of activeUploads) {
            try {
                const url = await uploadFileImage(item.file);
                // Tìm và thay thế ảnh dựa vào ID
                const img = editor.dom.select(`img[data-upload-id="${item.id}"]`)[0];

                if (img) {
                    editor.dom.setAttrib(img, 'src', url);
                    // Xóa attribute data-upload-id sau khi đã thay thế
                    editor.dom.setAttrib(img, 'data-upload-id', null);
                }
            } catch (error) {
                console.error('Upload thất bại', error);
            }
        }
        // Reset state sau khi hoàn thành
        setPendingUploads([]);
    };

    return (
        <>
            {contextHolder}
            <Title level={4}>{id ? 'Sửa sản phẩm' : 'Thêm mới sản phẩm'}</Title>
            <Form
                form={form}
                size="large"
                layout="vertical"
                onFinish={id ? handleUpdateProduct : handleAddProduct}
                disabled={isLoading}
            >
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-7">
                        <Card className="mb-10" title="Chọn ảnh sản phẩm">
                            <Upload
                                listType="picture-card"
                                fileList={imageList}
                                onChange={handleChangeUpLoad}
                                multiple
                                beforeUpload={() => false}
                            >
                                <FaPlus style={{ marginRight: '5px' }} />
                                Tải lên
                            </Upload>
                        </Card>
                        <FormItem
                            name="productName"
                            label="Tên sản phẩm:"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm.' }]}
                        >
                            <Input
                                placeholder="Nhập tên sản phẩm"
                                allowClear
                                maxLength={150}
                                showCount
                            />
                        </FormItem>
                        <>
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
                        </>
                    </div>
                    <div className="col-span-5">
                        <Card>
                            <FormItem
                                name="code"
                                label="Mã sản phẩm:"
                                rules={[{ message: 'Vui lòng nhập mã sản phẩm!!', required: true }]}
                            >
                                <Input placeholder="Nhập mã sản phẩm" />
                            </FormItem>
                            <FormItem
                                name="categories"
                                label="Chọn danh mục:"
                                rules={[{ required: true, message: 'Vui lòng chọn danh mục.' }]}
                            >
                                <TreeSelect
                                    treeData={categories}
                                    multiple
                                    // dropdownRender={(menu) => (
                                    //     <>
                                    //         {menu}
                                    //         <Divider className="mb-1" />
                                    //         <div className="text-end w-full">
                                    //             <Button
                                    //                 className="m-2"
                                    //                 onClick={() =>
                                    //                     setIsVisibleModalCategory(true)
                                    //                 }
                                    //             >
                                    //                 Thêm mới
                                    //             </Button>
                                    //         </div>
                                    //     </>
                                    // )}
                                />
                            </FormItem>
                            <FormItem
                                name="productOrigin"
                                label="Xuất xứ sản phẩm:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập xuất xứ!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập xuất xứ sản phẩm" />
                            </FormItem>
                            <FormItem name="supplier" label="Nhà cung cấp:">
                                <Input placeholder="Nhập nhà cung cấp" />
                            </FormItem>
                            <div className="flex gap-6 justify-between">
                                <FormItem
                                    name="cost"
                                    label="Giá nhập vào:"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập giá nhập vào!',
                                        },
                                    ]}
                                >
                                    <Input type="number" placeholder=" Nhập giá nhập vào" />
                                </FormItem>
                                <FormItem
                                    name="price"
                                    label="Giá bán ra:"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập giá bán ra!',
                                        },
                                    ]}
                                >
                                    <Input type="number" placeholder="Nhập giá bán ra" />
                                </FormItem>
                            </div>
                            <FormItem name="promotion" label="Khuyến mại:">
                                <Input placeholder="Nhập khuyến mại" />
                            </FormItem>
                            <FormItem name="quantity" label="Số lượng:">
                                <Input type="number" placeholder="Nhập số lượng" />
                            </FormItem>
                        </Card>
                        <Card className="mt-5 text-end">
                            <Button
                                loading={isLoading}
                                type="primary"
                                onClick={() => form.submit()}
                            >
                                {id ? 'Sửa' : 'Thêm mới'}
                            </Button>
                        </Card>
                    </div>
                </div>

                {/* <ModalCategoty
                            visible={isVisibleModalCategory}
                            onClose={() => setIsVisibleModalCategory(false)}
                            values={categories}
                            onAddNew={async () => await getCategories()}
                        /> */}
            </Form>
        </>
    );
};

export default AddProduct;
