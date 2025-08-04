import React from "react";

function OrderStep3({ orderData, setOrderData, setCurrentStep, handleSubmit }) {
  const handlePaymentChange = (e) => {
    setOrderData({
      ...orderData,
      payment: e.target.id,
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-md font-semibold text-textPrimary mb-4">
            Tóm tắt đơn hàng
          </h4>
          <div className="border border-border rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-textSecondary">Tổng tiền hàng:</span>
              <span className="font-medium">25.000.000đ</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-textSecondary">Phí vận chuyển:</span>
              <span className="font-medium">30.000đ</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-textSecondary">Giảm giá:</span>
              <span className="font-medium text-green-500">-500.000đ</span>
            </div>
            <div className="border-t border-border my-2"></div>
            <div className="flex justify-between">
              <span className="font-semibold">Tổng thanh toán:</span>
              <span className="font-bold text-primary">24.530.000đ</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-md font-semibold text-textPrimary mb-4">
            Phương thức thanh toán
          </h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
              <input
                type="radio"
                name="payment"
                id="credit-card"
                checked={orderData.payment === "credit-card"}
                onChange={handlePaymentChange}
                className="text-primary focus:ring-primary"
              />
              <label htmlFor="credit-card" className="flex items-center cursor-pointer">
                <svg
                  className="w-6 h-6 mr-2 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  ></path>
                </svg>
                Thẻ tín dụng
              </label>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
              <input
                type="radio"
                name="payment"
                id="bank-transfer"
                checked={orderData.payment === "bank-transfer"}
                onChange={handlePaymentChange}
                className="text-primary focus:ring-primary"
              />
              <label htmlFor="bank-transfer" className="flex items-center cursor-pointer">
                <svg
                  className="w-6 h-6 mr-2 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  ></path>
                </svg>
                Chuyển khoản ngân hàng
              </label>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
              <input
                type="radio"
                name="payment"
                id="cod"
                checked={orderData.payment === "cod"}
                onChange={handlePaymentChange}
                className="text-primary focus:ring-primary"
              />
              <label htmlFor="cod" className="flex items-center cursor-pointer">
                <svg
                  className="w-6 h-6 mr-2 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                Thanh toán khi nhận hàng (COD)
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(2)}
          className="px-6 py-2 border border-border bg-white text-textPrimary rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm"
        >
          Quay lại
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-sm"
        >
          Hoàn tất đơn hàng
        </button>
      </div>
    </div>
  );
}

export default OrderStep3;