import React from 'react'

function OrderStatus() {
      const orders = [
        {
          id: 1,
          orderNumber: 'ĐH-7829',
          status: 'pending',
          date: '2023-10-24',
          total: 50608000,
          items: 2
        },
        {
          id: 2,
          orderNumber: 'ĐH-7815',
          status: 'processing',
          date: '2023-10-22',
          total: 7990000,
          items: 1
        },
        {
          id: 3,
          orderNumber: 'ĐH-7802',
          status: 'delivered',
          date: '2023-10-18',
          deliveredDate: '2023-10-20',
          total: 34990000,
          items: 1
        }
      ];
      
      const getStatusClass = (status) => {
        switch (status) {
          case 'pending':
            return 'bg-accent/20 text-accent';
          case 'processing':
            return 'bg-blue-100 text-blue-800';
          case 'delivered':
            return 'bg-green-100 text-green-800';
          default:
            return 'bg-gray-100 text-gray-800';
        }
      };
      
      const getStatusText = (status) => {
        switch (status) {
          case 'pending':
            return 'Chờ xác nhận';
          case 'processing':
            return 'Đang xử lý';
          case 'delivered':
            return 'Đã giao hàng';
          default:
            return 'Không xác định';
        }
      };
      
      return (
        <div className="bg-card shadow-card rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-textPrimary">Đơn hàng gần đây</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm rounded-md gradient-bg text-white hover:opacity-90 transition-opacity">Tất cả</button>
                <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-textSecondary hover:bg-gray-200 transition-colors">Chờ xác nhận</button>
                <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-textSecondary hover:bg-gray-200 transition-colors">Đang xử lý</button>
                <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-textSecondary hover:bg-gray-200 transition-colors">Đã giao</button>
              </div>
            </div>
            
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-white rounded-lg border border-border p-4 shadow-sm">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-textPrimary">#{order.orderNumber}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(order.status)} font-medium`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-textSecondary">Đặt ngày {new Date(order.date).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="font-semibold text-primary">{order.total.toLocaleString()}đ</p>
                      <p className="text-sm text-textSecondary">{order.items} sản phẩm</p>
                    </div>
                  </div>
                  
                  {/* Order timeline */}
                  <div className="relative">
                    <div className="flex mb-4">
                      {/* Timeline */}
                      <div className="flex flex-col items-center mr-4">
                        <div className={`w-4 h-4 rounded-full ${order.status !== 'pending' ? 'bg-accent' : 'bg-accent'}`}></div>
                        <div className={`w-1 h-12 ${order.status !== 'pending' ? 'bg-accent' : 'bg-gray-200'} my-1`}></div>
                        <div className={`w-4 h-4 rounded-full ${order.status === 'processing' || order.status === 'delivered' ? 'bg-accent' : 'bg-gray-200'}`}></div>
                        <div className={`w-1 h-12 ${order.status === 'delivered' ? 'bg-accent' : 'bg-gray-200'} my-1`}></div>
                        <div className={`w-4 h-4 rounded-full ${order.status === 'delivered' ? 'bg-accent' : 'bg-gray-200'}`}></div>
                      </div>
                      
                      {/* Status descriptions */}
                      <div className="flex-1">
                        <div className="mb-6">
                          <h5 className={`font-semibold ${order.status !== 'pending' ? 'text-accent' : 'text-accent'}`}>Đã đặt hàng</h5>
                          <p className="text-sm text-textSecondary">Đơn hàng của bạn đã được tiếp nhận và đang xử lý</p>
                        </div>
                        <div className="mb-6">
                          <h5 className={`font-semibold ${order.status === 'processing' || order.status === 'delivered' ? 'text-accent' : 'text-textSecondary'}`}>Đang xử lý</h5>
                          <p className="text-sm text-textSecondary">Đơn hàng của bạn đang được chuẩn bị để giao</p>
                        </div>
                        <div>
                          <h5 className={`font-semibold ${order.status === 'delivered' ? 'text-accent' : 'text-textSecondary'}`}>Đã giao hàng</h5>
                          <p className="text-sm text-textSecondary">
                            {order.status === 'delivered' 
                              ? `Đơn hàng của bạn đã được giao vào ngày ${new Date(order.deliveredDate || order.date).toLocaleDateString('vi-VN')}` 
                              : 'Đơn hàng của bạn sẽ được giao đến địa chỉ'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-border">
                    <button className="px-4 py-1.5 border border-primary rounded-lg text-sm text-primary hover:bg-primary/5 transition-colors">
                      Xem chi tiết
                    </button>
                    {order.status !== 'delivered' && (
                      <button className="px-4 py-1.5 gradient-bg rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                        Theo dõi đơn hàng
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <button className="px-4 py-1.5 border border-primary rounded-lg text-sm text-primary hover:bg-primary/5 transition-colors">
                        Mua lại
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

export default OrderStatus
