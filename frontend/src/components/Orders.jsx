import React , {useRef} from 'react'
import OrderWizard from './OrderWizard'
import OrderStatus from './OrderStatus'
function Orders() {
  const orderStatusRef = useRef();
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-textPrimary mb-6">Quản Lý Đơn Hàng</h1>
          
          <section className="mb-8">
            <OrderWizard onOrderCreated={() => orderStatusRef.current?.fetchOrders()} />
          </section>
          
          <section className="mb-8">
            <OrderStatus ref={orderStatusRef} />
          </section>
        </div>
      );
    }

export default Orders
