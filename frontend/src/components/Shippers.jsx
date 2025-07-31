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
} from "../API/shipper/shipperApi";
import { toast } from "react-toastify";

function Shippers() {
  const [shippers, setShippers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [focusId, setFocusId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingShipper, setEditingShipper] = useState(null);

  const fetchShippers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllShippers();
      setShippers(data);
    } catch (err) {
      console.error("Không thể tải danh sách shipper:", err);
      toast.error("Không thể tải danh sách shipper!");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchShippers();
  }, [fetchShippers]);

  const handleAdd = async (newData) => {
    try {
      await addNewShipper(newData);
      toast.success("Thêm shipper thành công!");
      setShowAdd(false);

      await fetchShippers();
    } catch (err) {
      toast.error("Thêm shipper thất bại");
    }
  };
  const handleDeleteShipper = async (id) => {
    const confirm = window.confirm(
      "🗑️ Bạn có chắc chắn muốn xoá shipper này không?"
    );

    if (!confirm) return;

    try {
      await deleteShipper(id);
      setShippers((prev) => prev.filter((s) => s.id !== id));
      toast.success("Xóa shipper thành công!");
    } catch (err) {
      toast.error("Xóa shipper thất bại ");
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
      await fetchShippers();
    } catch (err) {
      toast.error("Cập nhật shipper thất bại");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản Lý Shipper</h1>

      <ShipperMap shippers={shippers} focusId={focusId} />

      <ShipperList
        shippers={shippers}
        onAddShipper={() => setShowAdd(true)}
        onDeleteShipper={handleDeleteShipper}
        onFocusShipper={setFocusId}
        onEditShipper={(shipper) => setEditingShipper(shipper)}
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
