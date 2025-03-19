import { Card, Typography } from "antd";
import React from "react";
import icon1 from "../../assets/icons/icons8-sales-50.png";
import icon2 from "../../assets/icons/icons8-revenue-50.png";
import icon3 from "../../assets/icons/icons8-prefix-80.png";
import icon4 from "../../assets/icons/icons8-cost-50.png";
import icon5 from "../../assets/icons/icons8-purchase-50.png";
import icon6 from "../../assets/icons/icons8-inventory-50.png";
import icon7 from "../../assets/icons/icons8-inventory2-50.png";
import icon8 from "../../assets/icons/icons8-cancel-50.png";
import icon9 from "../../assets/icons/icons8-return-50.png";
import icon10 from "../../assets/icons/icons8-supplier-50.png";
import StatisticComponent from "../../components/StatisticComponent";
import SalesAndPurchase from "../../components/SalesAndPurchase";
import TopSellingProduct from "../../components/TopSellingStockProduct";
import LowQuantityStockProduct from "../../components/LowQuantityStockProduct";

const Dashboard = () => {
    return (
        <div>
            <div className="grid grid-cols-12 gap-7 mb-5">
                <div className="col-span-8">
                    <Card>
                        <Typography.Title level={4} className="mb-5">
                            Tổng quan doanh số
                        </Typography.Title>
                        <div className="grid grid-cols-4">
                            <StatisticComponent
                                icon={icon1}
                                value={"200"}
                                label={"Bán hàng"}
                                layout={"vertical"}
                                bgIcon={"#0eb2e42f"}
                                borderRight={true}
                            />
                            <StatisticComponent
                                icon={icon2}
                                value={"200"}
                                label={"Doanh thu"}
                                layout={"vertical"}
                                bgIcon={"#a13ac032"}
                                borderRight={true}
                            />
                            <StatisticComponent
                                icon={icon3}
                                value={"200"}
                                label={"Lợi nhuận"}
                                layout={"vertical"}
                                bgIcon={"#2caf391a"}
                                borderRight={true}
                            />
                            <StatisticComponent
                                icon={icon4}
                                value={"200"}
                                label={"Chi phí"}
                                layout={"vertical"}
                                bgIcon={"#a4af2c1a"}
                                borderRight={false}
                            />
                        </div>
                    </Card>
                </div>
                <div className="col-span-4">
                    <Card>
                        <Typography.Title level={4} className="mb-5">
                            Tổng quan kho
                        </Typography.Title>
                        <div className="grid grid-cols-2">
                            <StatisticComponent
                                icon={icon6}
                                value={"200"}
                                label={"Số lượng trong kho"}
                                layout={"vertical"}
                                bgIcon={"#E49B0E3D"}
                                borderRight={true}
                            />
                            <StatisticComponent
                                icon={icon7}
                                value={"200"}
                                label={"Sắp nhận"}
                                layout={"vertical"}
                                bgIcon={"#E40EA83B"}
                                borderRight={false}
                            />
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-7 mb-5">
                <div className="col-span-8">
                    <Card>
                        <Typography.Title level={4} className="mb-5">
                            Tóm tắt sản phẩm
                        </Typography.Title>
                        <div className="grid grid-cols-4">
                            <StatisticComponent
                                icon={icon5}
                                value={"200"}
                                label={"Lượt mua"}
                                layout={"vertical"}
                                bgIcon={"#2caf391a"}
                                borderRight={true}
                            />
                            <StatisticComponent
                                icon={icon4}
                                value={"200"}
                                label={"Chi phí"}
                                layout={"vertical"}
                                bgIcon={"#a4af2c1a"}
                                borderRight={true}
                            />
                            <StatisticComponent
                                icon={icon8}
                                value={"200"}
                                label={"Hủy đơn"}
                                layout={"vertical"}
                                bgIcon={"#E4350E45"}
                                borderRight={true}
                            />
                            <StatisticComponent
                                icon={icon9}
                                value={"200"}
                                label={"Hoàn trả"}
                                layout={"vertical"}
                                bgIcon={"#E49B0E3D"}
                                borderRight={false}
                            />
                        </div>
                    </Card>
                </div>
                <div className="col-span-4">
                    <Card>
                        <Typography.Title level={4} className="mb-5">
                            Tóm tắt sản phẩm
                        </Typography.Title>
                        <div className="grid grid-cols-2">
                            <StatisticComponent
                                icon={icon10}
                                value={"200"}
                                label={"Số nhà cung cấp"}
                                layout={"vertical"}
                                bgIcon={"#0eb2e42f"}
                                borderRight={true}
                            />
                            <StatisticComponent
                                icon={icon4}
                                value={"200"}
                                label={"Cost"}
                                layout={"vertical"}
                                bgIcon={"#a4af2c1a"}
                                borderRight={false}
                            />
                        </div>
                    </Card>
                </div>
            </div>
            <SalesAndPurchase />
            <div className="grid grid-cols-12 gap-7 mb-5">
                <div className="col-span-8">
                    <TopSellingProduct />
                </div>
                <div className="col-span-4">
                    <LowQuantityStockProduct />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
