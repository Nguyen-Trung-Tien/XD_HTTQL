import React from "react";
import { FiPlus } from "react-icons/fi";

export default function ReceiptDetailRow({
  detail,
  index,
  productOptions,
  handleDetailChange,
  removeReceiptDetail,
  formLoading,
  CURRENCY_UNIT,
}) {
  const handleProductSelect = (e) => {
    const stockId = Number(e.target.value);
    const selectedProduct = productOptions.find((p) => p.id === stockId);
    handleDetailChange(index, "productId", stockId);
    handleDetailChange(
      index,
      "StockProductData",
      selectedProduct || { name: "", unit: "" }
    );
    if (selectedProduct) {
      handleDetailChange(index, "price", selectedProduct.price || 0);
    }
  };
  const StockProductData = detail.StockProductData || {};

  return (
    <div className="flex flex-col w-full gap-3 p-3 border border-gray-200 rounded-2xl shadow-sm bg-white">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col flex-1 min-w-[180px]">
          <small className="text-gray-500 text-xs mb-1">Sản phẩm</small>
          <select
            value={detail.productId}
            onChange={handleProductSelect}
            className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
            disabled={formLoading || productOptions.length === 0}
          >
            <option value="">
              {productOptions.length === 0
                ? "Không có sản phẩm"
                : "--Chọn sản phẩm--"}
            </option>
            {productOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - Tồn kho: {p.stock} {p.unit}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-24">
          <small className="text-gray-500 text-xs mb-1">SL</small>
          <input
            type="number"
            min="1"
            placeholder="SL"
            value={detail.quantity}
            onChange={(e) =>
              handleDetailChange(index, "quantity", Number(e.target.value))
            }
            className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
            disabled={formLoading}
          />
        </div>

        <div className="flex flex-col w-28">
          <small className="text-gray-500 text-xs mb-1">Đơn vị</small>
          <input
            type="text"
            value={detail.StockProductData?.unit || ""}
            disabled
            className="w-full p-2 border border-gray-200 rounded-xl bg-gray-100 text-gray-600"
          />
        </div>

        <div className="flex flex-col w-32">
          <small className="text-gray-500 text-xs mb-1">
            Giá ({CURRENCY_UNIT})
          </small>
          <input
            type="number"
            min="0"
            step="1000"
            value={detail.price}
            onChange={(e) =>
              handleDetailChange(index, "price", Number(e.target.value))
            }
            className="w-full p-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition shadow-sm hover:shadow-md"
            disabled={formLoading}
          />
        </div>

        <button
          type="button"
          onClick={() => removeReceiptDetail(index)}
          className="text-red-500 hover:text-red-700 transition self-end mb-1"
          disabled={formLoading}
        >
          Xóa
        </button>
      </div>

      {detail.StockProductData?.productId && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div>
            <strong>Tồn kho:</strong> {detail.StockProductData.stock}
          </div>
          <div>
            <strong>Loại:</strong> {detail.StockProductData.type}
          </div>
          <div>
            <strong>Kho:</strong> {detail.StockProductData.warehouseAddress}
          </div>
          <div>
            <strong>Trạng thái:</strong>{" "}
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                detail.StockProductData.status === "Còn hàng"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {detail.StockProductData.status}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
