import React, { useEffect, useState } from "react";
import {
  fetchExportReceipts,
  createExportReceipt,
  updateExportReceipt,
  deleteExportReceipt,
} from "../../API/exportReceiptsApi/exportReceiptsApi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
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
        toast.success("Tải dữ liệu thành công!");
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#00BFFF]">
          Danh sách phiếu xuất
        </h2>
        <button
          onClick={openModal}
          className="px-4 py-2 rounded bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white font-semibold shadow-md hover:from-[#009acd] hover:to-[#6cb6ff] transition"
        >
          Thêm phiếu xuất
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Người xuất</th>
              <th className="px-4 py-2 border">Ngày xuất</th>
              <th className="px-4 py-2 border">Lý do</th>
              <th className="px-4 py-2 border">Ghi chú</th>
              <th className="px-4 py-2 border">Chi tiết sản phẩm</th>
              <th className="px-4 py-2 border">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-blue-50 align-top transition-colors"
              >
                <td className="px-4 py-2 border text-center">{r.id}</td>
                <td className="px-4 py-2 border">
                  {r.userData?.firstName ||
                    r.userData?.email ||
                    `User ID: ${r.userId}`}
                </td>
                <td className="px-4 py-2 border">
                  {new Date(r.export_date).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-4 py-2 border">{r.reason}</td>
                <td className="px-4 py-2 border">{r.note}</td>
                <td className="px-4 py-2 border max-w-md">
                  {r.exportDetailData?.length > 0 ? (
                    <ul className="list-disc pl-4 max-h-60 overflow-y-auto">
                      {r.exportDetailData.map((d) => (
                        <li key={d.id} className="mb-3 border-b pb-2">
                          <div>
                            <strong>Tên SP:</strong>{" "}
                            {d.productData?.name || d.productId}
                          </div>
                          <div>
                            <strong>Loại:</strong> {d.productData?.type}
                          </div>
                          <div>
                            <strong>Danh mục:</strong> {d.productData?.category}
                          </div>
                          <div>
                            <strong>Mô tả:</strong> {d.productData?.description}
                          </div>
                          <div>
                            <strong>Đơn vị:</strong> {d.productData?.unit}
                          </div>
                          <div>
                            <strong>Giá:</strong> {d.productData?.price} đ
                          </div>
                          <div>
                            <strong>Tồn kho:</strong> {d.productData?.stock}
                          </div>
                          <div>
                            <strong>Kho:</strong>{" "}
                            {d.productData?.warehouseAddress}
                          </div>
                          <div>
                            <strong>Tọa độ:</strong>{" "}
                            {d.productData?.warehouseLat},{" "}
                            {d.productData?.warehouseLng}
                          </div>
                          <div>
                            <strong>Trạng thái:</strong> {d.productData?.status}
                          </div>
                          <div>
                            <strong>Ngày tạo SP:</strong>{" "}
                            {new Date(d.productData?.createdAt).toLocaleString(
                              "vi-VN"
                            )}
                          </div>
                          <div>
                            <strong>Ngày cập nhật SP:</strong>{" "}
                            {new Date(d.productData?.updatedAt).toLocaleString(
                              "vi-VN"
                            )}
                          </div>
                          <div>
                            <strong>Số lượng xuất:</strong> {d.quantity}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-400">Không có sản phẩm</span>
                  )}
                </td>
                <td className="px-4 py-2 border text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleEdit(r)}
                      className="bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white p-2 rounded-full flex items-center justify-center hover:from-[#009acd] hover:to-[#6cb6ff] transition"
                      title="Sửa phiếu xuất"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full flex items-center justify-center transition"
                      title="Xóa phiếu xuất"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal thêm/sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-10 z-50 overflow-auto">
          <div className="bg-white p-6 rounded shadow w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {isEditing ? "Cập nhật phiếu xuất" : "Thêm phiếu xuất"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="userId"
                  placeholder="User ID"
                  value={form.userId}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="date"
                  name="export_date"
                  value={form.export_date}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <input
                type="text"
                name="reason"
                placeholder="Lý do"
                value={form.reason}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="note"
                placeholder="Ghi chú"
                value={form.note}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              {/* Chi tiết sản phẩm */}
              <div className="space-y-2">
                <h4 className="font-semibold">Chi tiết sản phẩm</h4>
                <div className="max-h-60 overflow-y-auto border rounded p-2 space-y-2">
                  {details.map((d, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="number"
                        placeholder="Product ID"
                        value={d.productId}
                        min="1"
                        onChange={(e) =>
                          handleDetailChange(i, "productId", e.target.value)
                        }
                        className="border p-2 rounded w-1/2"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Số lượng"
                        value={d.quantity}
                        onChange={(e) =>
                          handleDetailChange(i, "quantity", e.target.value)
                        }
                        className="border p-2 rounded w-1/4"
                        min="1"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeDetail(i)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addDetail}
                  className="bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white px-3 py-1 rounded mt-2"
                >
                  Thêm sản phẩm
                </button>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white px-4 py-2 rounded hover:from-[#009acd] hover:to-[#6cb6ff]"
                >
                  {isEditing ? "Cập nhật" : "Thêm mới"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
