import React, { useEffect, useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiArrowLeft,
  FiSearch,
} from "react-icons/fi";
import { toast } from "react-toastify";
import {
  createImportReceipt,
  deleteImportReceipt,
  getAllImportReceipts,
  updateImportReceipt,
} from "../../API/importReceiptApi/importReceiptApi";
import { getManySupplier } from "../../API/suppliersApi/suppliersApi";
import { useLocation } from "react-router-dom";

const CURRENCY_UNIT = "VND";

export default function ImportManagement() {
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReceiptForm, setShowReceiptForm] = useState(false);
  const [receiptFormData, setReceiptFormData] = useState({
    id: null,
    supplierData: null,
    import_date: "",
    note: "",
    details: [],
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state?.openForm) {
      setShowReceiptForm(true);
    }
  }, [location.state]);

  const fetchReceipts = async () => {
    setLoading(true);
    try {
      const res = await getAllImportReceipts();
      const receiptData = res.data || res;
      setReceipts(receiptData);
      setFilteredReceipts(receiptData);
      const products = receiptData
        .flatMap((r) => r.importDetailData || [])
        .map((d) => d.productData)
        .filter((p) => p && p.id && p.name && p.unit);
      setProductOptions([...new Map(products.map((p) => [p.id, p])).values()]);
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
    fetchReceipts();
    fetchSuppliers();
  }, []);

  useEffect(() => {
    const filtered = receipts.filter(
      (r) =>
        r.supplierData?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        r.note?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        new Date(r.import_date).toLocaleDateString().includes(searchQuery)
    );
    setFilteredReceipts(filtered);
  }, [searchQuery, receipts]);

  const handleReceiptDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa phiếu nhập này?")) return;
    try {
      await deleteImportReceipt(id);
      toast.success("Xóa phiếu nhập thành công!");
      fetchReceipts();
    } catch (e) {
      console.error(e);
      toast.error("Xóa phiếu nhập thất bại!");
    }
  };

  const openReceiptForm = (receipt = null) => {
    if (receipt) {
      setReceiptFormData({
        id: receipt.id,
        supplierData: receipt.supplierData || null,
        import_date: receipt.import_date?.split("T")[0] || "",
        note: receipt.note || "",
        details:
          receipt.importDetailData?.map((d) => ({
            productId: d.productId || "",
            productData: d.productData || { name: "", unit: "" },
            quantity: d.quantity || 1,
            price: d.price || 0,
          })) || [],
      });
    } else {
      setReceiptFormData({
        id: null,
        supplierData: null,
        import_date: "",
        note: "",
        details: [],
      });
    }
    setShowReceiptForm(true);
  };

  const handleReceiptFormChange = (field, value) => {
    setReceiptFormData({ ...receiptFormData, [field]: value });
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...receiptFormData.details];
    if (field === "quantity" || field === "price") value = Number(value);
    if (field === "productId") {
      const selectedProduct = productOptions.find((p) => p.id === value);
      newDetails[index].productData = selectedProduct || { name: "", unit: "" };
    }
    newDetails[index][field] = value;
    setReceiptFormData({ ...receiptFormData, details: newDetails });
  };

  const addReceiptDetail = () => {
    setReceiptFormData({
      ...receiptFormData,
      details: [
        ...receiptFormData.details,
        {
          productId: "",
          productData: { name: "", unit: "" },
          quantity: 1,
          price: 0,
        },
      ],
    });
  };

  const removeReceiptDetail = (index) => {
    const newDetails = [...receiptFormData.details];
    newDetails.splice(index, 1);
    setReceiptFormData({ ...receiptFormData, details: newDetails });
  };

  const handleReceiptSubmit = async (e) => {
    e.preventDefault();
    if (!receiptFormData.supplierData || !receiptFormData.import_date) {
      toast.error("Vui lòng chọn nhà cung cấp và ngày nhập");
      return;
    }
    if (
      receiptFormData.details.length === 0 ||
      receiptFormData.details.some(
        (d) => !d.productId || d.quantity <= 0 || d.price < 0
      )
    ) {
      toast.error("Vui lòng nhập đầy đủ chi tiết sản phẩm hợp lệ");
      return;
    }
    if (
      new Set(receiptFormData.details.map((d) => d.productId)).size !==
      receiptFormData.details.length
    ) {
      toast.error("Không được chọn sản phẩm trùng lặp trong chi tiết");
      return;
    }

    const payload = {
      supplierId: receiptFormData.supplierData.id,
      import_date: receiptFormData.import_date,
      note: receiptFormData.note,
      details: receiptFormData.details.map((d) => ({
        productId: d.productId,
        quantity: d.quantity,
        price: d.price,
      })),
    };

    try {
      if (receiptFormData.id) {
        await updateImportReceipt(receiptFormData.id, payload);
        toast.success("Cập nhật phiếu nhập thành công!");
      } else {
        await createImportReceipt(payload);
        toast.success("Tạo phiếu nhập thành công!");
      }
      setShowReceiptForm(false);
      fetchReceipts();
    } catch (e) {
      console.error(e);
      toast.error("Lỗi khi lưu phiếu nhập");
    }
  };

  const calculateTotalCost = (details) =>
    // Modified to include currency unit
    `${details.reduce(
      (sum, d) => sum + d.quantity * d.price,
      0
    )} ${CURRENCY_UNIT}`;

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-textPrimary mb-6">
        Quản lý phiếu nhập
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
          <h2 className="text-xl font-semibold text-textPrimary">
            Danh sách phiếu nhập
          </h2>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo nhà cung cấp, ghi chú hoặc ngày nhập"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
              />
            </div>
            <button
              onClick={() => openReceiptForm()}
              className="flex items-center gap-2 px-5 py-2 rounded-lg shadow text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:scale-105 transition-transform duration-200"
            >
              <FiPlus /> Thêm phiếu nhập
            </button>
          </div>
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày nhập
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nhà cung cấp
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ghi chú
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chi tiết sản phẩm
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng giá
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReceipts.length > 0 ? (
                  filteredReceipts.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {new Date(r.import_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {r.supplierData?.name || `ID ${r.supplierId}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {r.note || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <ul className="list-disc list-inside max-h-40 overflow-y-auto">
                          {r.importDetailData?.length ? (
                            r.importDetailData.map((d, i) => (
                              <li key={i}>
                                {d.productData?.name ||
                                  `Sản phẩm #${d.productId}`}{" "}
                                - SL: {d.quantity}{" "}
                                {d.productData?.unit || "đơn vị"} - Giá:{" "}
                                {d.price} {CURRENCY_UNIT}{" "}
                                {/* Added currency unit */}
                              </li>
                            ))
                          ) : (
                            <li>Chưa có sản phẩm</li>
                          )}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {calculateTotalCost(r.importDetailData || [])}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => openReceiptForm(r)}
                            className="p-1 text-primary hover:text-blue-500 transition-colors rounded"
                          >
                            <FiEdit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleReceiptDelete(r.id)}
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-6 text-gray-400 text-base"
                    >
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {showReceiptForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-16 z-50 overflow-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl relative border border-gray-100">
              <button
                onClick={() => setShowReceiptForm(false)}
                className="absolute top-4 left-4 flex items-center gap-1 text-gray-600 hover:text-gray-800 font-medium transition"
              >
                <FiArrowLeft /> Quay lại
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center text-sky-700">
                {receiptFormData.id ? "Sửa phiếu nhập" : "Thêm phiếu nhập"}
              </h2>
              <form onSubmit={handleReceiptSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <small className="text-gray-500 text-xs mb-1">
                      Chọn nhà cung cấp
                    </small>
                    <label className="block mb-1 font-medium text-gray-700">
                      Nhà cung cấp
                    </label>
                    <select
                      value={receiptFormData.supplierData?.id || ""}
                      onChange={(e) => {
                        const selected = supplierOptions.find(
                          (s) => s.id === parseInt(e.target.value)
                        );
                        handleReceiptFormChange(
                          "supplierData",
                          selected || null
                        );
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
                      Chọn ngày nhập
                    </small>
                    <label className="block mb-1 font-medium text-gray-700">
                      Ngày nhập
                    </label>
                    <input
                      type="date"
                      value={receiptFormData.import_date}
                      onChange={(e) =>
                        handleReceiptFormChange("import_date", e.target.value)
                      }
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-700">
                      Chi tiết sản phẩm
                    </h4>
                  </div>
                  <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-xl p-3 space-y-3">
                    {receiptFormData.details.map((d, i) => (
                      <div key={i} className="flex gap-3 items-end">
                        <div className="flex flex-col flex-1">
                          <small className="text-gray-500 text-xs mb-1">
                            Sản phẩm
                          </small>
                          <select
                            value={d.productId}
                            onChange={(e) =>
                              handleDetailChange(i, "productId", e.target.value)
                            }
                            className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                          >
                            <option value="">--Chọn sản phẩm--</option>
                            {productOptions.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name} (ID: {p.id}, Đơn vị: {p.unit})
                              </option>
                            ))}
                          </select>
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
                        <div className="flex flex-col w-20">
                          <small className="text-gray-500 text-xs mb-1">
                            Đơn vị
                          </small>
                          <input
                            type="text"
                            value={d.productData?.unit || ""}
                            disabled
                            className="w-full p-2 border border-gray-200 rounded-xl bg-gray-100 text-gray-600"
                          />
                        </div>
                        <div className="flex flex-col w-28">
                          <small className="text-gray-500 text-xs mb-1">
                            Giá ({CURRENCY_UNIT}) {/* Added currency unit */}
                          </small>
                          <input
                            type="number"
                            min="0"
                            placeholder={`Giá (${CURRENCY_UNIT})`}
                            value={d.price}
                            onChange={(e) =>
                              handleDetailChange(i, "price", e.target.value)
                            }
                            className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeReceiptDetail(i)}
                          className="text-red-500 hover:text-red-700 transition self-end mt-5"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={addReceiptDetail}
                      className="flex items-center gap-1 mt-2 text-green-500 hover:text-green-700 transition font-medium"
                    >
                      <FiPlus /> Thêm chi tiết sản phẩm
                    </button>
                    <div className="text-gray-700 font-semibold">
                      Tổng giá: {calculateTotalCost(receiptFormData.details)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <small className="text-gray-500 text-xs mb-1">Ghi chú</small>
                  <label className="block mb-1 font-medium text-gray-700">
                    Ghi chú
                  </label>
                  <textarea
                    value={receiptFormData.note}
                    onChange={(e) =>
                      handleReceiptFormChange("note", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => setShowReceiptForm(false)}
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
