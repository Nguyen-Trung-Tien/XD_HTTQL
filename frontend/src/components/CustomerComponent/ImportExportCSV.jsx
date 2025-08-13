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
      className="flex items-center justify-center gap-3 cursor-pointer p-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 select-none"
    >
      <FiFileText size={28} />
      <span className="text-lg">Export Excel</span>
    </div>
  );
}
