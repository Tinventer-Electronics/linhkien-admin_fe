import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Spin,
  TreeSelect,
  Typography,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useRef, useState } from "react";
import Upload from "antd/es/upload";
import { FaPlus } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const { Title } = Typography;

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  const editorRef = useRef(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [form] = Form.useForm();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (id) {
      getProductDetail(id);
    }
  }, [id]);

  const getData = async () => {};

  const getCategories = async () => {};

  const getProductDetail = async (id) => {};

  const handleChangeUpLoad = ({ fileList: newFileList }) => {
    const items = newFileList.map((file) =>
      file.originFileObj
        ? {
            ...file,
            url: file.originFileObj && URL.createObjectURL(file.originFileObj),
            status: "done",
          }
        : { ...file }
    );
    setFileList(items);
  };

  const handleAddProduct = async (values) => {};

  return (
    <div>
      {isLoading ? (
        <Spin></Spin>
      ) : (
        <div>
          <Title level={4}>{id ? "Sửa sản phẩm" : "Thêm mới sản phẩm"}</Title>
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
                    fileList={fileList}
                    onChange={handleChangeUpLoad}
                  >
                    <FaPlus style={{ marginRight: "5px" }} />
                    Tải lên
                  </Upload>
                </Card>
                <FormItem
                  name="title"
                  label="Tên sản phẩm:"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên sản phẩm." },
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
                    initialValue={content !== "" ? content : ""}
                    init={{
                      plugins: [
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "media",
                        "table",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | link image media | numlist bullist | removeformat",
                      mergetags_list: [
                        { value: "First.Name", title: "First Name" },
                        { value: "Email", title: "Email" },
                      ],
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
                      { required: true, message: "Vui lòng chọn danh mục." },
                    ]}
                  >
                    <TreeSelect
                      treeData={categories}
                      multiple
                      dropdownRender={(menu) => (
                        <>
                          {menu}
                          <Divider className="mb-1" />
                          <div className="text-end w-full">
                            <Button
                              className="m-2"
                              onClick={() => setIsVisibleModalCategory(true)}
                            >
                              Thêm mới
                            </Button>
                          </div>
                        </>
                      )}
                    />
                  </FormItem>
                  <div className="flex justify-between">
                    <FormItem name="cost" label="Nhập giá nhập vào:" rules={[{required: true, message: 'Vui lòng nhập giá nhập vào!!'}]}>
                      <Input type="number" placeholder="Giá nhập vào" />
                    </FormItem>
                    <FormItem name="price" label="Nhập giá bán ra:" rules={[{required: true, message: 'Vui lòng nhập giá bán ra!!'}]}>
                      <Input type="number" placeholder="Giá bán ra" />
                    </FormItem>
                  </div>
                  <FormItem name="productId" label="Nhập mã sản phẩm:">
                    <Input placeholder="Mã sản phẩm" />
                  </FormItem>
                  <FormItem name="productOrigin" label="Nhập xuất xứ sản phẩm:">
                    <Input placeholder="Xuất xứ sản phẩm" />
                  </FormItem>
                  <div className='flex flex-col w-full'>
                    <Typography.Text>Thêm tài liệu:</Typography.Text>
                    <Upload
                      listType="text"
                      fileList={fileList}
                      onChange={handleChangeUpLoad}
                      className="w-full mt-2"
                    >
                      <Button className="w-full">
                        <FaPlus style={{ marginRight: "5px" }} />
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
                    {id ? "Sửa" : "Thêm mới"}
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
        </div>
      )}
    </div>
  );
};

export default AddProduct;
