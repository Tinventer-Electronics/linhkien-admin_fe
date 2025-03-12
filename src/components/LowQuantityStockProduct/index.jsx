import { Avatar, Button, Card, Typography } from "antd";
import React from "react";

const LowQuantityStockProduct = () => {
  return (
    <div>
      <Card
        title="Những Sản phẩm sắp bán hết"
        extra={
          <Button type="text" className="text-[#0E50E4]">
            Xem hết
          </Button>
        }
      >
        <div className="flex flex-col gap-5">
          <div className="flex items-center">
            <Avatar
              size={60}
              src="https://res.cloudinary.com/dncscl67q/image/upload/v1733130615/cld-sample-4.jpg"
            />
            <div className="mx-5">
              <Typography.Title level={5}>Sản phẩm 1</Typography.Title>
              <Typography.Text>số lượng còn lại: 10</Typography.Text>
            </div>
            <span className="py-2 px-4 rounded-[999px] bg-[#E4350E] ml-auto text-white">
              thấp
            </span>
          </div>

          <div className="flex items-center">
            <Avatar
              size={60}
              src="https://res.cloudinary.com/dncscl67q/image/upload/v1733130615/cld-sample-4.jpg"
            />
            <div className="mx-5">
              <Typography.Title level={5}>Sản phẩm 2</Typography.Title>
              <Typography.Text>số lượng còn lại: 9</Typography.Text>
            </div>
            <span className="py-2 px-4 rounded-[999px] bg-[#E4350E] ml-auto text-white">
              thấp
            </span>
          </div>

          <div className="flex items-center">
            <Avatar
              size={60}
              src="https://res.cloudinary.com/dncscl67q/image/upload/v1733130615/cld-sample-4.jpg"
            />
            <div className="mx-5">
              <Typography.Title level={5}>Sản phẩm 3</Typography.Title>
              <Typography.Text>số lượng còn lại: 8</Typography.Text>
            </div>
            <span className="py-2 px-4 rounded-[999px] bg-[#E4350E] ml-auto text-white">
              thấp
            </span>
          </div>

          <div className="flex items-center">
            <Avatar
              size={60}
              src="https://res.cloudinary.com/dncscl67q/image/upload/v1733130615/cld-sample-4.jpg"
            />
            <div className="mx-5">
              <Typography.Title level={5}>Sản phẩm 4</Typography.Title>
              <Typography.Text>số lượng còn lại: 3</Typography.Text>
            </div>
            <span className="py-2 px-4 rounded-[999px] bg-[#E4350E] ml-auto text-white">
              thấp
            </span>
          </div>

          <div className="flex items-center">
            <Avatar
              size={60}
              src="https://res.cloudinary.com/dncscl67q/image/upload/v1733130615/cld-sample-4.jpg"
            />
            <div className="mx-5">
              <Typography.Title level={5}>Sản phẩm 5</Typography.Title>
              <Typography.Text>số lượng còn lại: 2</Typography.Text>
            </div>
            <span className="py-2 px-4 rounded-[999px] bg-[#E4350E] ml-auto text-white">
              thấp
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LowQuantityStockProduct;
