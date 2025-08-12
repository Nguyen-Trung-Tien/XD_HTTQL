import React, { useEffect, useState } from "react";
import {
  fetchAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../API/customer/customerApi";
import { toast } from "react-toastify";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetchAllCustomers();
      if (res && res.data && res.data.errCode === 0) {
        setCustomers(res.data.customers || []);
        setError(null);
      } else {
        setError(res?.data?.errMessage || "Failed to load customers");
      }
    } catch (e) {
      setError("Error fetching customers: " + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let res;
      if (isEditing) {
        res = await updateCustomer(form);
      } else {
        res = await createCustomer(form);
      }

      if (res && res.data && res.data.errCode === 0) {
        await fetchCustomers();
        setForm({
          id: null,
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
        });
        toast.success("Cập nhật thành công!");
        setIsEditing(false);
      } else {
        toast.error("Cập nhật thất bại!");
        setError(res?.data?.errMessage || "Unknown error");
      }
    } catch (e) {
      setError("Error saving customer: " + e.message);
    }
  };

  const handleEdit = (customer) => {
    setForm(customer);
    setIsEditing(true);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    try {
      const res = await deleteCustomer(id);
      if (res && res.data && res.data.errCode === 0) {
        toast.success("Xóa thành công!");
        await fetchCustomers();
      } else {
        setError(res?.data?.errMessage || "Unknown error");
        toast.error("Xóa thất bại!");
      }
    } catch (e) {
      setError("Error deleting customer: " + e.message);
      toast.error("Xóa thất bại!");
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-md shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] bg-clip-text text-transparent">
        Customer Management
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="md:col-span-2 flex justify-end gap-4">
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setForm({
                  id: null,
                  name: "",
                  email: "",
                  phoneNumber: "",
                  address: "",
                });
                setIsEditing(false);
                setError(null);
              }}
              className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 rounded bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:from-[#009acd] hover:to-[#6cb6ff] text-white font-semibold shadow-md transition-all duration-200"
          >
            {isEditing ? "Update Customer" : "Add Customer"}
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Loading customers...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 rounded">
          <thead
            style={{
              background: "linear-gradient(to right, #00BFFF, #87CEFA)",
              color: "white",
            }}
          >
            <tr>
              <th className="border border-gray-300 p-3 text-left">Name</th>
              <th className="border border-gray-300 p-3 text-left">Email</th>
              <th className="border border-gray-300 p-3 text-left">Phone</th>
              <th className="border border-gray-300 p-3 text-left">Address</th>
              <th className="border border-gray-300 p-3 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{c.name}</td>
                  <td className="border border-gray-300 p-3">{c.email}</td>
                  <td className="border border-gray-300 p-3">
                    {c.phoneNumber || "-"}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {c.address || "-"}
                  </td>
                  <td className="border border-gray-300 p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-indigo-600 hover:text-indigo-900 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-600 hover:text-red-900 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Customer;
