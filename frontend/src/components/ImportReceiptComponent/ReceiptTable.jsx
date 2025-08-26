import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function ReceiptTable({
  receipts,
  handleEdit,
  handleDelete,
  CURRENCY_UNIT,
  loading,
}) {
  const calculateTotalCost = (details) =>
    `${details
      .reduce((sum, d) => sum + d.quantity * d.price, 0)
      .toLocaleString("vi-VN")} ${CURRENCY_UNIT}`;

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ngày nhập
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Người nhập
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nhà cung cấp
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ghi chú
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Chi tiết sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tổng giá
              </th>

              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="hover:bg-gray-50 transition-colors duration-200">
            {receipts.length > 0 ? (
              receipts.map((r) => (
                <tr
                  key={r.id}
                  className="px-6 py-4 text-sm text-gray-700 text-center"
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(r.import_date).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {r.userData
                      ? `${r.userData.firstName} ${r.userData.lastName}`.trim() ||
                        r.userData.email ||
                        `ID ${r.userId}`
                      : `ID ${r.userId}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {r.supplierData?.name || `ID ${r.supplierId}`}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {r.note || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800 align-top">
                    <div className="max-h-40 overflow-y-auto space-y-3">
                      {r.importDetailData?.length ? (
                        r.importDetailData.map((d, i) => (
                          <div
                            key={i}
                            className="whitespace-pre-line break-words border-b pb-2 last:border-b-0"
                          >
                            <div className=" text-left">
                              SP:{" "}
                              {d.StockProductData?.name ||
                                `Sản phẩm #${d.productId}`}
                            </div>
                            <div className="text-left">
                              SL: {d.quantity}{" "}
                              <span>
                                {d.StockProductData?.unit || "đơn vị"}
                              </span>
                            </div>
                            <div className="text-left">
                              Giá:{" "}
                              <span>
                                {Number(d.price).toLocaleString("vi-VN")}{" "}
                                {CURRENCY_UNIT}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>Chưa có sản phẩm</div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-800">
                    {calculateTotalCost(r.importDetailData || [])}
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
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-6 text-gray-400 text-base"
                >
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
