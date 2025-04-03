import { Button, Card, Divider, Form, Input, Spin, TreeSelect, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useEffect, useRef, useState } from 'react';
import Upload from 'antd/es/upload';
import { FaPlus } from 'react-icons/fa6';
import { useSearchParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import handleAPI from '../../../api/handleAPI';
import { apiEndpoint } from '../../../constants/apiEndpoint';
import { getTreevaluesMenu } from '../../../utils/getTreevaluesMenu';
import { uploadFile } from '../../../utils/uploadFile';
import { replaceName } from '../../../utils/replaceName';

const { Title } = Typography;

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
    const [pendingUploads, setPendingUploads] = useState([]);
    const editorRef = useRef(null);

    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

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

    const getProductDetail = async () => {};

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

    const handleAddProduct = async (values) => {
        setIsLoading(true);
        try {
            await handleImageUpload();
            const content = editorRef.current.getContent();
            const urlFiles = [];
            if (imageList.length > 0) {
                for (const i of imageList) {
                    const url = await uploadFile(i.originFileObj);
                    if (url) {
                        urlFiles.push(url);
                    }
                }
            }
            const datas = {
                ...values,
                description: content,
                images: urlFiles,
                slug: replaceName(values.productName),
            };
            const res = await handleAPI(apiEndpoint.product.create, datas, 'POST');
            if (res && res.data) {
                alert(res.message);
            }
            form.resetFields();
            setContent('');
            setImageList([]);
            setFileList([]);
            setPendingUploads([]);
            editorRef.current.setContent('');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // đây là hàm upload  ảnh và thay thế trong tinymce lên cloudinary lấy từ tinymce
    const handleImageUpload = async () => {
        if (pendingUploads.length === 0) return;

        // Xử lý từng ảnh trong danh sách chờ
        for (const item of pendingUploads) {
            try {
                const url = await uploadFile(item.file);

                // Tìm và thay thế ảnh dựa vào ID
                const editor = editorRef.current;
                const img = editor.dom.select(`img[data-upload-id="${item.id}"]`)[0];

                if (img) {
                    editor.dom.setAttrib(img, 'src', url);
                    // Xóa attribute data-upload-id sau khi đã thay thế
                    editor.dom.setAttrib(img, 'data-upload-id', null);
                } else {
                    // Fallback: tìm theo URL nếu không tìm thấy theo ID
                    const images = editor.dom.select('img');
                    images.forEach((img) => {
                        if (
                            img.src === item.tempUrl ||
                            (item.tempUrl.startsWith('blob:') && img.src.startsWith('blob:')) ||
                            (item.tempUrl.startsWith('data:') && img.src.startsWith('data:'))
                        ) {
                            editor.dom.setAttrib(img, 'src', url);
                        }
                    });
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
            <Title level={4}>{id ? 'Sửa sản phẩm' : 'Thêm mới sản phẩm'}</Title>
            <Form
                form={form}
                size="large"
                layout="vertical"
                onFinish={handleAddProduct}
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
                            <div className="flex gap-6 justify-between">
                                <FormItem
                                    name="cost"
                                    label="Nhập giá nhập vào:"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập giá nhập vào!!',
                                        },
                                    ]}
                                >
                                    <Input type="number" placeholder="Giá nhập vào" />
                                </FormItem>
                                <FormItem
                                    name="price"
                                    label="Nhập giá bán ra:"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập giá bán ra!!',
                                        },
                                    ]}
                                >
                                    <Input type="number" placeholder="Giá bán ra" />
                                </FormItem>
                            </div>
                            <FormItem name="code" label="Nhập mã sản phẩm:">
                                <Input placeholder="Mã sản phẩm" />
                            </FormItem>
                            <FormItem name="productOrigin" label="Nhập xuất xứ sản phẩm:">
                                <Input placeholder="Xuất xứ sản phẩm" />
                            </FormItem>
                            <div className="flex flex-col w-full">
                                <Typography.Text>Thêm tài liệu:</Typography.Text>
                                <Upload
                                    listType="text"
                                    fileList={fileList}
                                    onChange={handleChangeUpLoad}
                                    className="w-full mt-2"
                                >
                                    <Button className="w-full">
                                        <FaPlus style={{ marginRight: '5px' }} />
                                        Tải file
                                    </Button>
                                </Upload>
                            </div>
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
