import React, { useState, useEffect } from "react";
import ShipperMap from "./ShipperMap";
import ShipperList from "./ShipperList";
import AddShipperForm from "./AddShipperForm";
import { getAllShippers } from "../API/shipper/shipperApi";

function Shippers() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [shippers, setShippers] = useState([]);

  useEffect(() => {
    const fetchShippers = async () => {
      try {
        const data = await getAllShippers();
        setShippers(data);
      } catch (error) {
        console.error("Error fetching shippers:", error);
      }
    };
    
    fetchShippers();
  }, []);

  const handleAddSuccess = (newShipper) => {
    setShippers(prev => [...prev, newShipper]);
    setShowAddModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-textPrimary mb-6">
        Quản Lý Shipper
      </h1>
      <section className="mb-8">
        <ShipperMap shippers={shippers} />
      </section>
      <section className="mb-8">
        <ShipperList 
          shippers={shippers} 
          onAddShipper={() => setShowAddModal(true)} 
        />
      </section>
      {showAddModal && (
        <AddShipperForm
          onSuccess={handleAddSuccess}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

export default Shippers;