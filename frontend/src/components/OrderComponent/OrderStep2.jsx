import React, { useState, useEffect } from "react";
import AddressAutocomplete from "../AddressAutocomplete";
import { fetchAllCustomers } from "../../API/customer/customerApi";
import { FiX } from "react-icons/fi";
function OrderStep2({ orderData, setOrderData, setCurrentStep }) {
  const [customerOption, setCustomerOption] = useState("new");
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  useEffect(() => {
    if (customerOption === "existing") {
      fetchCustomers();
    }
  }, [searchTerm, customerOption]);

  const fetchCustomers = async () => {
    setIsLoadingCustomers(true);
    try {
      const res = await fetchAllCustomers(1, 1000, searchTerm);
      if (res?.data?.errCode === 0) {
        setCustomers(res.data.customers || []);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setIsLoadingCustomers(false);
    }
  };

  const handleCustomerChange = (e) => {
    setOrderData({
      ...orderData,
      customer: {
        ...orderData.customer,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSelectExistingCustomer = (customer) => {
    setOrderData({
      ...orderData,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phoneNumber,
        address: customer.address,
        lat: customer.lat,
        lng: customer.lng,
      },
      shipping: {
        ...orderData.shipping,
        address: customer.address,
        lat: customer.lat,     
      lng: customer.lng,
      },
    });
    setShowCustomerModal(false);
  };

  const handleAddressSelect = (selectedAddress) => {
    setOrderData({
      ...orderData,
      shipping: {
        ...orderData.shipping,
        address: selectedAddress.display_name,
        lat: selectedAddress.lat,
        lng: selectedAddress.lon,
        ...(selectedAddress.address && {
          city:
            selectedAddress.address.city || selectedAddress.address.town || "",
          postalCode: selectedAddress.address.postcode || "",
          country: selectedAddress.address.country || "Việt Nam",
        }),
      },
    });
  };

  const handleAddressChange = (value) => {
    setOrderData({
      ...orderData,
      shipping: {
        ...orderData.shipping,
        address: value,
      },
    });
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <h4 className="text-md font-semibold text-textPrimary mb-4">
            Thông tin khách hàng
          </h4>

          <div className="flex mb-4 border-b border-gray-200">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                customerOption === "new"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setCustomerOption("new")}
            >
              Khách hàng mới
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                customerOption === "existing"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setCustomerOption("existing")}
            >
              Khách hàng cũ
            </button>
          </div>

          {customerOption === "existing" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textSecondary mb-1">
                  Chọn khách hàng
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm khách hàng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowCustomerModal(true)}
                    className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    onClick={() => setShowCustomerModal(true)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center bg-gray-100 rounded-r-lg border-l border-gray-200"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
                {orderData.customer.id && orderData.customer.name && (
                  <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="font-medium">{orderData.customer.name}</p>
                    <p className="text-sm text-gray-600">
                      {orderData.customer.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      {orderData.customer.email}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textSecondary mb-1">
                  Tên khách hàng *
                </label>
                <input
                  type="text"
                  name="name"
                  value={orderData.customer.name}
                  onChange={handleCustomerChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textSecondary mb-1">
                  Email khách hàng *
                </label>
                <input
                  type="email"
                  name="email"
                  value={orderData.customer.email}
                  onChange={handleCustomerChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textSecondary mb-1">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.customer.phone}
                  onChange={handleCustomerChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-md font-semibold text-textPrimary mb-4">
            Địa chỉ giao hàng
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Địa chỉ giao hàng *
              </label>
              <AddressAutocomplete
                value={orderData.shipping.address}
                onChange={handleAddressChange}
                onSelect={handleAddressSelect}
              />

              <input
                type="hidden"
                name="lat"
                value={orderData.shipping.lat || ""}
              />
              <input
                type="hidden"
                name="lng"
                value={orderData.shipping.lng || ""}
              />
            </div>
          </div>
        </div>
      </div>

      {showCustomerModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          onClick={() => setShowCustomerModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[80vh] flex flex-col overflow-hidden animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
              <h3 className="text-lg font-semibold">Chọn khách hàng</h3>
              <button
                onClick={() => setShowCustomerModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <div className="mb-4 flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Tìm theo tên hoặc số điện thoại..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                    >
                      <FiX size={18} />
                    </button>
                  )}
                </div>
                <button
                  onClick={fetchCustomers}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition whitespace-nowrap"
                >
                  Tìm kiếm
                </button>
              </div>

              {isLoadingCustomers ? (
                <div className="text-center py-8">Đang tải...</div>
              ) : customers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm
                    ? "Không tìm thấy khách hàng"
                    : "Nhập thông tin để tìm kiếm"}
                </div>
              ) : (
                <div className="space-y-2">
                  {customers.map((customer) => (
                    <div
                      key={customer.id}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleSelectExistingCustomer(customer)}
                    >
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-600">
                        {customer.phoneNumber}
                      </p>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(1)}
          className="px-6 py-2 border border-border bg-white text-textPrimary rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm"
        >
          Quay lại
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          disabled={
            !orderData.customer.name ||
            !orderData.customer.phone ||
            !orderData.shipping.address
          }
          className={`px-6 py-2 gradient-bg text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-sm ${
            !orderData.customer.name ||
            !orderData.customer.phone ||
            !orderData.shipping.address
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Bước tiếp theo
        </button>
      </div>
    </div>
  );
}

export default OrderStep2;
