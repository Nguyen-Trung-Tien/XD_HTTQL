import React, { useEffect, useState } from "react";
import { getAllOrders } from "../../API/orders/ordersApi";
import OrderDetail from "../OrderComponent/OrderDetail";

function CustomerOrderHistory({ customerId, onClose }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const allOrders = await getAllOrders();
      setOrders(allOrders.filter((o) => o.customerId === customerId));
    };
    fetchOrders();
  }, [customerId]);

  const STATUS_MAP = {
    pending: { text: "Chờ xác nhận", class: "bg-yellow-100 text-yellow-800" },
    finding_shipper: { text: "Đang tìm shipper", class: "bg-blue-100 text-blue-800" },
    shipping: { text: "Đang giao", class: "bg-orange-100 text-orange-800" },
    delivered: { text: "Đã giao", class: "bg-green-100 text-green-800" },
    cancelled: { text: "Đã hủy", class: "bg-red-100 text-red-800" },
  };

  if (selectedOrder) {
    return (
      <OrderDetail
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold gradient-text">
            Lịch sử đơn hàng
          </h2>
          <button
            className="text-2xl text-gray-400 hover:text-red-500 transition"
            onClick={onClose}
            aria-label="Đóng"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {orders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Khách hàng chưa có đơn hàng nào.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => {
                const status = STATUS_MAP[order.status] || { 
                  text: order.status, 
                  class: "bg-gray-100 text-gray-800" 
                };
                
                return (
                  <div 
                    key={order.id} 
                    className="grid grid-cols-12 gap-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="col-span-12 sm:col-span-3">
                      <p className="font-medium">#{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="col-span-6 sm:col-span-3">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${status.class}`}>
                        {status.text}
                      </span>
                    </div>
                    
                    <div className="col-span-6 sm:col-span-3 text-right sm:text-left">
                      <p className="font-semibold">
                        {order.total?.toLocaleString()}đ
                      </p>
                    </div>
                    
                    <div className="col-span-12 sm:col-span-3 text-right">
                      <button 
                        className="text-primary hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerOrderHistory;