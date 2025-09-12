import React, { useEffect, useState } from "react";
import { getAllStock, deleteStock } from "../../API/stock/stockAPI";
import InventoryStatusCard from "./InventoryStatusCard";
import InventoryListCard from "./InventoryListCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../ProductsComponent/Modal";
import CreateProduct from "../ProductsComponent/CreateProduct";
import EditProduct from "../ProductsComponent/EditProduct";
import ProductDetail from "../ProductsComponent/ProductDetail";

function Inventory() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bạn có muốn xóa sản phẩm này?");
    if (!confirmed) return;

    try {
      await deleteStock(id);
      setInventoryItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Xóa sản phẩm thành công");
      navigate("/inventory");
    } catch (error) {
      console.error(error);
      toast.error("Xóa thất bại");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getAllStock();
        const formatted = (data || []).map((stock) => ({
          id: stock.id,
          name: stock.name || "Không rõ",
          image: stock.image,
          category: stock.category || "Khác",
          price: stock.price || 0,
          stock: stock.stock,
          unit: stock.unit,
          status: stock.status,
          description: stock.description,
          note: stock.note,
          createdAt: stock.createdAt ? new Date(stock.createdAt) : null,
          warehouseAddress: stock.warehouseAddress || "Kho chưa rõ",
          lastUpdated: stock.updatedAt,
        }));
        setInventoryItems(formatted);
      } catch (err) {
        console.error("Lỗi khi fetch tồn kho:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Còn hàng":
        return "bg-green-100 text-green-800";
      case "Sắp hết":
        return "bg-accent/20 text-accent";
      case "Hết hàng":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredItems = inventoryItems
    .filter((item) => {
      if (activeTab === "all") return true;
      return item.status === activeTab;
    })
    .filter((item) => {
      if (!searchTerm) return true;
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return <div className="p-6 text-center">Đang tải dữ liệu tồn kho...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-textPrimary mb-6">
        Quản Lý Tồn Kho
      </h1>

      <div className="bg-card shadow-card rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === "all"
                    ? "gradient-bg text-white"
                    : "bg-gray-100 text-textSecondary hover:bg-gray-200"
                } transition-colors`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setActiveTab("Còn hàng")}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === "Còn hàng"
                    ? "gradient-bg text-white"
                    : "bg-gray-100 text-textSecondary hover:bg-gray-200"
                } transition-colors`}
              >
                Còn hàng
              </button>
              <button
                onClick={() => setActiveTab("Hết hàng")}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === "Hết hàng"
                    ? "gradient-bg text-white"
                    : "bg-gray-100 text-textSecondary hover:bg-gray-200"
                } transition-colors`}
              >
                Hết hàng
              </button>
            </div>

            <div className="w-full md:w-auto flex space-x-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-textSecondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-sm"
              >
                Thêm sản phẩm
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    STT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Số lượng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Cập nhật
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {currentItems.map((item,index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 text-sm">{item.name}</td>
                    <td className="px-6 py-4 text-sm">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                          item.stock === 0 ? "Hết hàng" : "Còn hàng"
                        )}`}
                      >
                        {item.stock === 0 ? "Hết hàng" : "Còn hàng"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {item.price.toLocaleString()}đ
                    </td>
                    <td className="px-6 py-4 text-sm">{item.stock}</td>
                    <td className="px-6 py-4 text-sm text-textSecondary">
                      {new Date(item.lastUpdated).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(item);
                            setIsDetailModalOpen(true);
                          }}
                          className="p-1 text-primary hover:text-accent transition-colors"
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
                          onClick={() => {
                            setSelectedProduct(item);
                            setIsEditModalOpen(true);
                          }}
                          className="p-1 text-primary hover:text-accent transition-colors"
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            ></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-red-500 hover:text-red-700 transition-colors"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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

          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-textSecondary">
              Không tìm thấy sản phẩm nào phù hợp với tìm kiếm của bạn.
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-textSecondary">
              Hiển thị {currentItems.length} / {filteredItems.length} sản phẩm
            </div>
            <div className="flex space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 border border-border rounded-md text-textSecondary hover:bg-gray-50 disabled:opacity-50"
              >
                Trước
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === i + 1
                      ? "gradient-bg text-white"
                      : "border border-border text-textSecondary hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className="px-3 py-1 border border-border rounded-md text-textSecondary hover:bg-gray-50 disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Thêm sản phẩm mới"
        >
          <CreateProduct />
        </Modal>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Chỉnh sửa sản phẩm"
        >
          <EditProduct
            productData={selectedProduct}
            onClose={() => setIsEditModalOpen(false)}
          />
        </Modal>

        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title="Chi tiết sản phẩm"
        >
          <ProductDetail productData={selectedProduct} />
        </Modal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <InventoryStatusCard inventoryItems={inventoryItems} />
        <InventoryListCard
          inventoryItems={inventoryItems}
          getStatusClass={getStatusClass}
        />
      </div>
    </div>
  );
}

export default Inventory;
