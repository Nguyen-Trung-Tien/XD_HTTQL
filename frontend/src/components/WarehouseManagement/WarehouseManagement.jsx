import React, { useState } from "react";
import { FiBox, FiClipboard, FiTruck, FiArchive } from "react-icons/fi";

import ImportReceipts from "../ImportReceiptComponent/importReceipt";
import ImportDetails from "../ImportDetailComponent/ImportDetails";
import ExportReceipts from "../ExportReceiptsList/ExportReceipts";
import ExportDetails from "../ExportDetails/ExportDetails";

export default function WarehouseManagement() {
  const [activeTab, setActiveTab] = useState("importReceipts");

  const menuItems = [
    { id: "importReceipts", label: "Phiếu nhập", icon: <FiBox /> },
    { id: "importDetails", label: "Chi tiết nhập", icon: <FiClipboard /> },
    { id: "exportReceipts", label: "Phiếu xuất", icon: <FiTruck /> },
    { id: "exportDetails", label: "Chi tiết xuất", icon: <FiArchive /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center gap-4 border-b border-gray-200 bg-white shadow-sm px-4 py-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 shadow-sm
              ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-[#00BFFF] hover:to-[#87CEFA] hover:text-white"
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        {activeTab === "importReceipts" && <ImportReceipts />}
        {activeTab === "importDetails" && <ImportDetails />}
        {activeTab === "exportReceipts" && <ExportReceipts />}
        {activeTab === "exportDetails" && <ExportDetails />}
      </div>
    </div>
  );
}
