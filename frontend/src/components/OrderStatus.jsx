import React, { useState, useEffect } from "react";
import {
  getAllOrders,
  updateOrder,
  findNearestShipper,
} from "../API/orders/ordersApi";
import { updateShipperStatus } from "../API/shipper/shipperApi";
import { toast } from "react-toastify";
const WAREHOUSE_LAT = 10.8657;
const WAREHOUSE_LNG = 106.619;
const ORDER_STATUS = {
  pending: {
    class: "bg-accent/20 text-accent",
    text: "Chờ xác nhận",
    description: "Đơn hàng của bạn đã được tiếp nhận",
  },
  finding_shipper: {
    class: "bg-purple-100 text-purple-800",
    text: "Đang tìm shipper...",
    description: "Hệ thống đang tìm shipper phù hợp",
  },
  processing: {
    class: "bg-blue-100 text-blue-800",
    text: "Đang xử lý",
    description: "Đơn hàng của bạn đang được chuẩn bị",
  },
  shipping: {
    class: "bg-yellow-100 text-yellow-800",
    text: "Đang giao",
    description: "Đơn hàng đang trên đường giao đến bạn",
  },
  delivered: {
    class: "bg-green-100 text-green-800",
    text: "Đã giao hàng",
    description: "Đã giao thành công",
  },
};

