import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  createImportDetail,
  deleteImportDetail,
  getAllImportDetails,
  updateImportDetail,
} from "../../API/importDetailApi/importDetailsApi";

export default function ImportDetails() {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    importId: "",
    productId: "",
    quantity: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAllImportDetails();
        if (res.data.success) {
          setDetails(res.data.data || []);
        } else {
          setDetails([]);
          toast.error(res.data.error || "Không lấy được dữ liệu");
        }
      } catch (err) {
        console.error(err);
        toast.error("Lỗi kết nối server");
        setDetails([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.importId ||
      !form.productId ||
      !form.quantity ||
      !form.price ||
      Number(form.importId) <= 0 ||
      Number(form.productId) <= 0 ||
      Number(form.quantity) <= 0 ||
      Number(form.price) <= 0
    ) {
      toast.error("Vui lòng nhập tất cả các trường và khác 0");
      return;
    }

    try {
      if (editingId) {
        await updateImportDetail(editingId, form);
        toast.success("Cập nhật thành công");
      } else {
        await createImportDetail(form);
        toast.success("Thêm thành công");
      }
      setForm({ importId: "", productId: "", quantity: "", price: "" });
      setEditingId(null);

      const res = await getAllImportDetails();
      if (res.data.success) setDetails(res.data.data || []);
    } catch (err) {
      const message =
        err.response?.data?.error || err.response?.data?.message || err.message;
      if (message.includes("Import receipt") || message.includes("Product")) {
        toast.error("Sản phẩm không tồn tại trong kho");
      } else {
        toast.error(message);
      }
    }
  };

  const handleEdit = (item) => {
    setForm({
      importId: item.importId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;
    try {
      await deleteImportDetail(id);
      toast.success("Xóa thành công");
      setDetails(details.filter((d) => d.id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-textPrimary mb-6">
          {editingId
            ? "Cập nhật chi tiết nhập hàng"
            : "Quản lý chi tiết nhập hàng"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-4 grid grid-cols-1 md:grid-cols-5 gap-3 bg-white p-4 rounded-lg shadow items-end"
        >
          <div className="flex flex-col">
            <small className="text-gray-500 text-xs mb-1">
              Nhập ID của phiếu nhập
            </small>
            <input
              type="number"
              placeholder="Mã hóa đơn"
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-base placeholder-gray-400 transition"
              value={form.importId}
              onChange={(e) => setForm({ ...form, importId: e.target.value })}
              min={1}
            />
          </div>

          <div className="flex flex-col">
            <small className="text-gray-500 text-xs mb-1">
              Nhập ID sản phẩm
            </small>
            <input
              type="number"
              placeholder="Mã sản phẩm"
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-base placeholder-gray-400 transition"
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
              min={1}
            />
          </div>

          <div className="flex flex-col">
            <small className="text-gray-500 text-xs mb-1">
              Số lượng sản phẩm
            </small>
            <input
              type="number"
              placeholder="Số lượng"
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-base placeholder-gray-400 transition"
              value={form.quantity}
              min={1}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <small className="text-gray-500 text-xs mb-1">Giá sản phẩm</small>
            <input
              type="text"
              placeholder="Giá"
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full text-base placeholder-gray-400 transition"
              value={form.price}
              min={1}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center gap-3 px-5 py-2  rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:scale-105 transition-transform duration-200"
            >
              <FiPlus /> {editingId ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>

        {loading ? (
          <div className="text-center py-6 text-[#00BFFF] font-semibold">
            Đang tải dữ liệu...
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {details.length > 0 ? (
                  details.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.id}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.importId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.productData?.name || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1 text-primary hover:text-blue-500 transition-colors rounded"
                          >
                            <FiEdit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
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
      </div>
    </div>
  );
}
