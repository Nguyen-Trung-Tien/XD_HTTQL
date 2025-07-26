import React from "react";

function TopProducts() {
  const topProducts = [
    {
      id: 1,
      name: "Điện thoại X Pro",
      category: "Điện tử",
      sales: 245,
      revenue: "5.635.000.000đ",
      growth: "+12.5%",
      isPositive: true,
    },
    {
      id: 2,
      name: "Laptop Ultra Pro",
      category: "Điện tử",
      sales: 189,
      revenue: "6.615.000.000đ",
      growth: "+8.3%",
      isPositive: true,
    },
    {
      id: 3,
      name: "Tai nghe không dây",
      category: "Phụ kiện",
      sales: 384,
      revenue: "1.152.000.000đ",
      growth: "-2.8%",
      isPositive: false,
    },
    {
      id: 4,
      name: "Đồng hồ thông minh",
      category: "Thiết bị đeo",
      sales: 127,
      revenue: "889.000.000đ",
      growth: "+22.4%",
      isPositive: true,
    },
  ];

  const getColorClass = (index) => {
    const colors = ["blue", "purple", "green", "orange", "red"];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-blue-50 mb-8">

      <h1 className="text-2xl font-bold text-textPrimary mb-6">
        Sản phẩm bán chạy
      </h1>
      <div className="bg-card shadow-card rounded-lg p-6">
        <div className="flex justify-end mb-6">

          <button className="text-primary hover:text-accent transition-colors text-sm font-medium">
            Xem tất cả
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Đã bán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Doanh thu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Tăng trưởng
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {topProducts.map((product, index) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-md bg-${getColorClass(
                          index
                        )}-100 flex items-center justify-center mr-3`}
                      >
                        <svg
                          className={`w-6 h-6 text-${getColorClass(index)}-500`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-textPrimary">
                          {product.name}
                        </div>
                        <div className="text-xs text-textSecondary">
                          {product.category}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {product.sales} chiếc
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {product.revenue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.isPositive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TopProducts;
