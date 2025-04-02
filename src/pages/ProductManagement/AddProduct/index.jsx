import { Button, Card, Divider, Form, Input, Spin, TreeSelect, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useEffect, useRef, useState } from 'react';
import Upload from 'antd/es/upload';
import { FaPlus } from 'react-icons/fa6';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import handleAPI from '../../../api/handleAPI';
import { apiEndpoint } from '../../../constants/apiEndpoint';
import { getTreevaluesMenu } from '../../../utils/getTreevaluesMenu';
import { uploadFile } from '../../../utils/uploadFile';

const { Title } = Typography;

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [tempUrl, setTempUrl] = useState(null);

    const editorRef = useRef(null);

    const navigate = useNavigate();
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
        setIsLoading(true);
        try {
            const res = await handleAPI(apiEndpoint.category.getAll);
            const categoriesData = getTreevaluesMenu(res.data, false);
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getProductDetail = async (id) => {};

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
        console.log('values', { ...values, description: content, images: urlFiles });
    };

    // đây là hàm upload  ảnh và thay thế trong tinymce lên cloudinary lấy từ tinymce
    const handleImageUpload = async () => {
        if (!selectedFile || !tempUrl) return;
        try {
            const url = await uploadFile(selectedFile);

            // Sử dụng API TinyMCE trực tiếp để tìm và thay thế ảnh
            const editor = editorRef.current;
            const images = editor.dom.select('img');

            // Tìm tất cả ảnh trong nội dung và thay thế nếu có src giống tempUrl
            let imageReplaced = false;
            images.forEach((img) => {
                // Kiểm tra nếu src bắt đầu bằng "data:" (base64) hoặc blob URL
                if (
                    img.src === tempUrl ||
                    (tempUrl.startsWith('blob:') && img.src.startsWith('blob:')) ||
                    (tempUrl.startsWith('data:') && img.src.startsWith('data:'))
                ) {
                    editor.dom.setAttrib(img, 'src', url);
                    imageReplaced = true;
                }
            });

            if (!imageReplaced) {
                console.warn('Không tìm thấy ảnh cần thay thế');
            }

            // Reset state
            setSelectedFile(null);
        } catch (error) {
            console.error('Upload thất bại', error);
        }
    };

    return (
        <>
            {isLoading ? (
                <Spin></Spin>
            ) : (
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
                                    >
                                        <FaPlus style={{ marginRight: '5px' }} />
                                        Tải lên
                                    </Upload>
                                </Card>
                                <FormItem
                                    name="productName"
                                    label="Tên sản phẩm:"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập tên sản phẩm.' },
                                    ]}
                                >
                                    <Input
                                        placeholder="Nhập tên sản phẩm"
                                        allowClear
                                        maxLength={150}
                                        showCount
                                    />
                                </FormItem>
                                <div>
                                    <Typography.Text>Nhập nội dung:</Typography.Text>
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
                                            forced_root_block: 'div',
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
                                                        const previewUrl =
                                                            URL.createObjectURL(file);
                                                        setSelectedFile(file);
                                                        setTempUrl(previewUrl);
                                                        editorRef.current.insertContent(
                                                            `<img src="${previewUrl}" />`
                                                        );
                                                    };
                                                    input.click();
                                                }
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-span-5">
                                <Card>
                                    <FormItem
                                        name="categories"
                                        label="Chọn danh mục:"
                                        rules={[
                                            { required: true, message: 'Vui lòng chọn danh mục.' },
                                        ]}
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
            )}
        </>
    );
};

export default AddProduct;
