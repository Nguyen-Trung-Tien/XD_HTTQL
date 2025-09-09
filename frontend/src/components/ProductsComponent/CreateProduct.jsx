import { useState } from "react";
import { createProduct } from "../../API/products/productsApi";
import { toast } from "react-toastify";
import upload_area from "../../assets/assets";
import { useNavigate } from "react-router";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Còn hàng");
  const [adding, setAdding] = useState(false);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setAdding(true);

      if (
        !name ||
        !category ||
        !price ||
        !unit ||
        !description ||
        !status ||
        !image
      ) {
        toast.error("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      const stock = 0;
      const formData = new FormData();

      formData.append("name", name);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("unit", unit);
      formData.append("stock", stock);
      formData.append("price", String(price));
      formData.append("status", status);
      formData.append("image", image);

      const data = await createProduct(formData);

      if (data.success) {
        toast.success(data.message);
        navigate("/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ảnh sản phẩm
            </label>
            <div className="flex items-center justify-center">
              <label htmlFor="create-product-image" className="cursor-pointer">
                <div className="relative h-40 w-40 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                  <img
                    src={preview || upload_area}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-20 text-white opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="mt-2 text-xs">Tải ảnh lên</p>
                  </div>
                </div>
                <input
                  type="file"
                  id="create-product-image"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên sản phẩm
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nhập danh mục"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Giá
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nhập giá"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đơn vị
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nhập đơn vị"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Nhập mô tả sản phẩm"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full py-3 px-4 text-white font-medium rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] transition-transform duration-200 outline-none"
            >
              {adding ? "Đang tạo..." : "Tạo sản phẩm"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
