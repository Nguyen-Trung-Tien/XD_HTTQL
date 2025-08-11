import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function EditShipperForm({ shipper, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    status: "available",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (shipper) {
      setFormData({
        name: shipper.name || "",
        phoneNumber: shipper.phoneNumber || "",
        status: shipper.status || "available",
        address: shipper.address || "",
      });
    }
  }, [shipper]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    setLoading(true);
    try {
      const payload = {
        id: shipper.id,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        status: formData.status,
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
        <h2 className="text-xl font-bold mb-4">Cập nhật Shipper</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Tên shipper"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded "
            />
          </div>

          <div>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Số điện thoại"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded "
            />
          </div>

          <div>
            <input
              type="text"
              name="address"
              value={formData.address}
              disabled
              className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
              placeholder="Địa chỉ"
            />
          </div>

          <div>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled
              className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
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
            {loading ? "Đang cập nhật..." : "Cập nhật shipper"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditShipperForm;
