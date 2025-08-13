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
    <div className="overflow-x-auto max-h-[400px] border border-gray-200 rounded shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white sticky top-0 shadow-md">
          <tr>
            <th className="p-3 text-left">
              <input
                type="checkbox"
                checked={
                  selectedIds.length === customers.length &&
                  customers.length > 0
                }
                onChange={toggleSelectAll}
              />
            </th>
            {[
              "Name",
              "Email",
              "Phone",
              "Address",
              "City",
              "Status",
              "Actions",
            ].map((h) => (
              <th key={h} className="p-3 text-left font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : customers.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No customers found.
              </td>
            </tr>
          ) : (
            customers.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-colors duration-200"
              >
                <td className="border-t border-gray-200 p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(c.id)}
                    onChange={() => toggleSelect(c.id)}
                  />
                </td>
                <td className="border-t border-gray-200 p-2">{c.name}</td>
                <td className="border-t border-gray-200 p-2">{c.email}</td>
                <td className="border-t border-gray-200 p-2">
                  {c.phoneNumber || "-"}
                </td>
                <td className="border-t border-gray-200 p-2">
                  {c.address || "-"}
                </td>
                <td className="border-t border-gray-200 p-2">
                  {c.city || "-"}
                </td>
                <td className="border-t border-gray-200 p-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-white text-sm font-semibold ${
                      c.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {c.status === "active"
                      ? "Đang hoạt động"
                      : "Ngừng hoạt động"}
                  </span>
                </td>
                <td className="border-t border-gray-200 p-2 text-center flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(c)}
                    className="inline-flex items-center gap-1 text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded shadow transition"
                  >
                    <FiEdit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(c.id)}
                    className="inline-flex items-center gap-1 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded shadow transition"
                  >
                    <FiTrash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
