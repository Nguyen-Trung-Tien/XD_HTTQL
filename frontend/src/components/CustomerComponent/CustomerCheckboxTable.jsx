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
    <div className="max-w-full bg-white rounded shadow-md p-4">
      {/* Header + action buttons */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-700">
          Customers ({customers.length})
        </h2>

        <button
          disabled={selectedIds.length === 0}
          onClick={() => handleDeleteMultiple(selectedIds)}
          className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 disabled:opacity-50 transition-all"
        >
          Delete Selected ({selectedIds.length})
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[400px] border border-gray-200 rounded shadow-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white sticky top-0">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === customers.length &&
                    customers.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="w-4 h-4 accent-white"
                />
              </th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="border-t border-gray-200 p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(c.id)}
                      onChange={() => toggleSelect(c.id)}
                      className="w-4 h-4 accent-indigo-600"
                    />
                  </td>
                  <td className="border-t border-gray-200 p-2">{c.name}</td>
                  <td className="border-t border-gray-200 p-2">{c.email}</td>
                  <td className="border-t border-gray-200 p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 transition"
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteMultiple([c.id])}
                      className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                    >
                      <FiTrash2 /> Delete
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
