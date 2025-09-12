import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  // createImportDetail,
  deleteImportDetail,
  getAllImportDetails,
  // updateImportDetail,
} from "../../API/importDetailApi/importDetailsApi";
import { useSelector } from "react-redux";

const formatPrice = (price) => {
  if (!price) return "";
  return new Intl.NumberFormat("vi-VN").format(price);
};

export default function ImportDetails() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [form, setForm] = useState({
  //   importId: "",
  //   productId: "",
  //   quantity: "",
  //   price: "",
  // });
  // const [editingId, setEditingId] = useState(null);

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (
  //     !form.importId ||
  //     !form.productId ||
  //     !form.quantity ||
  //     !form.price ||
  //     Number(form.importId) <= 0 ||
  //     Number(form.productId) <= 0 ||
  //     Number(form.quantity) <= 0 ||
  //     Number(form.price) <= 0
  //   ) {
  //     toast.error("Vui lòng nhập tất cả các trường và khác 0");
  //     return;
  //   }

  //   try {
  //     if (editingId) {
  //       await updateImportDetail(editingId, form);
  //       toast.success("Cập nhật thành công");
  //     } else {
  //       await createImportDetail(form);
  //       toast.success("Thêm thành công");
  //     }
  //     setForm({ importId: "", productId: "", quantity: "", price: "" });
  //     setEditingId(null);

  //     const res = await getAllImportDetails();
  //     if (res.data.success) setDetails(res.data.data || []);
  //   } catch (e) {
  //     const message =
  //       e.response?.data?.error || e.response?.data?.message || e.message;
  //     if (message.includes("Product")) {
  //       toast.error("Sản phẩm không tồn tại trong kho!");
  //     } else {
  //       toast.error("Phiếu nhập không tồn tại!");
  //     }
  //   }
  // };

  // const handleEdit = (item) => {
  //   setForm({
  //     importId: item.importId,
  //     productId: item.productId,
  //     quantity: item.quantity,
  //     price: item.price,
  //   });
  //   setEditingId(item.id);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  const handleDelete = async (id) => {
    if (currentUser.role !== "admin") {
      toast.warning("Liên hệ quản lý!");
      return;
    }
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
      <h1 className="text-2xl font-bold text-textPrimary mb-6">
        Quản lý chi tiết nhập hàng
      </h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        {loading ? (
          <div className="text-center py-6 text-[#00BFFF] font-semibold">
            Đang tải dữ liệu...
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã phiếu nhập
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giá (VND)
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.importId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.StockProductData?.name || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {formatPrice(item.price)} VND
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-3">
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
                      colSpan="5"
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
