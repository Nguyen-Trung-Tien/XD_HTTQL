import React, { useState, useEffect, useMemo } from "react";
import { getAllProducts } from "../API/products/productsApi";
import OrderStep1 from "./OrderStep1";
import OrderStep2 from "./OrderStep2";
import OrderStep3 from "./OrderStep3";

function OrderWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [categories, setCategories] = useState([]);

  const [orderData, setOrderData] = useState({
    products: [],
    customer: { name: "", email: "", phone: "" },
    shipping: { address: "", city: "", postalCode: "", country: "Việt Nam" },
    payment: "credit-card",
  });
  const addProductToOrder = (product) => {
    const existingProductIndex = orderData.products.findIndex(
      (item) => item.productId === product.id
    );

    if (existingProductIndex >= 0) {
      updateProductQuantity(
        existingProductIndex,
        orderData.products[existingProductIndex].quantity + 1
      );
    } else {
      setOrderData((prev) => ({
        ...prev,
        products: [
          ...prev.products,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            stock: product.stock,
          },
        ],
      }));
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const data = await getAllProducts();
        setProducts(data);
        setCategories([...new Set(data.map((p) => p.category))]);
      } catch (error) {
        console.error("Lỗi tải sản phẩm:", error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    loadProducts();
  }, []);

  const handleSubmit = () => {
    alert("Đơn hàng đã được tạo thành công!");
    setCurrentStep(1);
    setOrderData({
      products: [],
      customer: { name: "", email: "", phone: "" },
      shipping: { address: "", city: "", postalCode: "", country: "Việt Nam" },
      payment: "credit-card",
    });
  };

  return (
    <div className="bg-card shadow-card rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-textPrimary">
            Tạo đơn hàng mới
          </h3>
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div
                  className={`w-8 h-8 rounded-full ${
                    currentStep >= step ? "gradient-bg" : "bg-border"
                  } flex items-center justify-center ${
                    currentStep >= step ? "text-white" : "text-textSecondary"
                  } font-bold`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`h-1 w-12 ${
                      currentStep > step ? "bg-primary" : "bg-border"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {currentStep === 1 && (
          <OrderStep1
            products={products}
            isLoadingProducts={isLoadingProducts}
            categories={categories}
            orderData={orderData}
            setOrderData={setOrderData}
            setCurrentStep={setCurrentStep}
            addProductToOrder={addProductToOrder}
          />
        )}
        {currentStep === 2 && (
          <OrderStep2
            orderData={orderData}
            setOrderData={setOrderData}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 3 && (
          <OrderStep3
            orderData={orderData}
            setOrderData={setOrderData}
            setCurrentStep={setCurrentStep}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default OrderWizard;
