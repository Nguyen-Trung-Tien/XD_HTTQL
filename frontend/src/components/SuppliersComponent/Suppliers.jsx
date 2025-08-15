import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import {
getAllSuppliers,
createSupplier,
updateSupplier,
deleteSupplier,
} from "../../API/suppliersApi/suppliersApi";

function SuppliersPage() {
const [suppliers, setSuppliers] = useState([]);
const [loading, setLoading] = useState(true);
const [form, setForm] = useState({
name: "",
phoneNumber: "",
address: "",
description: "",
});
const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(8);
const [totalPages, setTotalPages] = useState(1);
const [isModalOpen, setIsModalOpen] = useState(false);

const fetchSuppliers = async () => {
setLoading(true);
try {
const res = await getAllSuppliers(currentPage, itemsPerPage, searchTerm);
setSuppliers(res.suppliers || []);
setTotalPages(res.totalPages || 1);
} catch (error) {
toast.error(error.message || "Failed to fetch suppliers");
setSuppliers([]);
setTotalPages(1);
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchSuppliers();
}, [currentPage, searchTerm]);

const handleSubmit = async (e) => {
e.preventDefault();
try {
if (isEditing) {
await updateSupplier(editId, form);
toast.success("Cập nhật nhà cung cấp thành công");
} else {
await createSupplier(form);
toast.success("Thêm nhà cung cấp thành công");
}
setForm({ name: "", phoneNumber: "", address: "", description: "" });
setIsEditing(false);
setEditId(null);
setIsModalOpen(false);
fetchSuppliers();
} catch (error) {
toast.error(error.message || "Thao tác thất bại");
}
};

const handleEdit = (supplier) => {
setForm({
name: supplier.name || "",
phoneNumber: supplier.phoneNumber || "",
address: supplier.address || "",
description: supplier.description || "",
});
setIsEditing(true);
setEditId(supplier.id);
setIsModalOpen(true);
};

const handleDelete = async (id) => {
if (window.confirm("Bạn có chắc muốn xóa nhà cung cấp này?")) {
try {
await deleteSupplier(id);
toast.success("Xóa thành công");
fetchSuppliers();
} catch (error) {
toast.error(error.message || "Xóa thất bại");
}
}
};

return (
<div className="p-6">
<div className="p-6 bg-white rounded shadow-md">
<h1 className="text-2xl font-bold mb-4">Quản lý nhà cung cấp</h1>

    {/* Thanh search + các nút hành động */}
    <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-4">
      {/* Search */}
      <div className="flex items-center border rounded px-2 flex-1 max-w-sm">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="p-2 outline-none flex-1 rounded-lg"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Các nút */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => {
            setForm({
              name: "",
              phoneNumber: "",
              address: "",
              description: "",
            });
            setIsEditing(false);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:opacity-90"
        >
          <FiPlus /> Thêm nhà cung cấp
        </button>
        <button
          onClick={() => alert("Đang phát triển")}
          className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:opacity-90"
        >
          Nhập hóa đơn
        </button>
        <button
          onClick={() => alert("Đang phát triển")}
          className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:opacity-90"
        >
          Quản lý hóa đơn
        </button>
      </div>
    </div>

    {/* Loading / Bảng dữ liệu */}
    {loading ? (
      <div className="flex flex-col items-center py-10">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-2"></div>
        <span className="text-gray-600">Đang tải danh sách...</span>
      </div>
    ) : suppliers.length === 0 ? (
      <p className="text-center py-10 text-gray-500">
        Không có nhà cung cấp nào.
      </p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg shadow-sm bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">SĐT</th>
              <th className="p-2 border">Địa chỉ</th>
              <th className="p-2 border">Mô tả</th>
              <th className="p-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td className="p-2 border">{supplier.id}</td>
                <td className="p-2 border">{supplier.name || "-"}</td>
                <td className="p-2 border">
                  {supplier.phoneNumber || "-"}
                </td>
                <td className="p-2 border">{supplier.address || "-"}</td>
                <td className="p-2 border">
                  {supplier.description || "-"}
                </td>
                <td className="p-2 border flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(supplier)}
                    className="p-2 rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA]"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(supplier.id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phân trang */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    )}

    {/* Popup form */}
    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">
            {isEditing ? "Cập nhật nhà cung cấp" : "Thêm nhà cung cấp"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Tên nhà cung cấp"
              className="border p-2 rounded-lg w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              className="border p-2 rounded-lg w-full"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Địa chỉ"
              className="border p-2 rounded-lg w-full"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Mô tả"
              className="border p-2 rounded-lg w-full"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-300"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA]"
              >
                {isEditing ? "Cập nhật" : "Thêm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
</div>
);
}
export default SuppliersPage;