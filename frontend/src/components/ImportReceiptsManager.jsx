import React, { useEffect, useState } from "react";
import {
  createImportReceipt,
  deleteImportReceipt,
  getAllImportReceipts,
  getImportReceiptById,
  updateImportReceipt,
} from "../API/Receipts/Receipts";
import { getAllProducts } from "../API/products/productsApi";
import { getAllSuppliers } from "../API/suppliers/suppliers";

export default function ImportReceiptsManager() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showDetailId, setShowDetailId] = useState(null);

  const emptyForm = {
    supplierId: "",
    warehouseId: "",
    date: new Date().toISOString().slice(0, 10),
    totalAmount: 0,
    details: [],
  };
  const [form, setForm] = useState(emptyForm);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  async function fetchInitialData() {
    setLoading(true);
    try {
      const [receipts, products, suppliers] = await Promise.all([
        getAllImportReceipts(),
        getAllProducts(),
        getAllSuppliers(),
      ]);
      setReceipts(receipts || []);
      setProducts(products || []);
      setSuppliers(suppliers || []);
      setError(null);
    } catch (err) {
      console.error("Fetch initial data failed:", err);
      setError(
        err.response?.data?.message || err.message || "Error fetching data"
      );
    } finally {
      setLoading(false);
    }
  }
  console.log("Suppliers fetched:", suppliers);
  function openCreateForm() {
    setEditing(null);
    setForm({ ...emptyForm });
    setShowForm(true);
  }

  function openEditForm(receipt) {
    const mapped = {
      supplierId: receipt.supplierId || receipt.supplier_id || "",
      warehouseId: receipt.warehouseId || receipt.warehouse_id || "",
      date: receipt.date
        ? receipt.date.split("T")[0]
        : new Date().toISOString().slice(0, 10),
      totalAmount: receipt.totalAmount || receipt.total_amount || 0,
      details: (receipt.importDetailData || receipt.details || []).map((d) => ({
        productId: d.productId || d.product_id || d.productId,
        quantity: d.quantity || 0,
        price: d.price || 0,
        note: d.note || "",
      })),
    };
    setEditing(receipt);
    setForm(mapped);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  }

  function updateDetailAt(idx, patch) {
    setForm((f) => {
      const newDetails = [...(f.details || [])];
      newDetails[idx] = { ...(newDetails[idx] || {}), ...patch };
      return { ...f, details: newDetails };
    });
  }

  function addDetailRow() {
    setForm((f) => ({
      ...f,
      details: [...(f.details || []), { productId: "", quantity: 1, price: 0 }],
    }));
  }

  function removeDetailRow(i) {
    setForm((f) => {
      const newDetails = [...(f.details || [])];
      newDetails.splice(i, 1);
      return { ...f, details: newDetails };
    });
  }

  function calculateTotal() {
    return (form.details || []).reduce(
      (acc, d) => acc + Number(d.quantity || 0) * Number(d.price || 0),
      0
    );
  }

  async function submitForm(e) {
    e?.preventDefault();
    const payload = { ...form, totalAmount: calculateTotal() };

    try {
      if (editing) {
        await updateImportReceipt(editing.id, payload);
      } else {
        await createImportReceipt(payload);
      }
      await fetchInitialData();
      closeForm();
    } catch (err) {
      alert(err.message || "Save failed");
    }
  }

  async function deleteReceipt(id) {
    if (!confirm("Bạn có chắc muốn xóa phiếu này?")) return;
    try {
      await deleteImportReceipt(id);
      setReceipts((r) => r.filter((x) => x.id !== id));
    } catch (err) {
      alert(err.message || "Xóa thất bại");
    }
  }

  async function openDetail(id) {
    setShowDetailId(id);
  }

  function closeDetail() {
    setShowDetailId(null);
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Quản lý Phiếu Nhập</h1>
          <div className="space-x-2">
            <button
              onClick={fetchInitialData}
              className="px-4 py-2 bg-white border rounded shadow-sm hover:shadow"
            >
              Làm mới
            </button>
            <button
              onClick={openCreateForm}
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
              Tạo phiếu mới
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">Đang tải...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Mã / ID</th>
                  <th className="px-4 py-3">Nhà cung cấp</th>
                  <th className="px-4 py-3">Kho</th>
                  <th className="px-4 py-3">Ngày</th>
                  <th className="px-4 py-3">Tổng tiền</th>
                  <th className="px-4 py-3">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {receipts.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      Không có phiếu nhập
                    </td>
                  </tr>
                )}
                {receipts.map((r, idx) => (
                  <tr key={r.id} className="border-b">
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3">{r.id}</td>
                    <td className="px-4 py-3">
                      {r.supplierData?.name || r.supplierName || "-"}
                    </td>
                    <td className="px-4 py-3">
                      {r.warehouseName ||
                        r.warehouse_id ||
                        r.warehouseId ||
                        "-"}
                    </td>
                    <td className="px-4 py-3">
                      {r.date ? r.date.split("T")[0] : "-"}
                    </td>
                    <td className="px-4 py-3">
                      {r.totalAmount ||
                        r.total_amount ||
                        calculateTotalForRow(r)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openDetail(r.id)}
                          className="px-3 py-1 border rounded"
                        >
                          Xem
                        </button>
                        <button
                          onClick={() => openEditForm(r)}
                          className="px-3 py-1 border rounded"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => deleteReceipt(r.id)}
                          className="px-3 py-1 border rounded text-red-600"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Form drawer/modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl overflow-auto max-h-[90vh]">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-medium">
                  {editing ? "Sửa phiếu nhập" : "Tạo phiếu nhập"}
                </h2>
                <div>
                  <button onClick={closeForm} className="px-3 py-1">
                    Đóng
                  </button>
                </div>
              </div>
              <form onSubmit={submitForm} className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm">Nhà cung cấp</label>
                    <select
                      value={String(form.supplierId)}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, supplierId: e.target.value }))
                      }
                      className="mt-1 block w-full border rounded px-2 py-2"
                      style={{ color: "black", backgroundColor: "white" }}
                    >
                      <option value="">-- Chọn nhà cung cấp --</option>
                      {suppliers.map((s) => (
                        <option key={s.id} value={String(s.id)}>
                          {s.id}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm">Ngày</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, supplierId: e.target.value }))
                      }
                      className="mt-1 block w-full border rounded px-2 py-2"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Chi tiết hàng</h3>
                  <div className="space-y-2 mt-2">
                    {(form.details || []).map((d, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 gap-2 items-center border p-2 rounded"
                      >
                        <div className="col-span-5">
                          <select
                            value={d.productId}
                            onChange={(e) =>
                              updateDetailAt(i, { productId: e.target.value })
                            }
                            className="w-full border rounded px-2 py-1"
                          >
                            <option value="">-- Chọn sản phẩm --</option>
                            {products.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.name} ({p.code || p.sku || ""})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-2">
                          <input
                            type="number"
                            min={0}
                            value={d.quantity}
                            onChange={(e) =>
                              updateDetailAt(i, {
                                quantity: Number(e.target.value),
                              })
                            }
                            className="w-full border rounded px-2 py-1"
                          />
                        </div>
                        <div className="col-span-3">
                          <input
                            type="number"
                            min={0}
                            value={d.price}
                            onChange={(e) =>
                              updateDetailAt(i, {
                                price: Number(e.target.value),
                              })
                            }
                            className="w-full border rounded px-2 py-1"
                          />
                        </div>
                        <div className="col-span-1 text-sm">
                          {(
                            Number(d.quantity || 0) * Number(d.price || 0)
                          ).toLocaleString()}
                        </div>
                        <div className="col-span-1 text-right">
                          <button
                            type="button"
                            onClick={() => removeDetailRow(i)}
                            className="px-2 py-1 text-sm text-red-600"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    ))}

                    <div>
                      <button
                        type="button"
                        onClick={addDetailRow}
                        className="px-3 py-1 border rounded"
                      >
                        Thêm dòng
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    Tổng tiền tạm tính:{" "}
                    <strong>{calculateTotal().toLocaleString()}</strong>
                  </div>
                  <div className="space-x-2">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="px-4 py-2 border rounded"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Detail modal */}
        {showDetailId && (
          <DetailModal id={showDetailId} onClose={closeDetail} />
        )}
      </div>
    </div>
  );

  // small helper used in table if backend doesn't provide total
  function calculateTotalForRow(r) {
    const details = r.importDetailData || r.details || [];
    return details.reduce(
      (acc, d) => acc + Number(d.quantity || 0) * Number(d.price || 0),
      0
    );
  }
}

