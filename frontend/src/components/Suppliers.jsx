import React, { useEffect, useState } from "react";
import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../API/suppliers/suppliers";

export default function SupplierManager() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal form state
  const emptyForm = {
    name: "",
    phone: "",
    address: "",
    image: "",
    description: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Success message
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    filterSuppliers();
    setCurrentPage(1); // reset page on search
  }, [search, suppliers]);

  async function fetchSuppliers() {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllSuppliers();
      setSuppliers(data || []);
    } catch (err) {
      setError(err.message || "Lỗi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  function filterSuppliers() {
    if (!search.trim()) {
      setFilteredSuppliers(suppliers);
    } else {
      const lowerSearch = search.toLowerCase();
      setFilteredSuppliers(
        suppliers.filter((s) => s.name.toLowerCase().includes(lowerSearch))
      );
    }
  }

  // Pagination controls
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginatedSuppliers = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Open modal form for add or edit
  function openForm(supplier = null) {
    if (supplier) {
      setEditingSupplier(supplier);
      setForm({
        name: supplier.name || "",
        phone: supplier.phone || "",
        address: supplier.address || "",
        image: supplier.image || "",
        description: supplier.description || "",
      });
    } else {
      setEditingSupplier(null);
      setForm(emptyForm);
    }
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingSupplier(null);
    setForm(emptyForm);
    setError(null);
    setSuccessMsg(null);
  }

  function handleFormChange(e) {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      // Convert image file to base64 string for preview and upload
      const reader = new FileReader();
      reader.onload = () => {
        setForm((f) => ({ ...f, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  async function submitForm(e) {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      // Validate minimal
      if (!form.name.trim())
        throw new Error("Tên nhà cung cấp không được để trống");

      if (editingSupplier) {
        await updateSupplier(editingSupplier.id, form);
        setSuccessMsg("Cập nhật nhà cung cấp thành công!");
      } else {
        await createSupplier(form);
        setSuccessMsg("Thêm nhà cung cấp thành công!");
      }
      await fetchSuppliers();
      closeForm();
    } catch (err) {
      setError(err.message || "Lỗi khi lưu dữ liệu");
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Bạn có chắc muốn xóa nhà cung cấp này?")) return;

    try {
      await deleteSupplier(id);
      setSuccessMsg("Xóa nhà cung cấp thành công!");
      await fetchSuppliers();
    } catch (err) {
      setError(err.message || "Xóa thất bại");
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-3xl font-semibold mb-6">Quản lý Nhà cung cấp</h1>

        <div className="flex items-center mb-4 gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={() => openForm()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Thêm nhà cung cấp
          </button>
        </div>

        {loading && (
          <div className="text-center py-10">Đang tải dữ liệu...</div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {successMsg}
          </div>
        )}

        {!loading && !error && filteredSuppliers.length === 0 && (
          <div className="text-gray-500 text-center py-10">
            Không có nhà cung cấp nào.
          </div>
        )}

        {!loading && filteredSuppliers.length > 0 && (
          <>
            <table className="w-full border border-gray-300 rounded overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-3 text-left">#</th>
                  <th className="border px-4 py-3 text-left">Ảnh</th>
                  <th className="border px-4 py-3 text-left">
                    Tên nhà cung cấp
                  </th>
                  <th className="border px-4 py-3 text-left">Số điện thoại</th>
                  <th className="border px-4 py-3 text-left">Địa chỉ</th>
                  <th className="border px-4 py-3 text-left">Mô tả</th>
                  <th className="border px-4 py-3 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSuppliers.map((s, i) => (
                  <tr
                    key={s.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border px-4 py-3">
                      {(currentPage - 1) * itemsPerPage + i + 1}
                    </td>
                    <td className="border px-4 py-3">
                      {s.image ? (
                        <img
                          src={s.image}
                          alt={s.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center text-gray-500 text-xs">
                          No Img
                        </div>
                      )}
                    </td>
                    <td className="border px-4 py-3">{s.name}</td>
                    <td className="border px-4 py-3">{s.phone}</td>
                    <td className="border px-4 py-3">{s.address}</td>
                    <td className="border px-4 py-3 truncate max-w-xs">
                      {s.description}
                    </td>
                    <td className="border px-4 py-3 space-x-2">
                      <button
                        onClick={() => openForm(s)}
                        className="text-blue-600 hover:underline"
                        title="Sửa"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-red-600 hover:underline"
                        title="Xóa"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center space-x-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={`px-3 py-1 border rounded ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                {"<"}
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className={`px-3 py-1 border rounded ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                {">"}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold">
                {editingSupplier ? "Sửa nhà cung cấp" : "Thêm nhà cung cấp"}
              </h2>
              <button
                onClick={closeForm}
                className="text-gray-600 hover:text-gray-800"
                title="Đóng"
              >
                ✕
              </button>
            </div>
            <form onSubmit={submitForm} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="bg-green-100 text-green-700 p-3 rounded">
                  {successMsg}
                </div>
              )}

              <div>
                <label className="block mb-1 font-medium">
                  Tên nhà cung cấp
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Số điện thoại</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  type="tel"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Địa chỉ</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleFormChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Mô tả</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Ảnh nhà cung cấp
                </label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFormChange}
                  className="w-full"
                />
                {form.image && (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                  disabled={formLoading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {formLoading ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
