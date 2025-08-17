import React, { useRef, useState, useCallback,useEffect } from "react";
import { getAllOrders } from "../../API/orders/ordersApi";
import OrderTable from "./OrderTable";
import OrderStatus from "./OrderStatus";
import OrderWizard from "./OrderWizard";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllOrders();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleOrderChanged = () => {
    fetchOrders();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-textPrimary mb-6">
        Quản Lý Đơn Hàng
      </h1>
      <section className="mb-8">
        {!showWizard && (
          <OrderTable
            orders={orders}
            loading={loading}
            onCreateOrder={() => setShowWizard(true)}
            onOrderChanged={handleOrderChanged}
          />
        )}
        {showWizard && (
          <OrderWizard
            onOrderCreated={() => {
              setShowWizard(false);
              fetchOrders();
            }}
          />
        )}
      </section>
      <section className="mb-8">
        <OrderStatus
          orders={orders}
          loading={loading}
          onOrderChanged={handleOrderChanged}
        />
      </section>
    </div>
  );
}

export default Orders;