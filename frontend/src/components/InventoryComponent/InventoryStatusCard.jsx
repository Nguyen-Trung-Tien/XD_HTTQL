import React, { useMemo } from "react";

const InventoryStatusCard = ({ inventoryItems }) => {
  // Tính toán thống kê từ inventoryItems
  const stats = useMemo(() => {
    const total = inventoryItems.length;
    if (total === 0) {
      return { inStock: 0, lowStock: 0, outOfStock: 0, total: 0 };
    }

    const inStock = inventoryItems.filter((item) => item.stock > 10).length;
    const lowStock = inventoryItems.filter(
      (item) => item.stock > 0 && item.stock <= 10
    ).length;
    const outOfStock = inventoryItems.filter((item) => item.stock === 0).length;

    return {
      inStockPercent: Math.round((inStock / total) * 100),
      lowStockPercent: Math.round((lowStock / total) * 100),
      outOfStockPercent: Math.round((outOfStock / total) * 100),
      total,
    };
  }, [inventoryItems]);

  return (
    <div className="bg-card shadow-card rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">
          Tình trạng tồn kho
        </h3>
        <div className="h-64 flex items-center justify-center">
          <div className="relative w-40 h-40">
            {/* Chart SVG */}
            <svg viewBox="0 0 36 36" className="w-full h-full">
              {/* vòng ngoài xám */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="3"
              />
              {/* còn hàng */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#00BFFF"
                strokeWidth="3"
                strokeDasharray={`${stats.inStockPercent}, 100`}
                strokeLinecap="round"
              />
              {/* sắp hết */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#FFD700"
                strokeWidth="3"
                strokeDasharray={`${stats.lowStockPercent}, 100`}
                strokeDashoffset={`-${stats.inStockPercent}`}
                strokeLinecap="round"
              />
              {/* hết hàng */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#FF6B6B"
                strokeWidth="3"
                strokeDasharray={`${stats.outOfStockPercent}, 100`}
                strokeDashoffset={`-${stats.inStockPercent + stats.lowStockPercent}`}
                strokeLinecap="round"
              />
            </svg>
            {/* số tổng */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-textPrimary">
                  {stats.total}
                </div>
                <div className="text-xs text-textSecondary">Tổng sản phẩm</div>
              </div>
            </div>
          </div>
        </div>
        {/* Thống kê % */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="text-center p-2 bg-gray-50 rounded-md">
            <div className="text-sm font-semibold text-textPrimary">
              {stats.inStockPercent}%
            </div>
            <div className="text-xs text-textSecondary flex items-center justify-center">
              <div className="w-3 h-3 bg-primary rounded-full mr-1"></div>
              Còn hàng
            </div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-md">
            <div className="text-sm font-semibold text-textPrimary">
              {stats.lowStockPercent}%
            </div>
            <div className="text-xs text-textSecondary flex items-center justify-center">
              <div className="w-3 h-3 bg-accent rounded-full mr-1"></div>
              Sắp hết
            </div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-md">
            <div className="text-sm font-semibold text-textPrimary">
              {stats.outOfStockPercent}%
            </div>
            <div className="text-xs text-textSecondary flex items-center justify-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              Hết hàng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryStatusCard;
