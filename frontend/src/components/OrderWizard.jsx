import React from 'react'

function OrderWizard() {
      const [currentStep, setCurrentStep] = React.useState(1);
      const [orderData, setOrderData] = React.useState({
        products: [],
        customer: {
          name: '',
          email: '',
          phone: ''
        },
        shipping: {
          address: '',
          city: '',
          postalCode: '',
          country: 'Việt Nam'
        },
        payment: 'credit-card'
      });
      
      const handleCustomerChange = (e) => {
        setOrderData({
          ...orderData,
          customer: {
            ...orderData.customer,
            [e.target.name]: e.target.value
          }
        });
      };
      
      const handleShippingChange = (e) => {
        setOrderData({
          ...orderData,
          shipping: {
            ...orderData.shipping,
            [e.target.name]: e.target.value
          }
        });
      };
      
      const handlePaymentChange = (e) => {
        setOrderData({
          ...orderData,
          payment: e.target.id
        });
      };
      
      const handleSubmit = () => {
        alert('Đơn hàng đã được tạo thành công!');
        setCurrentStep(1);
        setOrderData({
          products: [],
          customer: { name: '', email: '', phone: '' },
          shipping: { address: '', city: '', postalCode: '', country: 'Việt Nam' },
          payment: 'credit-card'
        });
      };
      
      return (
        <div className="bg-card shadow-card rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-textPrimary">Tạo đơn hàng mới</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'gradient-bg' : 'bg-border'} flex items-center justify-center ${currentStep >= 1 ? 'text-white' : 'text-textSecondary'} font-bold`}>1</div>
                  <div className={`h-1 w-12 ${currentStep >= 2 ? 'bg-primary' : 'bg-border'}`}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'gradient-bg' : 'bg-border'} flex items-center justify-center ${currentStep >= 2 ? 'text-white' : 'text-textSecondary'} font-bold`}>2</div>
                  <div className={`h-1 w-12 ${currentStep >= 3 ? 'bg-primary' : 'bg-border'}`}></div>
                </div>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${currentStep >= 3 ? 'gradient-bg' : 'bg-border'} flex items-center justify-center ${currentStep >= 3 ? 'text-white' : 'text-textSecondary'} font-bold`}>3</div>
                </div>
              </div>
            </div>
            
            {/* Step 1: Select Products */}
            {currentStep === 1 && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-textSecondary mb-1">Tìm sản phẩm</label>
                    <div className="relative">
                      <input type="text" placeholder="Nhập tên sản phẩm..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-textSecondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textSecondary mb-1">Lọc theo danh mục</label>
                    <select className="w-full pl-3 pr-10 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none bg-white">
                      <option>Tất cả danh mục</option>
                      <option>Điện tử</option>
                      <option>Quần áo</option>
                      <option>Nội thất</option>
                      <option>Khác</option>
                    </select>
                  </div>
                </div>
                
                {/* Product list placeholder */}
                <div className="border border-border rounded-lg p-4 mb-4">
                  <div className="text-center text-textSecondary py-8">
                    Tìm kiếm sản phẩm để thêm vào đơn hàng
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-sm"
                  >
                    Bước tiếp theo
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Customer Information */}
            {currentStep === 2 && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-md font-semibold text-textPrimary mb-4">Thông tin khách hàng</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-textSecondary mb-1">Tên khách hàng</label>
                        <input 
                          type="text" 
                          name="name"
                          value={orderData.customer.name}
                          onChange={handleCustomerChange}
                          className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-textSecondary mb-1">Email</label>
                        <input 
                          type="email" 
                          name="email"
                          value={orderData.customer.email}
                          onChange={handleCustomerChange}
                          className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-textSecondary mb-1">Số điện thoại</label>
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
                    <h4 className="text-md font-semibold text-textPrimary mb-4">Địa chỉ giao hàng</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-textSecondary mb-1">Địa chỉ</label>
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
                          <label className="block text-sm font-medium text-textSecondary mb-1">Thành phố</label>
                          <input 
                            type="text" 
                            name="city"
                            value={orderData.shipping.city}
                            onChange={handleShippingChange}
                            className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-textSecondary mb-1">Mã bưu điện</label>
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
                        <label className="block text-sm font-medium text-textSecondary mb-1">Quốc gia</label>
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
            )}
            
            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-md font-semibold text-textPrimary mb-4">Tóm tắt đơn hàng</h4>
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
                    <h4 className="text-md font-semibold text-textPrimary mb-4">Phương thức thanh toán</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                        <input 
                          type="radio" 
                          name="payment" 
                          id="credit-card" 
                          checked={orderData.payment === 'credit-card'}
                          onChange={handlePaymentChange}
                          className="text-primary focus:ring-primary" 
                        />
                        <label htmlFor="credit-card" className="flex items-center cursor-pointer">
                          <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                          </svg>
                          Thẻ tín dụng
                        </label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                        <input 
                          type="radio" 
                          name="payment" 
                          id="bank-transfer" 
                          checked={orderData.payment === 'bank-transfer'}
                          onChange={handlePaymentChange}
                          className="text-primary focus:ring-primary" 
                        />
                        <label htmlFor="bank-transfer" className="flex items-center cursor-pointer">
                          <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                          </svg>
                          Chuyển khoản ngân hàng
                        </label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                        <input 
                          type="radio" 
                          name="payment" 
                          id="cod" 
                          checked={orderData.payment === 'cod'}
                          onChange={handlePaymentChange}
                          className="text-primary focus:ring-primary" 
                        />
                        <label htmlFor="cod" className="flex items-center cursor-pointer">
                          <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
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
            )}
          </div>
        </div>
      );
    }


export default OrderWizard
