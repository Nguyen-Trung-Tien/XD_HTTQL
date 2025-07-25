import React from "react";
import RevenueChart from "./RevenueChart";
import TopProducts from "./TopProducts";

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-textPrimary mb-6">Tổng quan</h1>

      <DashboardCards />
      <RevenueChart />
      <TopProducts />
    </div>
  );
}

// components/DashboardCards.jsx
function DashboardCards() {
  const stats = [
    {
      title: "Tổng doanh thu",
      value: "1.245.000.000đ",
      change: "+12.5%",
      isPositive: true,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Đơn hàng mới",
      value: "145",
      change: "+8.2%",
      isPositive: true,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Sản phẩm tồn kho",
      value: "1,254",
      change: "-2.4%",
      isPositive: false,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          ></path>
        </svg>
      ),
    },
    {
      title: "Khách hàng mới",
      value: "45",
      change: "+15.3%",
      isPositive: true,
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-card shadow-card rounded-lg p-6 hover:shadow-hover transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white">
              {stat.icon}
            </div>
            <span
              className={`text-sm font-semibold ${
                stat.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {stat.change}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-textPrimary">
            {stat.title}
          </h3>
          <p className="text-2xl font-bold gradient-text">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
