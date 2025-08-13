import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function CustomerCheckboxTable({
  customers,
  selectedIds,
  setSelectedIds,
  handleEdit,
  handleDeleteMultiple,
  loading,
}) {
  // Toggle single checkbox
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedIds.length === customers.length) setSelectedIds([]);
    else setSelectedIds(customers.map((c) => c.id));
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-4 border border-border">
      {/* Header + action buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h2 className="text-lg font-bold text-textPrimary">
          Danh sách khách hàng ({customers.length})
        </h2>
        <button
          disabled={selectedIds.length === 0}
          onClick={() => handleDeleteMultiple(selectedIds)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 disabled:opacity-50 transition-all"
        >
          Xóa đã chọn ({selectedIds.length})
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[400px] border border-border rounded-lg shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="gradient-bg text-white sticky top-0">
            <tr>
              <th className="p-3">
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
              <th className="p-3 text-left">Tên</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Đang tải...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Không có khách hàng.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-primaryLight/10 transition-colors duration-200"
                >
                  <td className="border-t border-border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      className="accent-primary"
                    />
                  </td>
                  <td className="border-t border-border p-2">{c.name}</td>
                  <td className="border-t border-border p-2">{c.email}</td>
                  <td className="border-t border-border p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="flex items-center gap-1 gradient-bg text-white px-3 py-1 rounded-lg shadow transition hover:opacity-90"
                    >
                      <FiEdit /> Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteMultiple([c.id])}
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
    </div>
  );
}