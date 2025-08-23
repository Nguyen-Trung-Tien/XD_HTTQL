import React, { useState, useMemo } from "react";

function OrderStep1({
  products,
  isLoadingProducts,
  categories,
  orderData,
  setOrderData,
  setCurrentStep,
  addProductToOrder,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filter, setFilter] = useState("Tất cả");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchStatus =
        filter === "Tất cả" ||
        (filter === "Còn hàng" && product.status === "Còn hàng") ||
        (filter === "Hết hàng" && product.status === "Hết hàng");

      return matchSearch && matchCategory && matchStatus;
    });
  }, [products, searchTerm, selectedCategory, filter]);

  const updateProductQuantity = (index, newQuantity) => {
  let quantity = Number(newQuantity);


  if (isNaN(quantity) || quantity < 1) quantity = 1;
  if (quantity > orderData.products[index].stock) {
    quantity = orderData.products[index].stock;
  }

  setOrderData((prev) => {
    const updatedProducts = [...prev.products];
    updatedProducts[index].quantity = quantity;
    return { ...prev, products: updatedProducts };
  });
};

  const removeProductFromOrder = (index) => {
    setOrderData((prev) => {
      const updatedProducts = [...prev.products];
      updatedProducts.splice(index, 1);
      return { ...prev, products: updatedProducts };
    });
  };
  const parsePrice = (priceString) => {
    if (typeof priceString !== "string") return 0;
    return Number(priceString.replace(/\./g, "").replace("đ", "").trim());
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <label
            htmlFor="categoryFilter"
            className="text-sm font-medium text-textSecondary"
          >
            Danh mục:
          </label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white"
          >
            <option value="all">Tất cả</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex-grow max-w-lg mx-4">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
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

        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("Tất cả")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "Tất cả"
                ? "gradient-bg text-white"
                : "bg-white text-textSecondary hover:bg-gray-200"
            } transition-colors`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter("Còn hàng")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "Còn hàng"
                ? "gradient-bg text-white"
                : "bg-white text-textSecondary hover:bg-gray-200"
            } transition-colors`}
          >
            Còn hàng
          </button>
          <button
            onClick={() => setFilter("Hết hàng")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "Hết hàng"
                ? "gradient-bg text-white"
                : "bg-white text-textSecondary hover:bg-gray-200"
            } transition-colors`}
          >
            Hết hàng
          </button>
        </div>
      </div>
      {isLoadingProducts ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white shadow-card rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                    Tên sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                    Danh mục
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                    Giá
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-textSecondary uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {filteredProducts.map((product) => {
                  const isInOrder = orderData.products.some(
                    (item) => item.productId === product.id
                  );
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-textPrimary">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-textPrimary">
                          {product.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-textPrimary">
                          {product.price.toLocaleString("vi-VN")}đ
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            product.status === "Còn hàng"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <button
                          onClick={() => addProductToOrder(product)}
                          disabled={product.status === "Hết hàng" || isInOrder}
                          className={`p-1.5 rounded-full transition-all duration-300 ${
                            isInOrder
                              ? "bg-green-100 text-green-600 cursor-not-allowed"
                              : product.status === "Hết hàng"
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-primary hover:bg-primary/10"
                          }`}
                          title={isInOrder ? "Đã thêm" : "Thêm vào đơn"}
                        >
                          {isInOrder ? (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {orderData.products.length > 0 && (
        <div className="mt-8">
          <h4 className="text-md font-semibold text-textPrimary mb-4">
            Sản phẩm đã chọn
          </h4>
          <div className="bg-white shadow-card rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Tên sản phẩm
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Đơn giá
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Thành tiền
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-textSecondary uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border">
                  {orderData.products.map((item, index) => (
                    <tr
                      key={item.productId}
                      className="hover:bg-gray-50 bg-white"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-textPrimary">
                          {item.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        {item.price.toLocaleString("vi-VN")}đ
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="inline-flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateProductQuantity(index, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50 "
                          >
                            -
                          </button>
                          <input
                        
                            min={1}
                            max={item.stock}
                            value={item.quantity}
                            onChange={(e) =>
                              updateProductQuantity(
                                index,
                                Number(e.target.value)
                              )
                            }
                            className="w-16 text-center border rounded "
                          />

                          <button
                            onClick={() =>
                              updateProductQuantity(index, item.quantity + 1)
                            }
                            disabled={item.quantity >= item.stock}
                            className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap font-semibold text-primary">
                        {(
                          parsePrice(item.price) * item.quantity
                        ).toLocaleString("vi-VN")}
                        đ
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => removeProductFromOrder(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Xóa khỏi đơn"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end mt-4 text-lg font-semibold">
            Tổng tạm tính:&nbsp;
            <span className="text-primary">
              {orderData.products
                .reduce(
                  (total, item) =>
                    total + parsePrice(item.price) * item.quantity,
                  0
                )
                .toLocaleString("vi-VN")}
              đ
            </span>
          </div>
        </div>
      )}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => setCurrentStep(2)}
          disabled={orderData.products.length === 0}
          className={`px-6 py-2 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-sm ${
            orderData.products.length === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Bước tiếp theo
        </button>
      </div>
    </div>
  );
}

export default OrderStep1;
