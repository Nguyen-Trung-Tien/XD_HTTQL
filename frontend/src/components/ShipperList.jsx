import React, { useState, useEffect } from "react";
import {
  getAllShippers,
  addNewShipper,
  deleteShipper,
} from "../API/shipper/shipperApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ShipperList({
  shippers = [],
  onAddShipper,
  onDeleteShipper,
  onFocusShipper,
}) {
  const [shipper, setShipper] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShippers = async () => {
      try {
        const data = await getAllShippers();
        setShipper(data);
      } catch (err) {
        setError("Không thể tải dữ liệu shipper.");
        toast.error("Không thể tải dữ liệu shipper.");
        setShipper([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShippers();
  }, []);

  const handleDeleteShipper = async (shipperId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa shipper này?")) {
      try {
        await deleteShipper(shipperId);
        setShipper((prev) =>
          prev.filter((shipper) => shipper.id !== shipperId)
        );
        toast.success("Xóa shipper thành công!");
      } catch (err) {
        toast.error("Lỗi khi xóa shipper:", err);
      }
    }
  };

  const statusClassMap = {
    delivering: "bg-[#FFD700]/20 text-[#FFD700]",
    available: "bg-green-100 text-green-800",
  };

  const statusTextMap = {
    delivering: "Đang giao",
    available: "Sẵn sàng",
  };
  const getStatusClass = (status) =>
    statusClassMap[status] || "bg-gray-100 text-gray-800";
  const getStatusText = (status) => statusTextMap[status] || "Đang giao";

  if (loading) {
    return <div className="p-6 text-center">Đang tải danh sách shipper...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-card shadow-card rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-textPrimary">
            Trạng thái Shipper
          </h3>
          <button
            onClick={onAddShipper}
            className="px-4 py-1.5 gradient-bg rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Thêm Shipper mới
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
                >
                  Shipper
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
                >
                  Trạng thái
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
                >
                  Đơn hàng hiện tại
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
                >
                  Vị trí
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {shippers.map((shipper) => (
                <tr key={shipper.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <svg
                          className="w-6 h-6 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-textPrimary">
                          {shipper.name}
                        </div>
                        <div className="text-xs text-textSecondary">
                          {shipper.phoneNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                        shipper.status
                      )} font-medium`}
                    >
                      {getStatusText(shipper.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-textSecondary">
                      Không có đơn hàng
                    </div>
                  </td>
                  <td className="px-6 py-4 align-top">
                    <div className="flex items-start gap-1 max-w-[200px] whitespace-normal break-words text-sm text-textPrimary">
                      <svg
                        className="w-4 h-4 text-textPrimary mt-1 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <span>{shipper.address || "Chưa cập nhật"}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        className="p-1 text-primary hover:text-accent transition-colors"
                        onClick={() => onFocusShipper(shipper.id)}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="p-1 text-primary hover:text-red-500 transition-colors"
                        onClick={() => handleDeleteShipper(shipper.id)}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <button className="p-1 text-primary hover:text-accent transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShipperList;
