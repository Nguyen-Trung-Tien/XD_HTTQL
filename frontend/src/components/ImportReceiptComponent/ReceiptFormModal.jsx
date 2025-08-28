import React from "react";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import ReceiptDetailRow from "./ReceiptDetailRow";

export default function ReceiptFormModal({
  show,
  onClose,
  formData,
  handleFormChange,
  handleDetailChange,
  addReceiptDetail,
  removeReceiptDetail,
  handleSubmit,
  formLoading,
  supplierOptions,
  productOptions,
  calculateTotalCost,
  CURRENCY_UNIT,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-16 z-50 overflow-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-3xl relative border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 flex items-center gap-1 text-gray-600 hover:text-gray-800 font-medium transition"
          disabled={formLoading}
        >
          <FiArrowLeft /> Quay lại
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-700">
          {formData.id ? "Sửa phiếu nhập" : "Thêm phiếu nhập"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <small className="text-gray-400 text-xs">Chọn nhà cung cấp</small>
              <select
                value={formData.supplierData?.id || ""}
                onChange={(e) => {
                  const selected = supplierOptions.find(
                    (s) => s.id === parseInt(e.target.value)
                  );
                  handleFormChange("supplierData", selected || null);
                }}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                disabled={formLoading || supplierOptions.length === 0}
              >
                <option value="">
                  {supplierOptions.length === 0
                    ? "Không có nhà cung cấp"
                    : "--Chọn nhà cung cấp--"}
                </option>
                {supplierOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <small className="text-gray-400 text-xs">Chọn ngày nhập</small>
              <input
                type="date"
                value={formData.import_date}
                onChange={(e) =>
                  handleFormChange("import_date", e.target.value)
                }
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
                disabled={formLoading}
              />
            </div>

            <div className="flex flex-col gap-1">
              <small className="text-gray-400 text-xs">
                Thông tin người nhập
              </small>
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700">
                <div className="flex flex-col">
                  {formData.userName && (
                    <span className="text-gray-500 text-sm">
                      Họ và tên: {formData.userName}
                    </span>
                  )}
                  {formData.userRole && (
                    <span className="text-blue-700 text-xs font-medium rounded-full mt-1">
                      Vai trò: {formData.userRole}
                    </span>
                  )}
                  {!formData.userName && (
                    <span className="text-gray-400 text-sm">
                      Chưa có thông tin người nhập
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-gray-700">Chi tiết sản phẩm</h4>
            </div>
            <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-xl p-3 space-y-3">
              {formData.details.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Chưa có sản phẩm. Vui lòng thêm sản phẩm.
                </p>
              )}
              {formData.details.map((d, i) => (
                <ReceiptDetailRow
                  key={i}
                  detail={d}
                  index={i}
                  productOptions={productOptions}
                  handleDetailChange={handleDetailChange}
                  removeReceiptDetail={removeReceiptDetail}
                  formLoading={formLoading}
                  CURRENCY_UNIT={CURRENCY_UNIT}
                />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={addReceiptDetail}
                className="flex items-center gap-1 mt-2 text-green-500 hover:text-green-700 transition font-medium"
                disabled={formLoading || productOptions.length === 0}
              >
                <FiPlus /> Thêm chi tiết sản phẩm
              </button>
              <div className="text-gray-700 font-semibold">
                Tổng giá: {calculateTotalCost(formData.details)}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <small className="text-gray-400 text-xs">Ghi chú</small>
            <textarea
              value={formData.note}
              onChange={(e) => handleFormChange("note", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
              disabled={formLoading}
            />
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition font-medium"
              disabled={formLoading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white rounded-xl shadow hover:scale-105 transition-transform duration-200 font-medium"
              disabled={formLoading}
            >
              {formLoading ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
