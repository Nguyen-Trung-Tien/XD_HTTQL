import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddressAutocomplete from "../AddressAutocomplete";

export default function AddShipperForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    status: "available",
    address: "",
  });
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (suggest) => {
    if (suggest?.lat && suggest?.lon) {
      setFormData((prev) => ({ ...prev, address: suggest.display_name }));
      setCoords({ lat: parseFloat(suggest.lat), lng: parseFloat(suggest.lon) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^(0|\+84)[0-9]{9}$/;

    if (!formData.name.trim()) {
      toast.error("Vui lòng nhập tên shipper");
      return;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error(
        "Số điện thoại không hợp lệ. Vui lòng nhập 10 số, bắt đầu bằng 0 hoặc +84."
      );
      return;
    }

    if (!coords) {
      toast.error("Vui lòng chọn một địa chỉ hợp lệ");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        lat: coords.lat,
        lng: coords.lng,
      };

      if (onSubmit) {
        await onSubmit(payload);
      }
    } catch (err) {
      console.error("Lỗi khi submit form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg relative w-full">
        <button
          type="button"
          className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Thêm Shipper mới</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Tên shipper"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Số điện thoại"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div>
            <AddressAutocomplete
              value={formData.address}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, address: value }))
              }
              onSelect={handleSelect}
            />
          </div>

          <div>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            >
              <option value="available">Sẵn sàng</option>
              <option value="delivering">Đang giao</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 gradient-bg rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Đang thêm..." : "Thêm shipper"}
          </button>
        </form>
      </div>
    </div>
  );
}
