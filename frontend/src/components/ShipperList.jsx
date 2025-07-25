import React from 'react'

function ShipperList() {
      const shippers = [
        {
          id: 'SH-001',
          name: 'Nguyễn Văn An',
          status: 'delivering',
          currentOrder: {
            id: 'ĐH-7829',
            estimatedDelivery: '14:30'
          },
          location: {
            lat: 10.762622,
            lng: 106.660172,
            address: 'Trung tâm'
          }
        },
        {
          id: 'SH-002',
          name: 'Trần Thị Mai',
          status: 'available',
          currentOrder: null,
          location: {
            lat: 10.773831,
            lng: 106.685396,
            address: 'Kho hàng'
          }
        },
        {
          id: 'SH-003',
          name: 'Lê Minh Tuấn',
          status: 'delivering',
          currentOrder: {
            id: 'ĐH-7815',
            estimatedDelivery: '15:45'
          },
          location: {
            lat: 10.762622,
            lng: 106.660172,
            address: 'Quận 1'
          }
        }
      ];
      
      const getStatusClass = (status) => {
        switch (status) {
          case 'delivering':
            return 'bg-accent/20 text-accent';
          case 'available':
            return 'bg-green-100 text-green-800';
          default:
            return 'bg-gray-100 text-gray-800';
        }
      };
      
      const getStatusText = (status) => {
        switch (status) {
          case 'delivering':
            return 'Đang giao hàng';
          case 'available':
            return 'Sẵn sàng';
          default:
            return 'Không xác định';
        }
      };
      
      return (
        <div className="bg-card shadow-card rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-textPrimary">Trạng thái Shipper</h3>
              <button className="px-4 py-1.5 gradient-bg rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity">
                Thêm Shipper mới
              </button>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">Shipper</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">Trạng thái</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">Đơn hàng hiện tại</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">Vị trí</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border">
                  {shippers.map(shipper => (
                    <tr key={shipper.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-textPrimary">{shipper.name}</div>
                            <div className="text-xs text-textSecondary">ID: {shipper.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(shipper.status)} font-medium`}>
                          {getStatusText(shipper.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {shipper.currentOrder ? (
                          <div>
                            <div className="text-sm font-medium text-textPrimary">#{shipper.currentOrder.id}</div>
                            <div className="text-xs text-textSecondary">Dự kiến: {shipper.currentOrder.estimatedDelivery}</div>
                          </div>
                        ) : (
                          <div className="text-sm text-textSecondary">Không có đơn hàng</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-accent mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          <span className="text-sm text-textPrimary">{shipper.location.address}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button className="p-1 text-primary hover:text-accent transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                          </button>
                          <button className="p-1 text-primary hover:text-accent transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                          </button>
                          <button className="p-1 text-primary hover:text-accent transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }


export default ShipperList
