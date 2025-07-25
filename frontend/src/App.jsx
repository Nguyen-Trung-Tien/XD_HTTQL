import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Shippers from "./components/Shippers";
import ParticlesBackground from "./components/ParticlesBackground";
import TopProducts from "./components/TopProducts";
import Inventory from "./components/Inventory";
import Statistics from "./components/Statistics";
function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    const wrapperClass =
      "border border-blue-200 rounded-xl bg-white shadow-sm p-6";
    switch (activeTab) {
      case "dashboard":
        return (
          <div className={wrapperClass}>
            <Dashboard />
          </div>
        );
      case "orders":
        return (
          <div className={wrapperClass}>
            <Orders />
          </div>
        );
      case "shippers":
        return (
          <div className={wrapperClass}>
            <Shippers />
          </div>
        );
      case "products":
        return (
          <div className={wrapperClass}>
            <TopProducts />
          </div>
        );
      case "inventory":
        return (
          <div className={wrapperClass}>
            <Inventory />
          </div>
        );
      case "stats":
        return (
          <div className={wrapperClass}>
            <Statistics />
          </div>
        );
      default:
        return (
          <div className={wrapperClass}>
            <Dashboard />
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          setMobileMenuOpen={setMobileMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <ParticlesBackground />
          <div className="relative z-10">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default App;
