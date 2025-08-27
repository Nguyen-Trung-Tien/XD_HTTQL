import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
    fetchGeneralStats,
    fetchRevenueByPeriod,
    fetchTopSellingProducts,
    fetchOrderStatusStats
} from '../../api/statistics/statisticsApi';

import GeneralStatsCards from './GeneralStatsCards';
import RevenueChart from './RevenueChart';
import OrderStatusPieChart from './OrderStatusPieChart';
import TopProductsTable from './TopProductsTable';

const Statistics = () => {
    const [generalStats, setGeneralStats] = useState(null);
    const [revenueData, setRevenueData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [orderStatusData, setOrderStatusData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAllData = async () => {
            try {
                setLoading(true);
                const [stats, revenue, products, status] = await Promise.all([
                    fetchGeneralStats('month'),
                    fetchRevenueByPeriod('month'),
                    fetchTopSellingProducts(),
                    fetchOrderStatusStats()
                ]);

                setGeneralStats(stats);
                setRevenueData(revenue);
                setTopProducts(products);
                setOrderStatusData(status);
            } catch (error) {
                toast.error("Không thể tải dữ liệu thống kê. Vui lòng thử lại.");
                console.error("Lỗi tải dữ liệu thống kê:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAllData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full text-lg text-gray-500">
                Đang tải dữ liệu thống kê...
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Bảng điều khiển Thống kê</h1>
            
            <GeneralStatsCards stats={generalStats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <RevenueChart data={revenueData} />
                </div>
                <div>
                    <OrderStatusPieChart data={orderStatusData} />
                </div>
            </div>

            <TopProductsTable data={topProducts} />
        </div>
    );
};

export default Statistics;