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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg relative">
        {/* Nút đóng */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-500 transition"
        >
          ×
        </button>

        {/* Tiêu đề */}
        <h2 className="text-xl font-bold mb-4 text-center">
          {isEditing ? "Cập nhật khách hàng" : "Thêm khách hàng"}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={onSubmit}>
          {[
            { name: "name", label: "Tên khách hàng", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phoneNumber", label: "Số điện thoại", type: "text" },
            { name: "address", label: "Địa chỉ", type: "text" },
            { name: "city", label: "Thành phố", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                value={form[field.name]}
                onChange={onChange}
                required={field.name === "name" || field.name === "email"}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          ))}

          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Trạng thái
            </label>
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            >
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Ngừng hoạt động</option>
            </select>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 rounded-lg gradient-bg text-white font-semibold hover:opacity-90 transition-all"
            >
              <FiSave size={18} />
              {isEditing ? "Cập nhật" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
