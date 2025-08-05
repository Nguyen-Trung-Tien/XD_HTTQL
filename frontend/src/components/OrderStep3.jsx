import React, { useState } from "react";
import QRCode from "react-qr-code";

function OrderStep3({ orderData, setOrderData, setCurrentStep, handleSubmit, currentUser }) {
  const [cashReceived, setCashReceived] = useState(0);
  const [showBankInfo, setShowBankInfo] = useState(false);
  
  const formatCurrency = (amount) => {
    if (isNaN(amount)) return "0đ";
    return new Intl.NumberFormat('vi-VN', { style: 'decimal' }).format(amount) + 'đ';
  };

  const subtotal = orderData.products.reduce(
    (sum, item) => sum + (parseInt(String(item.price).replace(/\D/g, '')) || 0) * item.quantity,
    0
  );
  const shippingFee = 30000;
  const discount = 0;
  const total = subtotal + shippingFee - discount;

  const handlePaymentChange = (e) => {
    const paymentMethod = e.target.id;
    setOrderData({
      ...orderData,
      payment: paymentMethod,
    });
    setShowBankInfo(paymentMethod === "bank-transfer");
    
    if (paymentMethod !== "cash" && paymentMethod !== "cod") {
      setCashReceived(0);
    }
  };

  const handleCashReceivedChange = (e) => {
    const value = parseInt(e.target.value.replace(/\D/g, '')) || 0;
    setCashReceived(value);
  };

  const changeDue = (orderData.payment === "cash" || orderData.payment === "cod") && cashReceived > total 
    ? cashReceived - total 
    : 0;

  const bankAccountInfo = {
    bankName: "Ngân hàng MB",
    accountNumber: "0867919478",
    accountHolder: "Kho hàng HTTT",
    amount: total,
    content: `Thanh toan don hang ${orderData.orderNumber || "MADH123"}`,
  };


  const canSubmit = () => {
    if (orderData.payment === "cash" || orderData.payment === "cod") {
      return cashReceived >= total;
    }
    return true;
  };

  return (
    <div className="space-y-6">
      
      {currentUser && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-gray-700">
            Người tạo đơn: <span className="font-semibold">{currentUser.name}</span>
          </p>
          <p className="text-sm text-gray-700">
            Vai trò: <span className="font-semibold">{currentUser.role}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Tóm tắt đơn hàng
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Tổng tiền hàng:</span>
              <span className="font-medium">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phí vận chuyển:</span>
              <span className="font-medium">
                {formatCurrency(shippingFee)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Giảm giá:</span>
              <span className="font-medium text-green-500">
                {formatCurrency(discount)}
              </span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800">Tổng thanh toán:</span>
              <span className="font-bold text-blue-600 text-lg">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

       
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Phương thức thanh toán
          </h4>
          <div className="space-y-3">
          
            <div className={`p-3 border rounded-lg transition-all ${
              orderData.payment === "cash" 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-200 hover:bg-gray-50"
            }`}>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  id="cash"
                  checked={orderData.payment === "cash"}
                  onChange={handlePaymentChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">Tiền mặt</span>
                </div>
              </label>
            </div>
            
          
            <div className={`p-3 border rounded-lg transition-all ${
              orderData.payment === "bank-transfer" 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-200 hover:bg-gray-50"
            }`}>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  id="bank-transfer"
                  checked={orderData.payment === "bank-transfer"}
                  onChange={handlePaymentChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  <span className="font-medium">Chuyển khoản ngân hàng</span>
                </div>
              </label>
              
              {showBankInfo && (
                <div className="mt-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <div className="flex flex-col items-center mb-3">
                    <QRCode 
                      value={`${bankAccountInfo.bankName}|${bankAccountInfo.accountNumber}|${bankAccountInfo.accountHolder}|${bankAccountInfo.amount}|${bankAccountInfo.content}`} 
                      size={128} 
                      level="H"
                    />
                    <p className="mt-2 text-sm text-center text-gray-600">
                      Quét mã QR để thanh toán
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    {Object.entries({
                      'Ngân hàng': bankAccountInfo.bankName,
                      'Số tài khoản': bankAccountInfo.accountNumber,
                      'Chủ tài khoản': bankAccountInfo.accountHolder,
                      'Số tiền': formatCurrency(bankAccountInfo.amount),
                      'Nội dung': bankAccountInfo.content
                    }).map(([label, value]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-gray-600">{label}:</span>
                        <span className={label === 'Số tiền' ? "font-semibold" : ""}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className={`p-3 border rounded-lg transition-all ${
              orderData.payment === "cod" 
                ? "border-blue-500 bg-blue-50" 
                : "border-gray-200 hover:bg-gray-50"
            }`}>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  id="cod"
                  checked={orderData.payment === "cod"}
                  onChange={handlePaymentChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

     
      {(orderData.payment === "cash" || orderData.payment === "cod") && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Thông tin thanh toán {orderData.payment === "cash" ? "tiền mặt" : "COD"}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tổng thanh toán
              </label>
              <div className="p-2 bg-gray-50 rounded border border-gray-200 font-semibold">
                {formatCurrency(total)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số tiền nhận được 
              </label>
              <input
                type="text"
                value={formatCurrency(cashReceived).replace('đ', '')}
                onChange={handleCashReceivedChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập số tiền"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiền thối lại
              </label>
              <div className={`p-2 rounded-lg border ${
                changeDue > 0 ? "border-green-200 bg-green-50 text-green-700" : "border-gray-200 bg-gray-50"
              } font-semibold`}>
                {formatCurrency(changeDue)}
              </div>
            </div>
          </div>
          {orderData.payment === "cod" && (
            <div className="mt-3 text-sm text-gray-600">
              <p>Lưu ý: Với phương thức COD, nhân viên giao hàng sẽ thu tiền khi giao hàng cho khách.</p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between pt-4 border-t border-gray-200">
        <button
          onClick={() => setCurrentStep(2)}
          className="px-6 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
        >
          Quay lại
        </button>
       <button
  onClick={handleSubmit}
  disabled={!canSubmit()}
  className={`px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm ${
            !canSubmit() ? "opacity-50 cursor-not-allowed" : ""
          }`}
>
  Hoàn tất đơn hàng
</button>
      </div>
    </div>
  );
}

export default OrderStep3;