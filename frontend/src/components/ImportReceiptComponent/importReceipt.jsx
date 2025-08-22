import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  createImportReceipt,
  deleteImportReceipt,
  getAllImportReceipts,
  updateImportReceipt,
} from "../../API/importReceiptApi/importReceiptApi";
import { getManySupplier } from "../../API/suppliersApi/suppliersApi";

export default function ImportReceipts() {
  const [receipts, setReceipts] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]); // state riêng cho supplier
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    supplierData: null,
    import_date: "",
    note: "",
    details: [],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllImportReceipts();
      setReceipts(res.data || res);
    } catch (e) {
      console.error(e);
      toast.error("Lỗi khi tải dữ liệu phiếu nhập");
    } finally {
      setLoading(false);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const data = await getManySupplier();
      const uniqueSuppliers = [
        ...new Map(data.map((s) => [s.name, s])).values(),
      ];
      setSupplierOptions(uniqueSuppliers);
    } catch (e) {
      console.error(e);
      toast.error("Lỗi khi tải danh sách nhà cung cấp");
    }
  };

  useEffect(() => {
    fetchData();
    fetchSuppliers();
  }, []);

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

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

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

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-2">
          <h1 className="text-2xl font-bold text-textPrimary mb-6">
            Danh sách phiếu nhập
          </h1>
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
          <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th> */}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày nhập
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nhà cung cấp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người nhập
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ghi chú
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chi tiết sản phẩm
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                      {r.id}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {new Date(r.import_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {r.supplierData?.name || `ID ${r.supplierId}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {r.userData?.name || `User #${r.userId}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {r.note}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <ul className="list-disc list-inside max-h-40 overflow-y-auto">
                        {r.importDetailData?.length ? (
                          r.importDetailData.map((d, i) => (
                            <li key={i}>
                              {d.productData?.name ||
                                `Sản phẩm #${d.productId}`}{" "}
                              - SL: {d.quantity} - Giá: {d.price}
                            </li>
                          ))
                        ) : (
                          <li>Chưa có sản phẩm</li>
                        )}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => openForm(r)}
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
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-16 z-50 overflow-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl relative border border-gray-100">
              {/* Back Button */}
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 left-4 flex items-center gap-1 text-gray-600 hover:text-gray-800 font-medium transition"
              >
                <FiArrowLeft /> Quay lại
              </button>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-6 text-center text-sky-700">
                {formData.id ? "Sửa phiếu nhập" : "Thêm phiếu nhập"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Supplier & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <small className="text-gray-500 text-xs mb-1">
                      Chọn nhà cung cấp cho phiếu nhập
                    </small>
                    <label className="block mb-1 font-medium text-gray-700">
                      Nhà cung cấp
                    </label>
                    <select
                      value={formData.supplierData?.id || ""}
                      onChange={(e) => {
                        const selected = supplierOptions.find(
                          (s) => s.id === parseInt(e.target.value)
                        );
                        handleFormChange("supplierData", selected || null);
                      }}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                    >
                      <option value="">--Chọn nhà cung cấp--</option>
                      {supplierOptions.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <small className="text-gray-500 text-xs mb-1">
                      Chọn ngày nhập hàng
                    </small>
                    <label className="block mb-1 font-medium text-gray-700">
                      Ngày nhập
                    </label>
                    <input
                      type="date"
                      value={formData.import_date}
                      onChange={(e) =>
                        handleFormChange("import_date", e.target.value)
                      }
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                    />
                  </div>
                </div>

                {/* Note */}
                <div className="flex flex-col">
                  <small className="text-gray-500 text-xs mb-1">
                    Nhập ghi chú liên quan đến phiếu nhập
                  </small>
                  <label className="block mb-1 font-medium text-gray-700">
                    Ghi chú
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => handleFormChange("note", e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                  />
                </div>

                {/* Product Details */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">
                    Chi tiết sản phẩm
                  </h4>
                  <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-xl p-3 space-y-3">
                    {formData.details.map((d, i) => (
                      <div key={i} className="flex gap-3 items-end">
                        <div className="flex-1 flex flex-col">
                          <small className="text-gray-500 text-xs mb-1">
                            Tên sản phẩm
                          </small>
                          <input
                            type="text"
                            value={d.productData?.name || ""}
                            onChange={(e) =>
                              handleDetailChange(i, "productData", {
                                name: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                          />
                        </div>

                        <div className="flex flex-col w-20">
                          <small className="text-gray-500 text-xs mb-1">
                            SL
                          </small>
                          <input
                            type="number"
                            min="1"
                            placeholder="SL"
                            value={d.quantity}
                            onChange={(e) =>
                              handleDetailChange(i, "quantity", e.target.value)
                            }
                            className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                          />
                        </div>

                        <div className="flex flex-col w-28">
                          <small className="text-gray-500 text-xs mb-1">
                            Giá
                          </small>
                          <input
                            type="number"
                            min="0"
                            placeholder="Giá"
                            value={d.price}
                            onChange={(e) =>
                              handleDetailChange(i, "price", e.target.value)
                            }
                            className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeDetail(i)}
                          className="text-red-500 hover:text-red-700 transition self-end mt-5"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addDetail}
                    className="flex items-center gap-1 mt-2 text-green-500 hover:text-green-700 transition font-medium"
                  >
                    <FiPlus /> Thêm chi tiết
                  </button>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white rounded-xl shadow hover:scale-105 transition-transform duration-200 font-medium"
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
