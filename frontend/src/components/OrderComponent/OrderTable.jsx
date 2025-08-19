import React, { useState, useEffect } from "react";
import { FiPlus, FiEye, FiTrash2 } from "react-icons/fi";
import OrderDetail from "./OrderDetail";
import { deleteOrder } from "../../API/orders/ordersApi";
import { toast } from "react-toastify";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const statusMap = {
  pending: {
    text: "Chờ xác nhận",
    className: "bg-yellow-100 text-yellow-800",
  },
  finding_shipper: {
    text: "Đang tìm shipper",
    className: "bg-purple-100 text-purple-800",
  },
  shipping: {
    text: "Đang giao",
    className: "bg-[#FFD700]/20 text-yellow-600",
  },
  delivered: {
    text: "Đã giao",
    className: "bg-green-100 text-green-800",
  },
  cancelled: {
    text: "Đã hủy",
    className: "bg-red-100 text-red-800",
  },
};

const OrderTable = ({ orders, loading, onCreateOrder, onOrderChanged }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(Math.ceil(orders.length / itemsPerPage) || 1);
    if (currentPage > Math.ceil(orders.length / itemsPerPage)) {
      setCurrentPage(1);
    }
  }, [orders, itemsPerPage]);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) return;
    await deleteOrder(orderId);
    toast.success("Xóa đơn hàng thành công");
    if (onOrderChanged) onOrderChanged();
  };

  return (
    <div className="bg-card shadow-card rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-textPrimary">
            Danh sách đơn hàng ({orders.length})
          </h3>
          <button
            onClick={onCreateOrder}
            className="flex items-center gap-2 px-4 py-1.5 gradient-bg rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            <FiPlus /> Tạo đơn hàng
          </button>
        </div>

        {/* 2. Áp dụng cấu trúc bảng tương tự ShipperList */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Mã đơn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 px-6">
                    Đang tải...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-4 px-6 text-gray-500"
                  >
                    Không có đơn hàng nào.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  const statusInfo = statusMap[order.status] || {
                    text: order.status,
                    className: "bg-gray-100 text-gray-800",
                  };
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-textPrimary">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* 3. Sử dụng badge màu cho trạng thái */}
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${statusInfo.className}`}
                        >
                          {statusInfo.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary font-semibold">
                        {order.total?.toLocaleString()}đ
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {/* 4. Sử dụng icon cho các nút thao tác */}
                        <div className="flex space-x-2">
                          <button
                            className="p-1 text-primary hover:text-accent transition-colors"
                            onClick={() => setSelectedOrder(order)}
                            title="Xem chi tiết đơn hàng"
                          >
                            <FiEye className="w-5 h-5" />
                          </button>
                          <button
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                            onClick={() => handleDeleteOrder(order.id)}
                            title="Xóa đơn hàng"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center gap-2 mt-5 flex-wrap">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Trang đầu
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            <FiChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => goToPage(pageNumber)}
                className={`px-4 py-1 rounded-lg font-medium transition-colors duration-200 ${
                  currentPage === pageNumber
                    ? "bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white shadow"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
          >
             <FiChevronRight size={18} />
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Trang cuối
          </button>
        </div>
      </div>

      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};
export default OrderTable;
