import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiSearch, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../../API/suppliersApi/suppliersApi";
import { useNavigate } from "react-router";

export default function SuppliersPage() {
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

  const navigate = useNavigate();

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const res = await getAllSuppliers({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
      });
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

  const handleClickImportDetail = () => navigate("/ImportDetails");
  const handleClickImportReceipt = () => navigate("/ImportReceipts");

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Quản lý nhà cung cấp
        </h1>

        {/* Top controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full max-w-sm bg-gray-50">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Tìm kiếm nhà cung cấp..."
              className="flex-1 outline-none bg-gray-50 text-gray-700"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="flex flex-wrap gap-3">
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
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:scale-105 transition-transform duration-200"
            >
              <FiPlus /> Thêm nhà cung cấp
            </button>

            <button
              onClick={handleClickImportDetail}
              className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:scale-105 transition-transform duration-200"
            >
              Quản lý nhập hàng
            </button>

            <button
              onClick={handleClickImportReceipt}
              className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:scale-105 transition-transform duration-200"
            >
              Danh sách phiếu nhập
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center py-12">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-3"></div>
            <span className="text-gray-500">Đang tải danh sách...</span>
          </div>
        ) : suppliers.length === 0 ? (
          <p className="text-center py-12 text-gray-400 text-lg">
            Không có nhà cung cấp nào.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg shadow-sm bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Tên</th>
                  <th className="p-3 border">SĐT</th>
                  <th className="p-3 border">Địa chỉ</th>
                  <th className="p-3 border">Mô tả</th>
                  <th className="p-3 border">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr
                    key={supplier.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="p-3 border text-center">{supplier.id}</td>
                    <td className="p-3 border">{supplier.name || "-"}</td>
                    <td className="p-3 border">
                      {supplier.phoneNumber || "-"}
                    </td>
                    <td className="p-3 border">{supplier.address || "-"}</td>
                    <td className="p-3 border">
                      {supplier.description || "-"}
                    </td>
                    <td className="p-3 border flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(supplier)}
                        className="p-2 rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:scale-105 transition-transform duration-200"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(supplier.id)}
                        className="p-2 rounded-lg text-white bg-red-500 hover:bg-red-600 hover:scale-105 transition-transform duration-200"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-5 flex-wrap">
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                First
              </button>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`px-4 py-1 rounded-lg font-medium transition-colors duration-200 ${
                      currentPage === pageNumber
                        ? "bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white shadow"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Last
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md transform transition-transform duration-300 scale-100">
              <h2 className="text-xl font-semibold mb-5 text-gray-700">
                {isEditing ? "Cập nhật nhà cung cấp" : "Thêm nhà cung cấp"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tên nhà cung cấp"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-300 outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-300 outline-none"
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm({ ...form, phoneNumber: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-300 outline-none"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Mô tả"
                  className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-300 outline-none"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:scale-105 transition-transform duration-200"
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
