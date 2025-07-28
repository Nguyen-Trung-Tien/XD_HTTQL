import React from 'react'
import ShipperMap from './ShipperMap'
import ShipperList from './ShipperList'
function Shippers() {
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-textPrimary mb-6">Quản Lý Shipper</h1>
          
          <section className="mb-8">
            <ShipperMap  />
          </section>
          
          <section className="mb-8">
            <ShipperList  />
          </section>
        </div>
      );
    }

export default Shippers
