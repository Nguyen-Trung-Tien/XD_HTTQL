import React, { useState } from "react";
import { addNewShipper } from "../API/shipperAPI";
import { toast } from "react-toastify";
function AddShipperForm({ onSuccess, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    status: "available",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewShipper(formData);
      toast.success("Thêm thành công!");
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      toast.error("Thêm thất bại.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg relative">
        <button
          type="button"
          className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Thêm Shipper mới</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Tên"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="SĐT"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="available">Sẵn sàng</option>
            <option value="delivering">Đang giao</option>
          </select>
          <button
            type="submit"
             className="w-full px-4 py-2.5 gradient-bg rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddShipperForm;
