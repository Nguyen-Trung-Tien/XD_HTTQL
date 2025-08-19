import React, { useEffect, useState } from "react";
import { getAllStock } from "../API/stock/stockAPI";

function Inventory() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getAllStock();
        const formatted = (data || []).map((stock) => ({
          id: stock.product?.id || stock.productId,
          name: stock.product?.name || "Không rõ",
          category: stock.product?.category || "Khác",
          price: stock.product?.price || 0,
          stock: stock.quantity,
          status:
            stock.quantity === 0
              ? "out-of-stock"
              : stock.quantity < 10
              ? "low-stock"
              : "in-stock",
          location: stock.location || "Kho chưa rõ",
          lastUpdated: stock.updatedAt,
        }));
        setInventoryItems(formatted);
      } catch (err) {
        console.error("Lỗi khi fetch tồn kho:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "low-stock":
        return "bg-accent/20 text-accent";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "in-stock":
        return "Còn hàng";
      case "low-stock":
        return "Sắp hết";
      case "out-of-stock":
        return "Hết hàng";
      default:
        return "Không xác định";
    }
  };

  const filteredItems = inventoryItems
    .filter((item) => {
      if (activeTab === "all") return true;
      return item.status === activeTab;
    })
    .filter((item) => {
      if (!searchTerm) return true;
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  if (loading) {
    return <div className="p-6 text-center">Đang tải dữ liệu tồn kho...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-textPrimary mb-6">
        Quản Lý Tồn Kho
      </h1>

      <div className="bg-card shadow-card rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === "all"
                    ? "gradient-bg text-white"
                    : "bg-gray-100 text-textSecondary hover:bg-gray-200"
                } transition-colors`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setActiveTab("in-stock")}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === "in-stock"
                    ? "gradient-bg text-white"
                    : "bg-gray-100 text-textSecondary hover:bg-gray-200"
                } transition-colors`}
              >
                Còn hàng
              </button>
              <button
                onClick={() => setActiveTab("low-stock")}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === "low-stock"
                    ? "gradient-bg text-white"
                    : "bg-gray-100 text-textSecondary hover:bg-gray-200"
                } transition-colors`}
              >
                Sắp hết
              </button>
              <button
                onClick={() => setActiveTab("out-of-stock")}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === "out-of-stock"
                    ? "gradient-bg text-white"
                    : "bg-gray-100 text-textSecondary hover:bg-gray-200"
                } transition-colors`}
              >
                Hết hàng
              </button>
            </div>

            <div className="w-full md:w-auto flex space-x-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-textSecondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <button className="px-4 py-2 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-sm">
                Thêm sản phẩm
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Mã SP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Số lượng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Cập nhật
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{item.id}</td>
                    <td className="px-6 py-4 text-sm">{item.name}</td>
                    <td className="px-6 py-4 text-sm">{item.category}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                          item.status
                        )} mr-2`}
                      >
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {item.price.toLocaleString()}đ
                    </td>
                    <td className="px-6 py-4 text-sm">{item.stock}</td>
                    <td className="px-6 py-4 text-sm text-textSecondary">
                      {new Date(item.lastUpdated).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="p-1 text-primary hover:text-accent transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            ></path>
                          </svg>
                        </button>
                        <button className="p-1 text-primary hover:text-accent transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            ></path>
                          </svg>
                        </button>
                        <button className="p-1 text-red-500 hover:text-red-700 transition-colors">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-textSecondary">
              Không tìm thấy sản phẩm nào phù hợp với tìm kiếm của bạn.
            </div>
          )}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-textSecondary">
              Hiển thị {filteredItems.length} / {inventoryItems.length} sản phẩm
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-border rounded-md text-textSecondary hover:bg-gray-50 transition-colors">
                Trước
              </button>
              <button className="px-3 py-1 gradient-bg text-white rounded-md">
                1
              </button>
              <button className="px-3 py-1 border border-border rounded-md text-textSecondary hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-3 py-1 border border-border rounded-md text-textSecondary hover:bg-gray-50 transition-colors">
                3
              </button>
              <button className="px-3 py-1 border border-border rounded-md text-textSecondary hover:bg-gray-50 transition-colors">
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-card shadow-card rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">
              Tình trạng tồn kho
            </h3>
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#00BFFF"
                    strokeWidth="3"
                    strokeDasharray="75, 100"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#FFD700"
                    strokeWidth="3"
                    strokeDasharray="15, 100"
                    strokeDashoffset="-75"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#FF6B6B"
                    strokeWidth="3"
                    strokeDasharray="10, 100"
                    strokeDashoffset="-90"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-textPrimary">
                      {inventoryItems.length}
                    </div>
                    <div className="text-xs text-textSecondary">
                      Tổng sản phẩm
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="text-center p-2 bg-gray-50 rounded-md">
                <div className="text-sm font-semibold text-textPrimary">
                  75%
                </div>
                <div className="text-xs text-textSecondary flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full mr-1"></div>
                  Còn hàng
                </div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-md">
                <div className="text-sm font-semibold text-textPrimary">
                  15%
                </div>
                <div className="text-xs text-textSecondary flex items-center justify-center">
                  <div className="w-3 h-3 bg-accent rounded-full mr-1"></div>
                  Sắp hết
                </div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-md">
                <div className="text-sm font-semibold text-textPrimary">
                  10%
                </div>
                <div className="text-xs text-textSecondary flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                  Hết hàng
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card shadow-card rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">
              Sản phẩm cần nhập thêm
            </h3>
            <div className="space-y-4">
              {inventoryItems
                .filter(
                  (item) =>
                    item.status === "low-stock" || item.status === "out-of-stock"
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-md ${
                          item.status === "out-of-stock"
                            ? "bg-red-100"
                            : "bg-accent/10"
                        } flex items-center justify-center mr-3`}
                      >
                        <svg
                          className={`w-6 h-6 ${
                            item.status === "out-of-stock"
                              ? "text-red-500"
                              : "text-accent"
                          }`}
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
                      </div>
                      <div>
                        <div className="text-sm font-medium text-textPrimary">
                          {item.name}
                        </div>
                        <div className="text-xs text-textSecondary">
                          Mã: {item.id} | Kho: {item.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-textPrimary">
                        {item.stock} sản phẩm
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                          item.status
                        )} font-medium`}
                      >
                        {getStatusText(item.status)}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors">
              Tạo đơn nhập hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
