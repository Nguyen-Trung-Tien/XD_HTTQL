import React, { useState, useEffect, useCallback } from "react";
import ShipperMap from "./ShipperMap";
import ShipperList from "./ShipperList";
import AddShipperForm from "./AddShipperForm";
import EditShipperForm from "./EditShipperForm";
import {
  getAllShippers,
  addNewShipper,
  deleteShipper,
  updateShipper,
  updateShipperStatus,
} from "../../API/shipper/shipperApi";
import { getAllOrders } from "../../API/orders/ordersApi";
import { toast } from "react-toastify";

function Shippers() {
  const [shippers, setShippers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [focusId, setFocusId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingShipper, setEditingShipper] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const [shippersData, ordersData] = await Promise.all([
        getAllShippers(),
        getAllOrders(),
      ]);
      setShippers(shippersData);
      setOrders(ordersData);
    } catch (err) {
      console.error("Không thể tải dữ liệu:", err);
      toast.error("Không thể tải dữ liệu shipper và đơn hàng");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchData]);

  const handleAdd = async (newData) => {
    try {
      await addNewShipper(newData);
      toast.success("Thêm shipper thành công!");
      setShowAdd(false);
      await fetchData();
    } catch (err) {
      toast.error("Thêm shipper thất bại", err);
    }
  };

  const handleDeleteShipper = async (id) => {
    const confirm = window.confirm(
      "🗑️ Bạn có chắc chắn muốn xoá shipper này không?"
    );
    if (!confirm) return;

    try {
      await deleteShipper(id);
      toast.success("Xóa shipper thành công!");
      await fetchData();
    } catch (err) {
      toast.error("Xóa shipper thất bại", err);
    }
  };

  const handleEdit = async (formData) => {
    try {
      await updateShipper(formData.id, {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        status: formData.status,
      });
      toast.success("Cập nhật shipper thành công!");
      setEditingShipper(null);
      await fetchData();
    } catch (err) {
      toast.error("Cập nhật shipper thất bại", err);
    }
  };

  const handleUpdateStatus = async (shipperId, newStatus) => {
    try {
      await updateShipperStatus(shipperId, { status: newStatus });
      toast.success("Cập nhật trạng thái thành công!");
      await fetchData();
    } catch (err) {
      toast.error("Cập nhật trạng thái thất bại", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản Lý Shipper</h1>

      <ShipperMap shippers={shippers} focusId={focusId} />

      <ShipperList
        shippers={shippers}
        orders={orders}
        onAddShipper={() => setShowAdd(true)}
        onDeleteShipper={handleDeleteShipper}
        onFocusShipper={setFocusId}
        onEditShipper={(shipper) => setEditingShipper(shipper)}
        onUpdateStatus={handleUpdateStatus}
        loading={loading}
      />

      {showAdd && (
        <AddShipperForm
          shipper={editingShipper}
          onSubmit={handleAdd}
          onClose={() => setShowAdd(false)}
        />
      )}
      {editingShipper && (
        <EditShipperForm
          shipper={editingShipper}
          onSubmit={handleEdit}
          onClose={() => setEditingShipper(null)}
        />
      )}
    </div>
  );
}

export default Shippers;
