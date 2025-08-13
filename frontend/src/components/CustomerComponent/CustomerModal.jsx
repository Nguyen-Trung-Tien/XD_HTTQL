import React from "react";
import { FiSave } from "react-icons/fi";

export default function CustomerModal({
  isEditing,
  form,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/40 to-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-scaleUp">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isEditing ? "Update Customer" : "Add Customer"}
        </h2>
        <form className="grid gap-4" onSubmit={onSubmit}>
          {["name", "email", "phoneNumber", "address", "city"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={onChange}
              required={field === "name" || field === "email"}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 hover:border-blue-300"
            />
          ))}
          <select
            name="status"
            value={form.status}
            onChange={onChange}
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 hover:border-blue-300"
          >
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Ngừng hoạt động</option>
          </select>
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-[#00BFFF] via-[#40CFFF] to-[#87CEFA] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-200"
            >
              <FiSave size={20} /> {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
