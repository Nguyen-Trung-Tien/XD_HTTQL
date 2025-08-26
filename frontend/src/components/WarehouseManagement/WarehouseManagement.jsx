import React, { useState, useEffect } from "react";
import { FiBox, FiClipboard, FiTruck, FiArchive } from "react-icons/fi";

import ImportReceipts from "../ImportReceiptComponent/ImportReceipt";
import ImportDetails from "../ImportDetailComponent/ImportDetails";
import ExportReceipts from "../ExportReceiptsComponent/ExportReceipts";
import ExportDetails from "../ExportDetailsComponent/ExportDetails";

export default function WarehouseManagement() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeWarehouseTab") || "importReceipts";
  });

  useEffect(() => {
    localStorage.setItem("activeWarehouseTab", activeTab);
  }, [activeTab]);

  const menuItems = [
    {
      id: "importReceipts",
      label: "Phiếu nhập",
      icon: <FiBox className="w-4 h-4" />,
    },
    {
      id: "importDetails",
      label: "Chi tiết nhập",
      icon: <FiClipboard className="w-4 h-4" />,
    },
    {
      id: "exportReceipts",
      label: "Phiếu xuất",
      icon: <FiTruck className="w-4 h-4" />,
    },
    {
      id: "exportDetails",
      label: "Chi tiết xuất",
      icon: <FiArchive className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center gap-2 border-b border-gray-200 bg-white shadow-sm px-4 py-2 sticky top-0 z-10">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-semibold text-xs transition-all duration-200 shadow-sm
              ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white shadow-md scale-105"
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
