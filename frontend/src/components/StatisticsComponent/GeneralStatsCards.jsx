import React from 'react';
import { FiTrendingUp, FiShoppingCart, FiUsers, FiPackage } from 'react-icons/fi';

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white p-5 rounded-xl shadow-md flex items-center gap-4 transition-transform hover:scale-105">
        <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const GeneralStatsCards = ({ stats }) => {
    const cardsData = [
        {
            title: "Tổng Doanh thu (Tháng)",
            value: `${stats?.totalRevenue.toLocaleString('vi-VN') || 0} VNĐ`,
            icon: <FiTrendingUp className="text-blue-500" size={24} />
        },
        {
            title: "Tổng Đơn hàng (Tháng)",
            value: stats?.totalOrders || 0,
            icon: <FiShoppingCart className="text-green-500" size={24} />
        },
        {
            title: "Khách hàng mới (Tháng)",
            value: stats?.newCustomers || 0,
            icon: <FiUsers className="text-purple-500" size={24} />
        },
        {
            title: "Sản phẩm đã bán (Tháng)",
            value: stats?.productsSoldCount || 0,
            icon: <FiPackage className="text-orange-500" size={24} />
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cardsData.map(card => <StatCard key={card.title} {...card} />)}
        </div>
    );
};

export default GeneralStatsCards;