
import React, { useState, useEffect } from "react";
import ShipperMap from "./ShipperMap";
import ShipperList from "./ShipperList";
import AddShipperForm from "./AddShipperForm";
import { getAllShippers, addNewShipper, deleteShipper } from "../API/shipper/shipperApi";
import { toast } from "react-toastify";

 function Shippers() {
  const [shippers, setShippers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [focusId, setFocusId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllShippers();
        setShippers(data);
      } catch (err) {
        console.error("Không thể tải danh sách shipper:", err);
      }
    })();
  }, []);

  const handleAdd = async (newData) => {
    try {
      const added = await addNewShipper(newData);
      setShippers(prev => [...prev, added]);
      toast.success("Thêm shipper thành công!");
      setShowAdd(false);
    } catch (err) {
      toast.error("Thêm shipper thất bại");
    }
  };



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản Lý Shipper</h1>

      <ShipperMap
        shippers={shippers}
        focusId={focusId}
      />

      <ShipperList
        shippers={shippers}
        onAddShipper={() => setShowAdd(true)}
        onFocusShipper={setFocusId}
      />

      {showAdd && (
        <AddShipperForm
          onSubmit={handleAdd}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}
export default Shippers;