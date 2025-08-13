import React from "react";
import { FiEdit } from "react-icons/fi";

export default function CustomerCheckboxTable({
  customers,
  selectedIds,
  setSelectedIds,
  handleEdit,
  handleDeleteMultiple,
}) {
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === customers.length) setSelectedIds([]);
    else setSelectedIds(customers.map((c) => c.id));
  };

  return (
    <div className="overflow-x-auto max-h-[400px] border border-gray-200 rounded shadow-sm">
      <button
        disabled={selectedIds.length === 0}
        onClick={() => handleDeleteMultiple(selectedIds)}
        className="mb-2 px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
      >
        Delete Selected
      </button>

      <table className="min-w-full border-collapse">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            <th className="p-2">
              <input
                type="checkbox"
                checked={
                  selectedIds.length === customers.length &&
                  customers.length > 0
                }
                onChange={toggleSelectAll}
              />
            </th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(c.id)}
                  onChange={() => toggleSelect(c.id)}
                />
              </td>
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="text-indigo-600"
                >
                  <FiEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
