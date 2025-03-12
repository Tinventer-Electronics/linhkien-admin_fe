import { Button, Card, Table } from "antd";
import React from "react";

const TopSellingProduct = () => {
  const data = [
    {
      index: 1,
      name: "sanpham1",
      soluongban: 200,
      soluongcon: 100,
      gia: 10000000,
    },
    {
      index: 2,
      name: "sanpham2",
      soluongban: 200,
      soluongcon: 100,
      gia: 10000000,
    },
    {
      index: 3,
      name: "sanpham3",
      soluongban: 200,
      soluongcon: 100,
      gia: 10000000,
    },
    {
      index: 4,
      name: "sanpham4",
      soluongban: 200,
      soluongcon: 100,
      gia: 10000000,
    },
    {
      index: 5,
      name: "sanpham5",
      soluongban: 200,
      soluongcon: 100,
      gia: 10000000,
    },
  ];

  const columns = [
    {
      key: "index",
      title: "#",
      dataIndex: "index",
      align: "center",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Tên",
    },
    {
      key: "sold",
      dataIndex: "soluongban",
      title: "Số lượng bán",
    },
    {
      key: "Remaining",
      dataIndex: "soluongcon",
      title: "Số lượng còn lại",
    },
    {
      key: "price",
      dataIndex: "gia",
      title: "Giá",
    },
  ];
  return (
    <div>
      <Card
        title="Top sản phẩm bán chạy nhất"
        extra={
          <Button type="text" className="text-[#0E50E4]">
            Xem hết
          </Button>
        }
      >
        <Table dataSource={data} columns={columns} bordered/>
      </Card>
    </div>
  );
};

export default TopSellingProduct;
