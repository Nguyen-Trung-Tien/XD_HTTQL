import React, { useEffect, useState } from "react";
import {
  fetchExportReceipts,
  createExportReceipt,
  updateExportReceipt,
  deleteExportReceipt,
} from "../../API/exportReceiptsApi/exportReceiptsApi";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ExportReceiptsTable() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    userId: "",
    export_date: "",
    reason: "",
    note: "",
  });
  const [details, setDetails] = useState([{ productId: "", quantity: "" }]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const loadData = () => {
    setLoading(true);
    fetchExportReceipts()
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : res.data.data;
        setReceipts(arr || []);
      })
      .catch((err) => {
        console.error("Lỗi tải dữ liệu:", err);
        toast.error("Lỗi tải dữ liệu!");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const addDetail = () =>
    setDetails([...details, { productId: "", quantity: "" }]);
  const removeDetail = (index) =>
    setDetails(details.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, exportDetailData: details };
    const action = isEditing
      ? updateExportReceipt(editId, payload)
      : createExportReceipt(payload);

    action
      .then(() => {
        loadData();
        closeModal();
        toast.success(
          isEditing
            ? "Cập nhật phiếu xuất thành công!"
            : "Thêm phiếu xuất thành công!"
        );
      })
      .catch(() => toast.error("Đã có lỗi xảy ra!"));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setForm({ userId: "", export_date: "", reason: "", note: "" });
    setDetails([{ productId: "", quantity: "" }]);
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (receipt) => {
    setForm({
      userId: receipt.userId,
      export_date: receipt.export_date?.split("T")[0],
      reason: receipt.reason,
      note: receipt.note,
    });
    setDetails(
      receipt.exportDetailData?.map((d) => ({
        productId: d.productId,
        quantity: d.quantity,
      })) || [{ productId: "", quantity: "" }]
    );
    setEditId(receipt.id);
    setIsEditing(true);
    openModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phiếu xuất này?")) {
      deleteExportReceipt(id)
        .then(() => {
          loadData();
          toast.success("Xóa phiếu xuất thành công!");
        })
        .catch(() => toast.error("Xóa phiếu xuất thất bại!"));
    }
  };

  if (loading)
    return (
      <div className="text-center py-6 text-gray-500">Đang tải dữ liệu...</div>
    );

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-textPrimary mb-6">
          Danh sách phiếu xuất
        </h1>
        <button
          onClick={openModal}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:scale-105 transition-transform duration-200"
        >
          <FiPlus /> Thêm mới
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Người xuất
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ngày xuất
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Lý do
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ghi chú
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Chi tiết sản phẩm
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {receipts.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm text-gray-700 text-center">
                    {r.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {r.userData?.firstName ||
                      r.userData?.email ||
                      `User ID: ${r.userId}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(r.export_date).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {r.reason}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{r.note}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {r.exportDetailData?.length > 0 ? (
                      <ul className="list-disc pl-4 max-h-60 overflow-y-auto space-y-2 text-black">
                        {r.exportDetailData.map((d) => (
                          <li
                            key={d.id}
                            className="pb-2 border-b last:border-b-0"
                          >
                            <div>
                              <strong>SP:</strong>{" "}
                              {d.StockProductData?.name || d.productId}
                            </div>
                            <div>
                              <strong>Loại:</strong> {d.StockProductData?.type}
                            </div>
                            <div>
                              <strong>Danh mục:</strong>{" "}
                              {d.StockProductData?.category}
                            </div>
                            <div>
                              <strong>Số lượng xuất:</strong> {d.quantity}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">Không có sản phẩm</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 text-center">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => handleEdit(r)}
                        className="p-1 text-primary hover:text-blue-500 transition-colors rounded"
                      >
                        <FiEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
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

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-10 z-50 overflow-auto">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-sky-700 text-center">
                {isEditing ? "Cập nhật phiếu xuất" : "Thêm phiếu xuất"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <small className="text-gray-500 text-xs mb-1">
                      ID người dùng thực hiện xuất kho
                    </small>
                    <input
                      type="number"
                      name="userId"
                      placeholder="User ID"
                      value={form.userId}
                      onChange={handleChange}
                      min={1}
                      required
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <small className="text-gray-500 text-xs mb-1">
                      Ngày thực hiện xuất kho
                    </small>
                    <input
                      type="date"
                      name="export_date"
                      value={form.export_date}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <small className="text-gray-500 text-xs mb-1">
                    Lý do xuất kho (ví dụ: bán hàng, trả hàng)
                  </small>
                  <input
                    type="text"
                    name="reason"
                    placeholder="Lý do"
                    value={form.reason}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                  />
                </div>
                <div className="flex flex-col">
                  <small className="text-gray-500 text-xs mb-1">
                    Ghi chú thêm (nếu cần)
                  </small>
                  <input
                    type="text"
                    name="note"
                    placeholder="Ghi chú"
                    value={form.note}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                  />
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">
                    Chi tiết sản phẩm
                  </h4>
                  <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-xl p-3 space-y-3">
                    {details.map((d, i) => (
                      <div key={i} className="flex gap-3 items-end">
                        <div className="flex flex-col w-1/2">
                          <small className="text-gray-500 text-xs mb-1">
                            Mã sản phẩm
                          </small>
                          <input
                            type="number"
                            placeholder="Product ID"
                            value={d.productId}
                            min={1}
                            onChange={(e) =>
                              handleDetailChange(i, "productId", e.target.value)
                            }
                            required
                            className="w-full p-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                          />
                        </div>
                        <div className="flex flex-col w-1/4">
                          <small className="text-gray-500 text-xs mb-1">
                            Số lượng
                          </small>
                          <input
                            type="number"
                            placeholder="Số lượng"
                            value={d.quantity}
                            min={1}
                            onChange={(e) =>
                              handleDetailChange(i, "quantity", e.target.value)
                            }
                            required
                            className="w-full p-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDetail(i)}
                          className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 transition"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addDetail}
                    className="bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white px-4 py-2 rounded-xl hover:from-[#009acd] hover:to-[#6cb6ff] transition mt-2"
                  >
                    Thêm sản phẩm
                  </button>
                </div>
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white px-5 py-2 rounded-xl hover:from-[#009acd] hover:to-[#6cb6ff] transition font-medium shadow-md"
                  >
                    {isEditing ? "Cập nhật" : "Thêm mới"}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-400 text-white px-5 py-2 rounded-xl hover:bg-gray-500 transition font-medium"
                  >
                    Hủy
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
