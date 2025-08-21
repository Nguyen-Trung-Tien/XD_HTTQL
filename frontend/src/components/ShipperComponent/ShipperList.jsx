import React from "react";

import { FiUser, FiMapPin, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const statusClassMap = {
  delivering: "bg-[#FFD700]/20 text-yellow-600", 
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
      return order ? `#${order.orderNumber}` : `#${shipper.currentOrderId}`;
    }
    return "Không có";
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
            Thêm Shipper
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
                <tr key={shipper.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 shrink-0">
                     
                        <FiUser className="w-6 h-6 text-blue-500" />
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
                    <div className="flex items-start gap-1.5 max-w-xs whitespace-normal break-words text-sm text-textPrimary">
                     
                      <FiMapPin className="w-4 h-4 text-textSecondary mt-0.5 shrink-0" />
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
                   
                        <FiEye className="w-5 h-5" />
                      </button>
                      <button
                        className="p-1 text-primary hover:text-blue-500 transition-colors"
                        onClick={() => onEditShipper(shipper)}
                        title="Sửa thông tin shipper"
                      >
                   
                        <FiEdit className="w-5 h-5" />
                      </button>
                      <button
                        className="p-1 text-red-500 hover:text-red-500 transition-colors"
                        onClick={() => onDeleteShipper(shipper.id)}
                        title="Xóa shipper"
                      >
                       
                        <FiTrash2 className="w-5 h-5" />
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