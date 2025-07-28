import React, { useState } from "react";
import ShipperMap from "./ShipperMap";
import ShipperList from "./ShipperList";
import AddShipperForm from "./AddShipperForm";

function Shippers() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-textPrimary mb-6">
        Quản Lý Shipper
      </h1>
      <section className="mb-8">
        <ShipperMap />
      </section>
      <section className="mb-8">
        <ShipperList onAddShipper={() => setShowAddModal(true)} />
      </section>
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-0 relative">
            <button
              className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-500"
              onClick={() => setShowAddModal(false)}
            >
              ×
            </button>
            <AddShipperForm
              onSuccess={() => setShowAddModal(false)}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Shippers;
