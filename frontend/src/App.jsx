import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Shippers from "./components/Shippers";
import TopProducts from "./components/TopProducts";
import Inventory from "./components/Inventory";
import Statistics from "./components/Statistics";
import Layout from "./components/Layout";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="shippers" element={<Shippers />} />
          <Route path="stats" element={<Statistics />} />  
        </Route>
      </Routes>
    </>
  );
}

export default App;
