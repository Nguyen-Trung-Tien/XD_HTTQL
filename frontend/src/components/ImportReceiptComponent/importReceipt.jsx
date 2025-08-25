import React, { useEffect, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  getAllImportReceipts,
  createImportReceipt,
  updateImportReceipt,
  deleteImportReceipt,
} from "../../API/importReceiptApi/importReceiptApi";
import { getManySupplier } from "../../API/suppliersApi/suppliersApi";
import { useLocation } from "react-router-dom";

import ReceiptTable from "./ReceiptTable";
import ReceiptFormModal from "./ReceiptFormModal";
import { getStockProduct } from "../../API/stock/stockAPI";

const CURRENCY_UNIT = "VND";

export default function ImportManagement() {
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [showReceiptForm, setShowReceiptForm] = useState(false);
  const [receiptFormData, setReceiptFormData] = useState({
    id: null,
    supplierData: null,
    import_date: "",
    note: "",
    details: [],
    userId: null,
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state?.openForm) setShowReceiptForm(true);
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
      console.log(e);
      toast.error("Lỗi khi tải dữ liệu phiếu nhập");
    } finally {
      setLoading(false);
    }
  };

  const fetchStockProducts = async () => {
    try {
      const stocks = await getStockProduct();
      const products = stocks.map((s) => ({
        productId: s.product.id,
        name: s.product.name,
        unit: s.product.unit || "cái",
        stock: s.stock,
        price: Number(s.product.price) || 0,
      }));
      setProductOptions(products);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm từ kho:", err);
      toast.error("Lỗi khi tải sản phẩm từ kho");
    }
  };
  const fetchSuppliers = async () => {
    try {
      const data = await getManySupplier();
      setSupplierOptions([...new Map(data.map((s) => [s.name, s])).values()]);
    } catch (e) {
      console.log(e);
      toast.error("Lỗi khi tải danh sách nhà cung cấp");
    }
  };

  useEffect(() => {
    fetchReceipts();
    fetchSuppliers();
    fetchStockProducts();
  }, []);

  useEffect(() => {
    const filtered = receipts.filter(
      (r) =>
        r.supplierData?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        r.note?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        new Date(r.import_date)
          .toLocaleDateString("vi-VN")
          .includes(searchQuery) ||
        r.userData?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${r.userData?.firstName || ""} ${r.userData?.lastName || ""}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        String(r.userId).includes(searchQuery)
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
      toast.error(`Xóa phiếu nhập thất bại: ${e.message}`);
    }
  };

  const openReceiptForm = (receipt = null) => {
    fetchStockProducts();

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
        userId: receipt.userId || null,
      });
    } else {
      setReceiptFormData({
        id: null,
        supplierData: null,
        import_date: new Date().toISOString().split("T")[0],
        note: "",
        details: [
          {
            productId: "",
            productData: { name: "", unit: "" },
            quantity: 1,
            price: 0,
          },
        ],
        userId: null,
      });
    }

    setShowReceiptForm(true);
  };

  const handleFormChange = (field, value) => {
    if (field === "userId") value = value ? Number(value) : null;
    setReceiptFormData({ ...receiptFormData, [field]: value });
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...receiptFormData.details];
    if (field === "quantity" || field === "price") value = Number(value) || 0;
    if (field === "productId")
      newDetails[index].productData = productOptions.find(
        (p) => p.id === value
      ) || { name: "", unit: "" };
    newDetails[index][field] = value;
    setReceiptFormData({ ...receiptFormData, details: newDetails });
  };

  const addReceiptDetail = () =>
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
  const removeReceiptDetail = (index) => {
    const newDetails = [...receiptFormData.details];
    newDetails.splice(index, 1);
    setReceiptFormData({ ...receiptFormData, details: newDetails });
  };

  const handleReceiptSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    if (!receiptFormData.supplierData?.id) {
      toast.error("Vui lòng chọn nhà cung cấp");
      setFormLoading(false);
      return;
    }
    if (!receiptFormData.import_date) {
      toast.error("Vui lòng chọn ngày nhập");
      setFormLoading(false);
      return;
    }
    if (!receiptFormData.userId || receiptFormData.userId <= 0) {
      toast.error("Vui lòng nhập ID người dùng hợp lệ");
      setFormLoading(false);
      return;
    }
    if (receiptFormData.details.length === 0) {
      toast.error("Vui lòng thêm ít nhất một sản phẩm");
      setFormLoading(false);
      return;
    }
    if (
      receiptFormData.details.some(
        (d) => !d.productId || d.quantity <= 0 || d.price < 0
      )
    ) {
      toast.error("Vui lòng nhập đầy đủ chi tiết sản phẩm hợp lệ");
      setFormLoading(false);
      return;
    }
    if (
      new Set(receiptFormData.details.map((d) => d.productId)).size !==
      receiptFormData.details.length
    ) {
      toast.error("Không được chọn sản phẩm trùng lặp");
      setFormLoading(false);
      return;
    }

    const payload = {
      supplierId: receiptFormData.supplierData.id,
      userId: receiptFormData.userId,
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
      setReceiptFormData({
        id: null,
        supplierData: null,
        import_date: "",
        note: "",
        details: [],
        userId: null,
      });
      fetchReceipts();
    } catch (e) {
      toast.error(`Lỗi khi lưu phiếu nhập: ${e.message}`);
    } finally {
      setFormLoading(false);
    }
  };

  const calculateTotalCost = (details) =>
    `${details
      .reduce((sum, d) => sum + d.quantity * d.price, 0)
      .toLocaleString("vi-VN")} ${CURRENCY_UNIT}`;

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
                placeholder="Tìm kiếm theo nhà cung cấp, ghi chú, ngày nhập, người nhập hoặc ID người dùng"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
              />
            </div>
            <button
              onClick={() => openReceiptForm()}
              className="flex items-center gap-2 px-5 py-2 rounded-lg shadow text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:scale-105 transition-transform duration-200"
            >
              <FiPlus /> Thêm mới
            </button>
          </div>
        </div>

        <ReceiptTable
          receipts={filteredReceipts}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleEdit={openReceiptForm}
          handleDelete={handleReceiptDelete}
          CURRENCY_UNIT={CURRENCY_UNIT}
          loading={loading}
        />

        <ReceiptFormModal
          show={showReceiptForm}
          onClose={() => setShowReceiptForm(false)}
          formData={receiptFormData}
          handleFormChange={handleFormChange}
          handleDetailChange={handleDetailChange}
          addReceiptDetail={addReceiptDetail}
          removeReceiptDetail={removeReceiptDetail}
          handleSubmit={handleReceiptSubmit}
          formLoading={formLoading}
          supplierOptions={supplierOptions}
          productOptions={productOptions}
          calculateTotalCost={calculateTotalCost}
          CURRENCY_UNIT={CURRENCY_UNIT}
        />
      </div>
    </div>
  );
}
