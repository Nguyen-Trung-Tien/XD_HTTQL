import React from "react";

function ProductList() {
  const products = [
    {
      id: 1,
      name: "Điện thoại X Pro",
      category: "Điện tử",
      stock: 52,
      price: "23.500.000đ",
      status: "Còn hàng",
    },
    {
      id: 2,
      name: "Laptop Ultra Pro",
      category: "Điện tử",
      stock: 0,
      price: "35.990.000đ",
      status: "Hết hàng",
    },
    {
      id: 3,
      name: "Tai nghe không dây",
      category: "Phụ kiện",
      stock: 127,
      price: "2.300.000đ",
      status: "Còn hàng",
    },
    {
      id: 4,
      name: "Đồng hồ thông minh",
      category: "Thiết bị đeo",
      stock: 14,
      price: "5.990.000đ",
      status: "Sắp hết",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Còn hàng":
        return "bg-green-100 text-green-800";
      case "Sắp hết":
        return "bg-yellow-100 text-yellow-800";
      case "Hết hàng":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-textPrimary mb-6">Danh sách sản phẩm</h1>

      <div className="bg-card shadow-card rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                  Kho
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {product.stock} chiếc
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {product.status}
                    </span>
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

export default ProductList;
