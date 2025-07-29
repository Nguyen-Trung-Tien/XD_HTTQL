import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllProducts } from "../API/products/getAllProducts";

function ProductList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const isAllChecked = checked.length === products.length;
  const [filter, setFilter] = useState("Tất cả");
  const [search, setSearch] = useState("");

  console.log(products);

  // useEffect(() => {
  // 	const fetchProduct = async () => {
  // 		try {
  // 			const data = await getAllProducts();
  // 			console.log(data);

  // 			setProducts(data);
  // 		} catch (err) {
  // 			console.error(err);
  // 		}
  // 	};
  // 	fetchProduct();
  // }, []);

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

  const handleChecked = (productId) => {
    setChecked((prev) =>
      prev.includes(productId)
        ? prev.filter((item) => item !== productId)
        : [...prev, productId]
    );
  };

  const handleAllChecked = () => {
    if (isAllChecked) setChecked([]);
    else setChecked(products.map((product) => product.id));
  };

  console.log(filter);

  const filteredProducts = products
    .filter((product) => {
      switch (filter) {
        case "Tất cả":
          return true; // Hiển thị tất cả sản phẩm
        case "Còn hàng":
          return product.status === "Còn hàng";
        case "Hết hàng":
          return product.status === "Hết hàng";
        case "Sắp hết":
          return product.status === "Sắp hết";
        default:
          return true; // Mặc định hiển thị tất cả
      }
    })
    .filter((product) => {
      if (!search) return true;
      else return product.name.toLowerCase().includes(search.toLowerCase());
    });

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-2xl font-bold text-textPrimary mb-6">
        Danh sách sản phẩm
      </h1>

      <div className="flex items-center gap-4 mb-4 justify-between">
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

          <button
            onClick={() => setFilter("Sắp hết")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "Sắp hết"
                ? "gradient-bg text-white"
                : "bg-white text-textSecondary hover:bg-gray-200"
            } transition-colors`}
          >
            Sắp hết
          </button>
        </div>

        <div className="w-full md:w-auto flex space-x-2">
          <div className="relative flex-grow">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
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

          <NavLink
            to={"/products/create"}
            className="px-4 py-2 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            Tạo
          </NavLink>
          <button
            onClick={() => navigate("/products/:id")}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            Xóa
          </button>
        </div>
      </div>

      <div className="bg-card shadow-card rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                  <input
                    onChange={handleAllChecked}
                    checked={isAllChecked}
                    type="checkbox"
                    name="check-all"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                  #
                </th>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {filteredProducts.map((product, index) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    <input
                      onChange={() => handleChecked(product.id)}
                      checked={checked.includes(product.id)}
                      type="checkbox"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {product.price} đ
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/products/edit/${product.id}`)}
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
                        onClick={() =>
                          navigate(`/products/delete/${product.id}`)
                        }
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
      </div>
    </div>
  );
}

export default ProductList;