// DetailModal component (inline)
function DetailModal({ id, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await getImportReceiptById(id);
        if (mounted) setData(data);
      } catch (err) {
        setError(err.message || "Error");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Chi tiết phiếu #{id}</h3>
          <button onClick={onClose} className="px-3 py-1">
            Đóng
          </button>
        </div>
        <div className="p-4">
          {loading ? (
            <div>Đang tải...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <div>
              <div className="mb-4">
                <div>
                  <strong>Nhà cung cấp:</strong>{" "}
                  {data.supplierData?.name || data.supplierName}
                </div>
                <div>
                  <strong>Ngày:</strong> {data.date?.split("T")[0]}
                </div>
                <div>
                  <strong>Tổng:</strong>{" "}
                  {data.totalAmount || data.total_amount || 0}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="px-3 py-2">#</th>
                      <th className="px-3 py-2">Sản phẩm</th>
                      <th className="px-3 py-2">Số lượng</th>
                      <th className="px-3 py-2">Giá</th>
                      <th className="px-3 py-2">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.importDetailData || []).map((d, i) => (
                      <tr key={i} className="border-b">
                        <td className="px-3 py-2">{i + 1}</td>
                        <td className="px-3 py-2">
                          {d.productData?.name || d.productName}
                        </td>
                        <td className="px-3 py-2">{d.quantity}</td>
                        <td className="px-3 py-2">{d.price}</td>
                        <td className="px-3 py-2">
                          {(
                            Number(d.quantity) * Number(d.price)
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
