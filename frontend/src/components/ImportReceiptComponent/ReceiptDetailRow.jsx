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
    const productId = Number(e.target.value);
    const selectedProduct = productOptions.find(
      (p) => p.productId === productId
    );
    handleDetailChange(index, "productId", productId);
    handleDetailChange(
      index,
      "productData",
      selectedProduct || { name: "", unit: "" }
    );
    if (selectedProduct) {
      handleDetailChange(index, "price", selectedProduct.price || 0);
    }
  };

  return (
    <div className="flex gap-3 items-end">
      <div className="flex flex-col flex-1">
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
            <option key={p.productId} value={p.productId}>
              {p.name} (Kho: {p.stock} {p.unit})
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col w-20">
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
          value={detail.productData?.unit || ""}
          disabled
          className="w-full p-2 border border-gray-200 rounded-xl bg-gray-100 text-gray-600"
        />
      </div>

      <div className="flex flex-col w-28">
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
        className="text-red-500 hover:text-red-700 transition self-end mt-5"
        disabled={formLoading}
      >
        Xóa
      </button>
    </div>
  );
}