function OrderStatus({ currentUser = {} }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);

      data.forEach((order) => {
        if (order.status === "pending") {
          handleNewOrder(order);
        } else if (order.status === "shipping") {
          handleAutoCompleteOrder(order);
        }
      });
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNewOrder = async (order) => {
    try {
      await updateOrder(order.id, { status: "finding_shipper" });
      setTimeout(async () => {
        const nearestShipper = await findNearestShipper(
          WAREHOUSE_LAT,
          WAREHOUSE_LNG
        );
        if (nearestShipper) {
          await Promise.all([
            updateOrder(order.id, {
              status: "shipping",
              shippedAt: new Date().toISOString(),
              shipperId: nearestShipper.id,
            }),
            updateShipperStatus(nearestShipper.id, {
              status: "delivering",
              currentOrderId: order.id,
              // address: order.shippingAddress,
              // lat: order.shippingLat,
              // lng: order.shippingLng,
            }),
          ]);
          toast.success(
            `Đã gán shipper ${nearestShipper.name} cho đơn hàng #${order.orderNumber}`
          );
        } else {
          await updateOrder(order.id, { status: "pending" });
          toast.warning(
            "Không tìm thấy shipper nào sẵn sàng, đơn hàng quay lại hàng chờ."
          );
        }
        fetchOrders();
      }, 5000);
    } catch (error) {
      console.error("Error processing order:", error);
      await updateOrder(order.id, { status: "pending" });
    }
  };

  const handleAutoCompleteOrder = async (order) => {
    const shippedTime = new Date(order.shippedAt).getTime();
    const currentTime = new Date().getTime();
    if (currentTime - shippedTime > 30 * 60 * 1000) {
      try {
        await Promise.all([
          updateOrder(order.id, {
            status: "delivered",
            deliveredAt: new Date().toISOString(),
          }),
          order.shipperId &&
            updateShipperStatus(order.shipperId, {
              status: "available",
              currentOrderId: null,
              address: order.shippingAddress,
              lat: order.shippingLat,
              lng: order.shippingLng,
            }),
        ]);
        toast.success(`Đơn hàng #${order.orderNumber} đã tự động hoàn thành`);
        fetchOrders();
      } catch (error) {
        console.error("Error auto-completing order:", error);
      }
    }
  };

  const handleConfirmDelivery = async (order) => {
    try {
      await Promise.all([
        updateOrder(order.id, {
          status: "delivered",
          deliveredAt: new Date().toISOString(),
        }),

        order.shipperId &&
          updateShipperStatus(order.shipperId, {
            status: "available",
            currentOrderId: null,
            address: order.shippingAddress,
            lat: order.shippingLat,
            lng: order.shippingLng,
          }),
      ]);
      toast.success(
        `Đã xác nhận giao hàng thành công cho đơn #${order.orderNumber}`
      );
      fetchOrders();
    } catch (error) {
      console.error("Error confirming delivery:", error);
      toast.error("Có lỗi xảy ra khi xác nhận giao hàng");
    }
  };

  const handleAcceptOrder = async (order) => {
    try {
      if (!currentUser?.isAdmin && !currentUser?.isShipper) return;
      const shipperId = currentUser?.isShipper ? currentUser.id : null;

      await updateOrder(order.id, {
        status: "shipping",
        shippedAt: new Date().toISOString(),
        shipperId: shipperId || undefined,
      });
      if (currentUser?.isShipper) {
        await updateShipperStatus(currentUser.id, {
          status: "delivering",
          currentOrderId: order.id,
        });
      }

      toast.success("Đã nhận đơn hàng thành công");
      fetchOrders();
    } catch (error) {
      console.error("Error accepting order:", error);
      toast.error("Có lỗi xảy ra khi nhận đơn hàng");
    }
  };

  const renderShipperInfo = (order) => {
    if (!order.shipperId || !order.shipper) return null;
    return (
      <div className="mt-2">
        <div className="flex items-center">
          <span className="text-sm text-textSecondary mr-2">Shipper:</span>
          <span className="font-medium">{order.shipper.name}</span>
          <span className="mx-2">•</span>
          <span className="text-sm">{order.shipper.phoneNumber}</span>
        </div>
        {order.shippedAt && (
          <p className="text-sm text-textSecondary mt-1">
            Nhận lúc: {new Date(order.shippedAt).toLocaleString("vi-VN")}
          </p>
        )}
        {order.deliveredAt && (
          <p className="text-sm text-green-600 mt-1">
            Giao lúc: {new Date(order.deliveredAt).toLocaleString("vi-VN")}
          </p>
        )}
      </div>
    );
  };

  const renderActionButtons = (order) => {
    const canTakeAction =
      currentUser?.isAdmin ||
      (currentUser?.isShipper && order.shipperId === currentUser.id);

    if (!canTakeAction) return null;

    if (
      order.status === "pending" ||
      order.status === "processing" ||
      order.status === "finding_shipper"
    ) {
      return (
        <button
          onClick={() => handleAcceptOrder(order)}
          className="px-4 py-1.5 gradient-bg rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          Nhận đơn hàng
        </button>
      );
    }

    if (order.status === "shipping") {
      return (
        <button
          onClick={() => handleConfirmDelivery(order)}
          className="px-4 py-1.5 bg-green-600 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
        >
          Xác nhận giao hàng
        </button>
      );
    }

    return null;
  };

  const renderTimeline = (order) => {
    return (
      <div className="relative">
        <div className="flex mb-4">
          <div className="flex flex-col items-center mr-4">
            {["pending", "processing", "delivered"].map((step, index) => {
              const isCompleted =
                (step === "pending" && order.status !== "pending") ||
                (step === "processing" &&
                  (order.status === "processing" ||
                    order.status === "shipping" ||
                    order.status === "delivered")) ||
                (step === "delivered" && order.status === "delivered");

              return (
                <React.Fragment key={step}>
                  <div
                    className={`w-4 h-4 rounded-full ${
                      isCompleted ? "bg-accent" : "bg-gray-200"
                    }`}
                  ></div>
                  {index < 2 && (
                    <div
                      className={`w-1 h-12 ${
                        isCompleted ? "bg-accent" : "bg-gray-200"
                      } my-1`}
                    ></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex-1">
            {["pending", "processing", "delivered"].map((step) => {
              const stepInfo = ORDER_STATUS[step] || {};
              const isActive =
                (step === "pending" && order.status !== "pending") ||
                (step === "processing" &&
                  (order.status === "processing" ||
                    order.status === "shipping" ||
                    order.status === "delivered")) ||
                (step === "delivered" && order.status === "delivered");

              return (
                <div key={step} className="mb-6 last:mb-0">
                  <h5
                    className={`font-semibold ${
                      isActive ? "text-accent" : "text-textSecondary"
                    }`}
                  >
                    {stepInfo.text || step}
                  </h5>
                  <p className="text-sm text-textSecondary">
                    {stepInfo.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="bg-card shadow-card rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-textPrimary">
            {currentUser?.isShipper ? "Đơn hàng của tôi" : "Đơn hàng gần đây"}
          </h3>
          {!currentUser?.isShipper && (
            <div className="flex space-x-2">
              {[
                "all",
                "pending",
                "finding_shipper",
                "shipping",
                "delivered",
              ].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    filter === status
                      ? "gradient-bg text-white"
                      : "bg-gray-100 text-textSecondary"
                  } hover:opacity-90 transition-opacity`}
                >
                  {status === "all"
                    ? "Tất cả"
                    : ORDER_STATUS[status]?.text || status}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-400">
            Đang tải đơn hàng...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            Không có đơn hàng nào
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const statusInfo = ORDER_STATUS[order.status] || {
                class: "bg-gray-100 text-gray-800",
                text: "Không xác định",
                description: "",
              };

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg border border-border p-4 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-textPrimary">
                          #{order.orderNumber}
                        </h4>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${statusInfo.class} font-medium`}
                        >
                          {statusInfo.text}
                        </span>
                      </div>
                      <p className="text-sm text-textSecondary">
                        Đặt ngày{" "}
                        {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                      </p>
                      {renderShipperInfo(order)}
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <p className="font-semibold text-primary">
                        {order.total?.toLocaleString()}đ
                      </p>
                      <p className="text-sm text-textSecondary">
                        {order.items?.length || 0} sản phẩm
                      </p>
                    </div>
                  </div>

                  {renderTimeline(order)}

                  <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-border">
                    <button className="px-4 py-1.5 border border-primary rounded-lg text-sm text-primary hover:bg-primary/5 transition-colors">
                      Xem chi tiết
                    </button>
                    {renderActionButtons(order)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderStatus;
