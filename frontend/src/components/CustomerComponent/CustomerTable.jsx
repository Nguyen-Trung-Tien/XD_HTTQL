import React, { useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import CustomerOrderHistory from "./CustomerOrderHistory";

export default function CustomerTable({
  customers,
  selectedIds,
  toggleSelect,
  toggleSelectAll,
  onEdit,
  onDelete,
  loading,
  page,
  totalPages,
  onPageChange,
}) {
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleShowOrderHistory = (customer) => {
    setSelectedCustomer(customer);
    setShowOrderHistory(true);
  };

  const Pagination = () => (
    <div className="flex justify-center gap-2 mt-5 flex-wrap">
      <button
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        className="px-3 py-1 border border-border rounded-md text-textSecondary hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Trang đầu
      </button>
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1 border border-border rounded-md text-textSecondary hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronLeft size={18} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-1 border border-border rounded-md transition-colors ${
              page === pageNumber
                ? "gradient-bg text-white shadow"
                : "text-textSecondary hover:bg-gray-50"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-3 py-1 border border-border rounded-md text-textSecondary hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiChevronRight size={18} />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
        className="px-3 py-1 border border-border rounded-md text-textSecondary hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Trang cuối
      </button>
    </div>
  );

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
                
                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-textPrimary">
                      {c.name}
                    </td>
                
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                      {c.email}
                    </td>
                
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                      {c.phoneNumber || "-"}
                    </td>
                  
                    <td className="px-6 py-4 whitespace-normal break-words max-w-sm text-sm text-textPrimary">
                      {c.address || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        className="text-primary hover:underline"
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
                          className="p-1 text-red-500 hover:text-red-700 transition-colors"
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
        {totalPages > 1 && <Pagination />}
      </div>

      {showOrderHistory && selectedCustomer && (
        <CustomerOrderHistory
          customerId={selectedCustomer.id}
          onClose={() => setShowOrderHistory(false)}
        />
      )}
    </div>
  );
}