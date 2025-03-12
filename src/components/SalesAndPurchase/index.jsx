import { Card, Dropdown, Radio } from "antd";
import React from "react";
// import { Bar } from "react-chartjs-2";
import {
  BarChart,
  Bar,
  LineChart, 
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const SalesAndPurchase = () => {

  const data = [
    { name: "Tháng 2", sales: 5000, purchase: 4000 },
    { name: "Tháng 4", sales: 7000, purchase: 6500 },
    { name: "Tháng 6", sales: 8000, purchase: 7200 },
    { name: "Tháng 8", sales: 5000, purchase: 4000 },
    { name: "Tháng 10", sales: 7000, purchase: 6500 },
    { name: "Tháng 12", sales: 8000, purchase: 7200 },
  ];

  return (
    <div className="grid grid-cols-12 gap-7 mb-5">
      <div className="col-span-8">
        <Card
          title="Biểu đồ mua bán"
          extra={
            <Radio.Group
              optionType="button"
              options={[
                { value: "weekly", label: "Tuần" },
                { value: "monthly", label: "Tháng" },
                { value: "yearly", label: "Năm" },
              ]}
            />
          }
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" name="Doanh số" />
              <Bar dataKey="purchase" fill="#82ca9d" name="Mua hàng" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <div className="col-span-4">
        <Card
          title="Biểu đồ đơn hàng"
          extra={
            <Radio.Group
              optionType="button"
              options={[
                { value: "weekly", label: "Tuần" },
                { value: "monthly", label: "Tháng" },
                { value: "yearly", label: "Năm" },
              ]}
            />
          }
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Line dataKey="sales" stroke="#8884d8" name="Doanh số" />
              <Line dataKey="purchase" stroke="#82ca9d" name="Mua hàng" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default SalesAndPurchase;
