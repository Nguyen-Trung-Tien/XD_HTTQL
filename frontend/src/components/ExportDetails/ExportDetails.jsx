import React, { useEffect, useState } from "react";
import {
  createExportDetail,
  deleteExportDetail,
  fetchExportDetails,
  updateExportDetail,
} from "../../API/exportDetailsApi/exportDetailsApi";
import { FiPlus, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";

function ExportDetails() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    exportId: "",
    productId: "",
    quantity: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchExportDetails();
      setData(Array.isArray(res.data.data) ? res.data.data : []);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      toast.error("Lỗi Server 500");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        exportId: Number(form.exportId),
        productId: Number(form.productId),
        quantity: Number(form.quantity),
      };
      if (isEditing) await updateExportDetail(editId, payload);
      else await createExportDetail(payload);
      toast.success("Cập nhật thành công!");
      setForm({ exportId: "", productId: "", quantity: "" });
      setIsEditing(false);
      setEditId(null);
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      toast.error("Cập nhật thất bại!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      try {
        await deleteExportDetail(id);
        toast.success("Xóa đơn thành công!");
        loadData();
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        toast.error("Xóa không thành công!");
      }
    }
  };

  const handleEdit = (item) => {
    setForm({
      exportId: item.exportId,
      productId: item.productId,
      quantity: item.quantity,
    });
    setIsEditing(true);
    setEditId(item.id);
    setShowModal(true);
  };

  const totalQuantity = Array.isArray(data)
    ? data.reduce((sum, item) => sum + (item.quantity || 0), 0)
    : 0;
  const totalRevenue = Array.isArray(data)
    ? data.reduce(
        (sum, item) =>
          sum + Number(item.productData?.price || 0) * (item.quantity || 0),
        0
      )
    : 0;
  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.productData?.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold text-black">Quản lý phiếu xuất</h2>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1">
            <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={() => {
              setForm({ exportId: "", productId: "", quantity: "" });
              setIsEditing(false);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:from-[#009acd] hover:to-[#6cb6ff] text-white px-4 py-2 rounded-lg shadow font-semibold"
          >
            <FiPlus className="w-4 h-4" /> Thêm mới
          </button>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <span className="font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Tổng số lượng: {totalQuantity.toLocaleString()} sản phẩm
        </span>
        <span className="font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Tổng doanh thu: {totalRevenue.toLocaleString()} ₫
        </span>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-center font-semibold text-gray-900 border-b">
                ID
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">
                Phiếu xuất
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">
                Sản phẩm
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-900 border-b">
                Số lượng
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-900 border-b">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-900">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-100 transition-colors"
                >
                  <td className="px-4 py-3 text-center">{item.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">
                      ID: {item.exportReceiptData?.id || "—"}
                    </div>
                    <div className="text-gray-600 text-sm">
                      Ngày:{" "}
                      {item.exportReceiptData?.export_date
                        ? new Date(
                            item.exportReceiptData.export_date
                          ).toLocaleDateString("vi-VN")
                        : "—"}
                    </div>
                    <div className="text-gray-600 text-sm">
                      Lý do: {item.exportReceiptData?.reason || "—"}
                    </div>
                    <div className="text-gray-500 text-xs">
                      Ghi chú: {item.exportReceiptData?.note || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    {item.productData?.image?.data ? (
                      <img
                        src={`data:image/jpeg;base64,${btoa(
                          String.fromCharCode(...item.productData.image.data)
                        )}`}
                        alt={item.productData.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-400 rounded">
                        No Image
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {item.productData?.name || "—"}
                      </span>
                      <span className="text-gray-600 text-sm">
                        Loại: {item.productData?.type || "—"} | Giá:{" "}
                        {Number(item.productData?.price || 0).toLocaleString()}
                        ₫/{item.productData?.unit || "—"}
                      </span>
                      <span className="text-gray-500 text-xs">
                        Tồn kho: {item.productData?.stock || 0} | Kho:{" "}
                        {item.productData?.warehouseAddress || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center font-medium">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white rounded-full transition hover:brightness-90"
                      title="Sửa chi tiết"
                    >
                      <FiEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full transition hover:brightness-90"
                      title="Xóa chi tiết"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {isEditing ? "Cập nhật chi tiết xuất" : "Thêm mới chi tiết xuất"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">
                  Mã phiếu xuất
                </label>
                <input
                  type="number"
                  placeholder="Nhập ID phiếu xuất"
                  value={form.exportId}
                  onChange={(e) =>
                    setForm({ ...form, exportId: e.target.value })
                  }
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Mã sản phẩm</label>
                <input
                  type="number"
                  placeholder="Nhập ID sản phẩm"
                  value={form.productId}
                  onChange={(e) =>
                    setForm({ ...form, productId: e.target.value })
                  }
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Số lượng</label>
                <input
                  type="number"
                  placeholder="Nhập số lượng"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                  required
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:from-[#009acd] hover:to-[#6cb6ff] text-white px-4 py-2 rounded"
                >
                  {isEditing ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExportDetails;
