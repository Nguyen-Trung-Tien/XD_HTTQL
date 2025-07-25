import React from "react";

function ShipperMap() {
  return (
    <div className="bg-card shadow-card rounded-lg overflow-hidden mb-6">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-textPrimary">
            Vị trí Shipper
          </h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm rounded-md gradient-bg text-white hover:opacity-90 transition-opacity">
              Tất cả
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-textSecondary hover:bg-gray-200 transition-colors">
              Sẵn sàng
            </button>
            <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-textSecondary hover:bg-gray-200 transition-colors">
              Đang giao
            </button>
          </div>
        </div>

        <div className="relative h-80 bg-gray-100 rounded-lg overflow-hidden">
          {/* Map Placeholder (would be replaced with actual map in a real implementation) */}
          <div className="absolute inset-0 bg-[#E8F4F8]">
            {/* Grid lines */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(0, 191, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 191, 255, 0.1) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            ></div>

            {/* Roads */}
            <div className="absolute h-1 w-full top-1/2 bg-white"></div>
            <div className="absolute h-full w-1 left-1/2 bg-white"></div>
            <div className="absolute h-1 w-1/2 top-1/4 left-1/4 bg-white"></div>
            <div className="absolute h-1/2 w-1 top-1/4 left-1/4 bg-white"></div>
            <div className="absolute h-1 w-1/3 top-3/4 left-1/3 bg-white"></div>

            {/* Map markers */}
            <div
              className="absolute w-4 h-4 bg-accent rounded-full top-1/4 left-1/3 animate-pulse"
              style={{ boxShadow: "0 0 10px rgba(255, 215, 0, 0.7)" }}
            ></div>
            <div
              className="absolute w-4 h-4 bg-accent rounded-full top-1/2 left-1/2 animate-pulse"
              style={{ boxShadow: "0 0 10px rgba(255, 215, 0, 0.7)" }}
            ></div>
            <div
              className="absolute w-4 h-4 bg-accent rounded-full top-1/3 left-2/3 animate-pulse"
              style={{ boxShadow: "0 0 10px rgba(255, 215, 0, 0.7)" }}
            ></div>
            <div
              className="absolute w-4 h-4 bg-primary rounded-full top-2/3 left-1/4 animate-pulse"
              style={{ boxShadow: "0 0 10px rgba(0, 191, 255, 0.7)" }}
            ></div>
            <div
              className="absolute w-4 h-4 bg-primary rounded-full top-3/4 left-3/4 animate-pulse"
              style={{ boxShadow: "0 0 10px rgba(0, 191, 255, 0.7)" }}
            ></div>
          </div>

          {/* Map controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-primary hover:text-accent transition-colors shadow-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </button>
            <button className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-primary hover:text-accent transition-colors shadow-sm">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H4"
                ></path>
              </svg>
            </button>
          </div>

          {/* Map legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-md p-2 shadow-sm">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-xs text-textSecondary">
                Đang giao hàng (3)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-xs text-textSecondary">Sẵn sàng (2)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShipperMap;
