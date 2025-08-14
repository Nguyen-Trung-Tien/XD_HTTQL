import React, { useState, useEffect } from "react";
import { getAllOrders, deleteOrder } from "../../API/orders/ordersApi";
import OrderDetail from "./OrderDetail";
import { FiSearch, FiEye, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

const STATUS_MAP = {
  pending: "Chờ xác nhận",
  finding_shipper: "Đang tìm shipper",
  shipping: "Đang giao",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
};

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Không thể tải đơn hàng");
    }
    setLoading(false);
  };

  // Tìm kiếm & lọc
  const filteredOrders = orders
    .filter((order) =>
      search
        ? order.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
          order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
          order.customerPhone?.toLowerCase().includes(search.toLowerCase())
        : true
    )
    .filter((order) =>
      statusFilter ? order.status === statusFilter : true
    );

  // Phân trang
  const totalPages = Math.ceil(filteredOrders.length / limit);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * limit,
    page * limit
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) return;
    try {
      await deleteOrder(id);
      toast.success("Xóa đơn hàng thành công!");
      fetchOrders();
    } catch (err) {
      toast.error("Xóa đơn hàng thất bại!");
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-4 border border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h2 className="text-lg font-bold text-textPrimary">
          Danh sách đơn hàng ({orders.length})
        </h2>
        <div className="flex gap-3">
          <div className="flex items-center border border-border rounded-lg px-3 bg-card">
            <FiSearch className="text-textSecondary mr-2" />
            <input
              type="text"
              placeholder="Tìm theo mã đơn, tên, SĐT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 bg-transparent text-textPrimary focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-border rounded-lg bg-card text-textPrimary"
          >
            <option value="">-- Tất cả trạng thái --</option>
            {Object.keys(STATUS_MAP).map((key) => (
              <option key={key} value={key}>
                {STATUS_MAP[key]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="gradient-bg text-white sticky top-0">
            <tr>
              <th className="p-3 text-left">Mã đơn</th>
              <th className="p-3 text-left">Khách hàng</th>
              <th className="p-3 text-left">SĐT</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-left">Tổng tiền</th>
              <th className="p-3 text-left">Ngày tạo</th>
              <th className="p-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  Đang tải...
                </td>
              </tr>
            ) : paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  Không có đơn hàng.
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-primaryLight/10 transition-colors duration-200"
                >
                  <td className="border-t border-border p-2">{order.orderNumber}</td>
                  <td className="border-t border-border p-2">{order.customerName}</td>
                  <td className="border-t border-border p-2">{order.customerPhone}</td>
                  <td className="border-t border-border p-2">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100">
                      {STATUS_MAP[order.status] || order.status}
                    </span>
                  </td>
                  <td className="border-t border-border p-2">
                    {order.total?.toLocaleString()}đ
                  </td>
                  <td className="border-t border-border p-2">
                    {new Date(order.createdAt).toLocaleString("vi-VN")}
                  </td>
                  <td className="border-t border-border p-2 flex gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-1 gradient-bg text-white px-3 py-1 rounded-lg shadow transition hover:opacity-90"
                    >
                      <FiEye /> Xem
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition"
                    >
                      <FiTrash2 /> Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-sm ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "gradient-bg text-white hover:opacity-90"
          }`}
        >
          Trước
        </button>
        <span className="px-3 py-1 rounded-md hover:bg-blue-100 transition">
          Trang {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 shadow-sm ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "gradient-bg text-white hover:opacity-90"
          }`}
        >
          Tiếp
        </button>
      </div>
      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}

export default OrderTable;