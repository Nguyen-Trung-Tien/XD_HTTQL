import React, { useEffect, useState } from "react";
import {
  getAllImportDetails,
  createImportDetail,
  updateImportDetail,
  deleteImportDetail,
} from "../API/Receipts/importDetail";

export default function ImportDetailsManager() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);

  // Form state
  const emptyForm = {
    importId: "",
    productId: "",
    quantity: 1,
    price: "",
  };
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    fetchDetails();
  }, []);

  async function fetchDetails() {
    setLoading(true);
    try {
      const data = await getAllImportDetails();
      setDetails(data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  function openCreateForm() {
    setEditingDetail(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEditForm(detail) {
    setEditingDetail(detail);
    setForm({
      importId: detail.importId || "",
      productId: detail.productId || "",
      quantity: detail.quantity || 1,
      price: detail.price || "",
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingDetail(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingDetail) {
        await updateImportDetail(editingDetail.id, form);
      } else {
        await createImportDetail(form);
      }
      await fetchDetails();
      closeForm();
    } catch (err) {
      alert(err.message || "Lỗi khi lưu dữ liệu");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Bạn có chắc muốn xóa chi tiết nhập này?")) return;
    try {
      await deleteImportDetail(id);
      setDetails((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err.message || "Xóa thất bại");
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded shadow overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Quản lý Chi tiết nhập</h1>
          <button
            onClick={openCreateForm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Thêm mới
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Đang tải...</div>
        ) : error ? (
          <div className="p-4 text-red-600">{error}</div>
        ) : details.length === 0 ? (
          <div className="p-4 text-gray-600 text-center">
            Chưa có dữ liệu chi tiết nhập
          </div>
        ) : (
          <table className="min-w-full text-sm text-left border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 border-b">#</th>
                <th className="px-4 py-3 border-b">ID Chi tiết</th>
                <th className="px-4 py-3 border-b">Phiếu nhập (ID)</th>
                <th className="px-4 py-3 border-b">Nhà cung cấp</th>
                <th className="px-4 py-3 border-b">Sản phẩm</th>
                <th className="px-4 py-3 border-b">Số lượng</th>
                <th className="px-4 py-3 border-b">Giá</th>
                <th className="px-4 py-3 border-b">Thành tiền</th>
                <th className="px-4 py-3 border-b">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {details.map((d, idx) => (
                <tr
                  key={d.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 border-b">{idx + 1}</td>
                  <td className="px-4 py-2 border-b">{d.id}</td>
                  <td className="px-4 py-2 border-b">{d.importId || "-"}</td>
                  <td className="px-4 py-2 border-b">
                    {d.importReceiptData?.supplierData?.name || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {d.productData?.name || "-"}
                  </td>
                  <td className="px-4 py-2 border-b">{d.quantity || 0}</td>
                  <td className="px-4 py-2 border-b">{d.price || "0"}</td>
                  <td className="px-4 py-2 border-b">
                    {(Number(d.quantity) * Number(d.price)).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b space-x-2">
                    <button
                      onClick={() => openEditForm(d)}
                      className="text-blue-600 hover:underline"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Form modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 overflow-auto max-h-[90vh]">
              <h2 className="text-xl font-semibold mb-4">
                {editingDetail ? "Sửa chi tiết nhập" : "Thêm chi tiết nhập"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Import ID
                  </label>
                  <input
                    type="number"
                    value={form.importId}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, importId: e.target.value }))
                    }
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product ID
                  </label>
                  <input
                    type="number"
                    value={form.productId}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, productId: e.target.value }))
                    }
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Số lượng
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.quantity}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        quantity: Number(e.target.value),
                      }))
                    }
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Giá</label>
                  <input
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 border rounded"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Lưu
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
