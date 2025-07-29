import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { addNewShipper } from "../API/shipper/shipperApi";
import { toast } from "react-toastify";
import AddressAutocomplete from "./AddressAutocomplete";

export default function AddShipperForm({ onSuccess, onClose }) {
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

    if (!formData.name.trim()) {
      toast.error("Vui lòng nhập tên shipper");
      return;
    }
    if (!formData.phoneNumber.trim()) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }
    if (!coords) {
      toast.error("Vui lòng nhập địa chỉ ");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        lat: coords.lat,
        lng: coords.lng,
      };
      const res = await addNewShipper(payload);
      toast.success("Thêm shipper thành công!");
      onSuccess?.(res.data || res);
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Thêm shipper thất bại!");
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
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Số điện thoại"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
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
