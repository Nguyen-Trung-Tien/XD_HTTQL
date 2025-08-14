import React from "react";
import { FiSearch, FiMapPin, FiActivity } from "react-icons/fi";

function FilterBar({
  search,
  onSearchChange,
  cityFilter,
  onCityFilterChange,
  allCities,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-4">
      {/* Search */}
      <div className="flex items-center flex-1 border border-border rounded-lg px-3 focus-within:ring-2 focus-within:ring-primary/30 bg-card transition w-full md:w-96">
        <FiSearch className="text-textSecondary mr-2" />
        <input
          type="text"
          placeholder="Tìm theo tên, email hoặc SĐT..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 p-2 bg-transparent text-textPrimary focus:outline-none"
        />
      </div> 
    </div>
  );
}
export default FilterBar;