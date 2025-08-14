import React from "react";
import AddressAutocomplete from "../AddressAutocomplete";

function OrderStep2({ orderData, setOrderData, setCurrentStep }) {
  const handleCustomerChange = (e) => {
  setOrderData({
    ...orderData,
    customer: {
      ...orderData.customer,
      [e.target.name]: e.target.value,
    },
  });
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
