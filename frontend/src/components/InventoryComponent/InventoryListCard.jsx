import React from "react";
import { useNavigate } from "react-router-dom";

const InventoryListCard = ({
  inventoryItems,
  getStatusClass,
  getStatusText,
}) => {
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    navigate("/WarehouseManagement", {
      state: { tab: "importReceipts" },
    });
  };

  return (
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

        {/* Nút chuyển trang */}
        <button
          onClick={handleCreateOrder}
          className="w-full mt-4 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
        >
          Tạo đơn nhập hàng
        </button>
      </div>
    </div>
  );
};

export default InventoryListCard;