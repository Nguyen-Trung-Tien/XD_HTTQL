import React, { useState } from "react";
import { FiEdit, FiTrash2, FiList } from "react-icons/fi";
import CustomerOrderHistory from "./CustomerOrderHistory";

export default function CustomerTable({
  customers,
  selectedIds,
  toggleSelect,
  toggleSelectAll,
  onEdit,
  onDelete,
  loading,
}) {
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleShowOrderHistory = (customer) => {
    setSelectedCustomer(customer);
    setShowOrderHistory(true);
  };

  return (
    <div className="bg-card shadow-card rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === customers.length &&
                      customers.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="accent-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  SĐT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Địa chỉ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-border">
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-6 text-center text-textSecondary"
                  >
                    Đang tải...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-6 text-center text-textSecondary"
                  >
                    Không tìm thấy khách hàng.
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-primaryLight/10 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(c.id)}
                        onChange={() => toggleSelect(c.id)}
                        className="accent-primary"
                      />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-textPrimary">
                        {c.name}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-textPrimary">{c.email}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-textPrimary">
                        {c.phoneNumber || "-"}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-normal break-words max-w-[400px]">
                      <div className="text-sm text-textPrimary">
                        {c.address || "-"}
                      </div>
                    </td>

                    {/* Cột Đơn hàng */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="flex items-center gap-1 text-primary hover:underline"
                        onClick={() => handleShowOrderHistory(c)}
                      >
                       {c.orderCount || 0} đơn hàng
                      </button>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onEdit(c)}
                          title="Sửa"
                          className="p-1 text-primary hover:text-blue-500 transition-colors rounded"
                        >
                          <FiEdit className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() => onDelete(c.id)}
                          title="Xóa"
                          className="p-1 text-primary hover:text-red-500 transition-colors rounded"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal lịch sử đơn hàng */}
      {showOrderHistory && selectedCustomer && (
        <CustomerOrderHistory
          customerId={selectedCustomer.id}
          onClose={() => setShowOrderHistory(false)}
        />
      )}
    </div>
  );
}
