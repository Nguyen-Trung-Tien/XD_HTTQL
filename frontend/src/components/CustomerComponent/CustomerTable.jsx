import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function CustomerTable({
  customers,
  selectedIds,
  toggleSelect,
  toggleSelectAll,
  onEdit,
  onDelete,
  loading,
}) {
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
                  Thành phố
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-border">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-6 text-center text-textSecondary">
                    Đang tải...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-6 text-center text-textSecondary">
                    Không tìm thấy khách hàng.
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-primaryLight/10 transition-colors duration-200">
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

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-textPrimary">
                        {c.address || "-"}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-textPrimary">{c.city || "-"}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          c.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {c.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"}
                      </span>
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
    </div>
  );
}