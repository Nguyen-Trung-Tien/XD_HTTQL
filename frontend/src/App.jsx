import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/slice/userSlice";
import SignUp from "./components/SignUp";
import RequireAuth from "./auth/RequireAuth";
import Profile from "./components/Profile";
import ImportReceiptsManager from "./components/ImportReceiptsManager";
import Suppliers from "./components/Suppliers";
import ImportDetails from "./components/ImportDetails";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(login(JSON.parse(storedUser)));
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ImportReceipts" element={<ImportReceiptsManager />} />
        <Route path="/Suppliers" element={<Suppliers />} />
        <Route path="/ImportDetails" element={<ImportDetails />} />

        <Route element={<RequireAuth />}>
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
