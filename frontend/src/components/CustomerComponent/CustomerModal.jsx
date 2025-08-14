import React, { useState } from "react";
import { FiSave } from "react-icons/fi";
import AddressAutocomplete from "../AddressAutocomplete";

export default function CustomerModal({
  isEditing,
  form,
  onChange,
  onClose,
  onSubmit,
}) {
  const [coords, setCoords] = useState(null);

  const handleSelect = (suggest) => {
    if (suggest?.lat && suggest?.lon) {
      onChange({
        target: { name: "address", value: suggest.display_name },
      });
      onChange({
        target: { name: "lat", value: parseFloat(suggest.lat) },
      });
      onChange({
        target: { name: "lng", value: parseFloat(suggest.lon) },
      });
      setCoords({ lat: parseFloat(suggest.lat), lng: parseFloat(suggest.lon) });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-500 transition"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          {isEditing ? "Cập nhật khách hàng" : "Thêm khách hàng"}
        </h2>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({
              ...form,
              lat: form.lat,
              lng: form.lng,
            });
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tên khách hàng
            </label>
            <input
              type="text"
              name="name"
              placeholder="Tên khách hàng"
              value={form.name}
              onChange={onChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Số điện thoại"
              value={form.phoneNumber}
              onChange={onChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Địa chỉ
            </label>
            <AddressAutocomplete
              value={form.address}
              onChange={(value) =>
                onChange({ target: { name: "address", value } })
              }
              onSelect={handleSelect}
            />
          </div>

          

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
