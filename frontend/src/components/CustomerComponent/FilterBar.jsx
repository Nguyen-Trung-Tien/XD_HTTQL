import React from "react";
import { FiSearch, FiMapPin, FiActivity } from "react-icons/fi";

export default function FilterBar({
  search,
  onSearchChange,
  cityFilter,
  onCityFilterChange,
  statusFilter,
  onStatusFilterChange,
  allCities,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      {/* Search */}
      <div className="flex items-center flex-1 border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary/30 bg-card transition">
        <FiSearch className="text-textSecondary mr-2" />
        <input
          type="text"
          placeholder="Tìm theo tên, email hoặc SĐT..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 p-2 bg-transparent text-textPrimary focus:outline-none"
        />
      </div>

      {/* City filter */}
      <div className="flex items-center border border-border rounded-lg px-3 bg-card transition">
        <FiMapPin className="text-textSecondary mr-2" />
        <select
          value={cityFilter}
          onChange={(e) => onCityFilterChange(e.target.value)}
          className="p-2 focus:outline-none bg-transparent text-textPrimary"
        >
          <option value="">-- Tất cả tỉnh/thành --</option>
          {allCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Status filter */}
      <div className="flex items-center border border-border rounded-lg px-3 bg-card transition">
        <FiActivity className="text-textSecondary mr-2" />
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="p-2 focus:outline-none bg-transparent text-textPrimary"
        >
          <option value="">-- Tất cả trạng thái --</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Ngừng hoạt động</option>
        </select>
      </div>
    </div>
  );
}