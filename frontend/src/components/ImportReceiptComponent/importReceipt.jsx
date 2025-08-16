import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  createImportReceipt,
  deleteImportReceipt,
  getAllImportReceipts,
  updateImportReceipt,
} from "../../API/importReceiptApi/importReceiptApi";

export default function ImportReceipts() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    supplierData: null,
    import_date: "",
    note: "",
    details: [],
  });

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllImportReceipts();
      setReceipts(res.data || res);
    } catch (e) {
      console.error(e);
      toast.error("Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete receipt
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa phiếu nhập này?")) return;
    try {
      await deleteImportReceipt(id);
      toast.success("Xóa thành công!");
      fetchData();
    } catch (e) {
      console.error(e);
      toast.error("Xóa thất bại!");
    }
  };

  // Open form for add or edit
  const openForm = (receipt = null) => {
    if (receipt) {
      setFormData({
        id: receipt.id,
        supplierData: receipt.supplierData || null,
        import_date: receipt.import_date?.split("T")[0] || "",
        note: receipt.note || "",
        details:
          receipt.importDetailData?.map((d) => ({
            productId: d.productId || "",
            productData: d.productData || { name: "" },
            quantity: d.quantity || 1,
            price: d.price || 0,
          })) || [],
      });
    } else {
      setFormData({
        id: null,
        supplierData: null,
        import_date: "",
        note: "",
        details: [],
      });
    }
    setShowForm(true);
  };

  // Handle form changes
  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Handle detail changes
  const handleDetailChange = (index, field, value) => {
    const newDetails = [...formData.details];
    if (field === "quantity" || field === "price") value = Number(value);
    if (field === "productData") newDetails[index].productData = value;
    else newDetails[index][field] = value;
    setFormData({ ...formData, details: newDetails });
  };

  const addDetail = () => {
    setFormData({
      ...formData,
      details: [
        ...formData.details,
        { productId: "", productData: { name: "" }, quantity: 1, price: 0 },
      ],
    });
  };

  const removeDetail = (index) => {
    const newDetails = [...formData.details];
    newDetails.splice(index, 1);
    setFormData({ ...formData, details: newDetails });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.supplierData || !formData.import_date) {
      toast.error("Vui lòng chọn nhà cung cấp và ngày nhập");
      return;
    }

    const payload = {
      supplierId: formData.supplierData.id,
      import_date: formData.import_date,
      note: formData.note,
      details: formData.details.map((d) => ({
        productId: d.productId,
        quantity: d.quantity,
        price: d.price,
      })),
    };

    try {
      if (formData.id) {
        await updateImportReceipt(formData.id, payload);
        toast.success("Cập nhật thành công!");
      } else {
        await createImportReceipt(payload);
        toast.success("Tạo phiếu nhập thành công!");
      }
      setShowForm(false);
      fetchData();
    } catch (e) {
      console.error(e);
      toast.error("Lỗi khi lưu phiếu nhập");
    }
  };

  const supplierOptions = [
    ...new Map(
      receipts
        .filter((r) => r.supplierData)
        .map((r) => [r.supplierData.id, r.supplierData])
    ).values(),
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-1 mb-4 text-gray-600 hover:text-gray-800 transition"
      >
        <FiArrowLeft /> Quay lại
      </button>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold ">Danh sách phiếu nhập</h1>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-2 px-5 py-2 rounded-lg shadow text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:scale-105 transition-transform duration-200"
        >
          <FiPlus /> Thêm mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-white text-gray-700 border-b">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Ngày nhập</th>
                <th className="px-4 py-3 text-left">Nhà cung cấp</th>
                <th className="px-4 py-3 text-left">Người nhập</th>
                <th className="px-4 py-3 text-left">Ghi chú</th>
                <th className="px-4 py-3 text-left">Chi tiết sản phẩm</th>
                <th className="px-4 py-3 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((r) => (
                <tr
                  key={r.id}
                  className="border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-2 text-center">{r.id}</td>
                  <td className="px-4 py-2">
                    {new Date(r.import_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {r.supplierData?.name || `ID ${r.supplierId}`}
                  </td>
                  <td className="px-4 py-2">
                    {r.userData?.name || `User #${r.userId}`}
                  </td>
                  <td className="px-4 py-2">{r.note}</td>
                  <td className="px-4 py-2">
                    <ul className="list-disc list-inside max-h-40 overflow-y-auto">
                      {r.importDetailData?.length ? (
                        r.importDetailData.map((d, i) => (
                          <li key={i}>
                            {d.productData?.name || `Sản phẩm #${d.productId}`}{" "}
                            - SL: {d.quantity} - Giá: {d.price}
                          </li>
                        ))
                      ) : (
                        <li>Chưa có sản phẩm</li>
                      )}
                    </ul>
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => openForm(r)}
                      className="p-2 rounded-lg flex items-center justify-center text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:scale-105 transition-transform duration-200"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="p-2 rounded-lg flex items-center justify-center text-white bg-red-500 hover:bg-red-600 hover:scale-105 transition-transform duration-200"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-16 z-50 overflow-auto">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-3xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 left-4 flex items-center gap-1 text-gray-600 hover:text-gray-800 transition"
            >
              <FiArrowLeft /> Quay lại
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">
              {formData.id ? "Sửa phiếu nhập" : "Thêm phiếu nhập"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Nhà cung cấp
                  </label>
                  <select
                    value={formData.supplierData?.id || ""}
                    onChange={(e) => {
                      const selected = supplierOptions.find(
                        (s) => s?.id === parseInt(e.target.value)
                      );
                      handleFormChange("supplierData", selected || null);
                    }}
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                  >
                    <option value="">--Chọn nhà cung cấp--</option>
                    {supplierOptions.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Ngày nhập
                  </label>
                  <input
                    type="date"
                    value={formData.import_date}
                    onChange={(e) =>
                      handleFormChange("import_date", e.target.value)
                    }
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Ghi chú
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => handleFormChange("note", e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Chi tiết sản phẩm
                </label>
                <div className="max-h-80 overflow-y-auto space-y-2">
                  {formData.details.map((d, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={d.productData?.name || ""}
                        onChange={(e) =>
                          handleDetailChange(i, "productData", {
                            name: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1 flex-1 focus:ring-2 focus:ring-blue-300 outline-none"
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="SL"
                        value={d.quantity}
                        onChange={(e) =>
                          handleDetailChange(i, "quantity", e.target.value)
                        }
                        className="border rounded px-2 py-1 w-20 focus:ring-2 focus:ring-blue-300 outline-none"
                      />
                      <input
                        type="number"
                        min="0"
                        placeholder="Giá"
                        value={d.price}
                        onChange={(e) =>
                          handleDetailChange(i, "price", e.target.value)
                        }
                        className="border rounded px-2 py-1 w-28 focus:ring-2 focus:ring-blue-300 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeDetail(i)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addDetail}
                  className="flex items-center gap-1 mt-2 text-green-500 hover:text-green-700 transition"
                >
                  <FiPlus /> Thêm chi tiết
                </button>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 rounded border hover:bg-gray-100 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white rounded shadow hover:scale-105 transition-transform duration-200"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
