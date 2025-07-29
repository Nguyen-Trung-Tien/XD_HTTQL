import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Shippers from "./components/Shippers";
import Inventory from "./components/Inventory";
import Statistics from "./components/Statistics";
import Layout from "./components/Layout";
import ProductList from "./components/ProductList";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import SignIn from "./components/SignIn";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products">
            <Route index element={<ProductList />} />
            <Route path="create" element={<CreateProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>
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
