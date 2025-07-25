import React from 'react'
import OrderWizard from './OrderWizard'
import OrderStatus from './OrderStatus'
function Orders() {
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-textPrimary mb-6">Quản Lý Đơn Hàng</h1>
          
          <section className="mb-8">
            <OrderWizard />
          </section>
          
          <section className="mb-8">
            <OrderStatus />
          </section>
        </div>
      );
    }

export default Orders
