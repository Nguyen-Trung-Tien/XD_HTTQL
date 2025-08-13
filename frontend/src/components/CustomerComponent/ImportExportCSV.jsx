import React from "react";
import * as XLSX from "xlsx";
import { FiFileText } from "react-icons/fi";

export default function ExportExcel({ customers }) {
  const handleExport = () => {
    const data = customers.map((c) => ({
      Name: c.name,
      Email: c.email,
      Phone: c.phoneNumber,
      Address: c.address,
      City: c.city,
      Status: c.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "customers.xlsx");
  };

  return (
    <div
      onClick={handleExport}
      className="flex items-center justify-center gap-3 cursor-pointer px-4 py-2 rounded-lg gradient-bg text-white font-bold shadow-card hover:opacity-90 transition select-none"
    >
      <FiFileText size={18} />
      <span className="text-sm md:text-lg">Export Excel</span>
    </div>
  );
}