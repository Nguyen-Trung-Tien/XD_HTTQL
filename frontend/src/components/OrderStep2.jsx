import React from "react";

function OrderStep2({ orderData, setOrderData, setCurrentStep }) {
  const handleCustomerChange = (e) => {
    setOrderData({
      ...orderData,
      customer: {
        ...orderData.customer,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleShippingChange = (e) => {
    setOrderData({
      ...orderData,
      shipping: {
        ...orderData.shipping,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-md font-semibold text-textPrimary mb-4">
            Thông tin khách hàng
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Tên khách hàng
              </label>
              <input
                type="text"
                name="name"
                value={orderData.customer.name}
                onChange={handleCustomerChange}
                className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={orderData.customer.email}
                onChange={handleCustomerChange}
                className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={orderData.customer.phone}
                onChange={handleCustomerChange}
                className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-md font-semibold text-textPrimary mb-4">
            Địa chỉ giao hàng
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={orderData.shipping.address}
                onChange={handleShippingChange}
                className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textSecondary mb-1">
                  Thành phố
                </label>
                <input
                  type="text"
                  name="city"
                  value={orderData.shipping.city}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textSecondary mb-1">
                  Mã bưu điện
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={orderData.shipping.postalCode}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Quốc gia
              </label>
              <select
                name="country"
                value={orderData.shipping.country}
                onChange={handleShippingChange}
                className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              >
                <option>Việt Nam</option>
                <option>Thái Lan</option>
                <option>Singapore</option>
                <option>Malaysia</option>
                <option>Nhật Bản</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-6 py-2 border border-border bg-white text-textPrimary rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm"
        >
          Quay lại
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className="px-6 py-2 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-sm"
        >
          Bước tiếp theo
        </button>
      </div>
    </div>
  );
}

export default OrderStep2;