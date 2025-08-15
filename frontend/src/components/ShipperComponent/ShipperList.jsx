import React from "react";

const statusClassMap = {
  delivering: "bg-[#FFD700]/20 text-[#FFD700]",
  available: "bg-green-100 text-green-800",
};

const ShipperList = ({
  shippers = [],
  orders = [],
  onAddShipper,
  onDeleteShipper,
  onEditShipper,
  onFocusShipper,
  loading,
}) => {
  const getStatusText = (status) => {
    return status === "delivering" ? "Đang giao" : "Sẵn sàng";
  };

  const getCurrentOrderInfo = (shipper) => {
    if (shipper.status === "delivering" && shipper.currentOrderId) {
      const order = orders.find((o) => o.id === shipper.currentOrderId);
      return order
        ? `#${order.orderNumber}`
        : `#${shipper.currentOrderId}`;
    }
    return "Không có đơn hàng";
  };

  if (loading) {
    return <div className="p-6 text-center">Đang tải danh sách shipper...</div>;
  }

  return (
    <div className="bg-card shadow-card rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-textPrimary">
            Trạng thái Shipper
          </h3>
          <button
            onClick={onAddShipper}
            className="px-4 py-1.5 gradient-bg rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Thêm Shipper mới
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Shipper
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Đơn hàng hiện tại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Vị trí
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {shippers.map((shipper) => (
                <tr key={shipper.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <svg
                          className="w-6 h-6 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-textPrimary">
                          {shipper.name}
                        </div>
                        <div className="text-xs text-textSecondary">
                          {shipper.phoneNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        statusClassMap[shipper.status] || "bg-gray-100"
                      } font-medium`}
                    >
                      {getStatusText(shipper.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-textSecondary">
                      {getCurrentOrderInfo(shipper)}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="flex items-start gap-1 max-w-[200px] whitespace-normal break-words text-sm text-textPrimary">
                      <svg
                        className="w-4 h-4 text-textPrimary mt-1 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <span>{shipper.address || "Chưa cập nhật"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        className="p-1 text-primary hover:text-accent transition-colors"
                        onClick={() => onFocusShipper(shipper.id)}
                        title="Xem vị trí shipper trên bản đồ"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>

                      <button
                        className="p-1 text-primary hover:text-blue-500 transition-colors"
                        onClick={() => onEditShipper(shipper)}
                        title="Sửa thông tin shipper"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                          />
                        </svg>
                      </button>

                      <button
                        className="p-1 text-primary hover:text-red-500 transition-colors"
                        onClick={() => onDeleteShipper(shipper.id)}
                        title="Xóa shipper"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShipperList;
