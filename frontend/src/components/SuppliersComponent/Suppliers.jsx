import React, { useEffect, useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiSearch,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
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

  const goToPage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-textPrimary mb-6">
        Quản lý nhà cung cấp
      </h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
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
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SĐT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Địa chỉ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mô tả
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {suppliers.map((supplier) => (
                    <tr
                      key={supplier.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                        {supplier.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {supplier.name || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {supplier.phoneNumber || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {supplier.address || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {supplier.description || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleEdit(supplier)}
                            className="p-1 text-primary hover:text-blue-500 transition-colors rounded"
                            title="Sửa nhà cung cấp"
                          >
                            <FiEdit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(supplier.id)}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                            title="Xóa nhà cung cấp"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-5 flex-wrap">
              <button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trang đầu
              </button>
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => goToPage(pageNumber)}
                    className={`px-3 py-1 border border-gray-300 rounded-md transition-colors ${
                      currentPage === pageNumber
                        ? "bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white shadow"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiChevronRight size={18} />
              </button>
              <button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trang cuối
              </button>
            </div>
          </>
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

export default SuppliersPage;
