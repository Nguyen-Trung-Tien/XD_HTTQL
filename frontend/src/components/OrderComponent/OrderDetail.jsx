import React from "react";

const STATUS_MAP = {
  pending: { text: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-800" },       
  finding_shipper: { text: "Đang tìm shipper", color: "bg-purple-100 text-purple-800" },
  shipping: { text: "Đang giao", color: "bg-[#FFD700]/20 text-[#FFD700]" },        
  delivered: { text: "Đã giao", color: "bg-green-100 text-green-800" },           
  cancelled: { text: "Đã hủy", color: "bg-red-100 text-red-800" },                 
};

function OrderDetail({ order, onClose }) {
  const statusInfo = STATUS_MAP[order.status] || { text: order.status, color: "bg-gray-100 text-gray-800" };
  const subtotal =
    order.subtotal && order.subtotal > 0
      ? order.subtotal
      : Array.isArray(order.items)
      ? order.items.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0)
      : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-red-500 transition"
          onClick={onClose}
          aria-label="Đóng"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 gradient-text">
          Chi tiết đơn hàng <span className="text-primary">#{order.orderNumber}</span>
        </h2>
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Khách hàng:</span> {order.customerName}
          </div>
          <div>
            <span className="font-semibold">Địa chỉ:</span> {order.shippingAddress}
          </div>
          <div>
            <span className="font-semibold">Trạng thái:</span>{" "}
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
              {statusInfo.text}
            </span>
          </div>
          <div>
            <span className="font-semibold">Shipper:</span> {order.shipper?.name || "Chưa gán"}
          </div>
          <div className="mt-2 font-semibold">Sản phẩm:</div>
          <ul className="pl-4 list-disc">
            {order.items.map((item) => (
              <li key={item.id} className="text-sm">
                {item.name} x {item.quantity} - {Number(item.price).toLocaleString()}đ
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-col gap-1">
            <div>
              <span className="font-semibold">Tạm tính:</span>{" "}
              {subtotal.toLocaleString()}đ
            </div>
            <div>
              <span className="font-semibold">Phí ship:</span>{" "}
              {order.shippingFee?.toLocaleString()}đ
            </div>
            <div className="font-bold text-lg">
              Tổng tiền: {order.total?.toLocaleString()}đ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;