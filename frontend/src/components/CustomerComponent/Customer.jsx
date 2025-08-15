import React, { useEffect, useState } from "react";
import {
  fetchAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  deleteManyCustomer,
} from "../../API/customer/customerApi";
import { toast } from "react-toastify";
import FilterBar from "./FilterBar";
import ExportExcel from "./ImportExportCSV";
import CustomerModal from "./CustomerModal";
import CustomerTable from "./CustomerTable";
import Pagination from "./Pagination";
function Customer() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [allCities, setAllCities] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  // Fetch customers
  const fetchCustomers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetchAllCustomers(
        pageNumber,
        limit,
        search,
        statusFilter
      );
      if (res?.data?.errCode === 0) {
        setCustomers(res.data.customers || []);
        setTotalPages(res.data.pagination?.totalPages || 1);
        setPage(res.data.pagination?.page || 1);
        setError(null);
      } else {
        setError(res?.data?.errMessage || "Failed to load customers");
      }
    } catch (e) {
      setError("Error fetching customers: " + e.message);
    }
    setLoading(false);
  };

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetchAllCustomers(1, 1000);
        if (res?.data?.errCode === 0) {
          const cities = [
            ...new Set(res.data.customers.map((c) => c.city).filter(Boolean)),
          ];
          setAllCities(cities);
        }
      } catch (e) {
        console.error("Error fetching cities:", e);
      }
    };
    fetchCities();
  }, []);

  // Auto fetch when page changes
  useEffect(() => {
    fetchCustomers(page);
  }, [page]);

  // Debounce search/filter
  useEffect(() => {
    const delay = setTimeout(() => fetchCustomers(1), 500);
    return () => clearTimeout(delay);
  }, [search, statusFilter]);

  // Modal handlers
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenModal = (customer = null) => {
    if (customer) {
      setForm({ ...customer });
      setIsEditing(true);
    } else {
      setForm({
        id: null,
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        lat: null,
        lng: null,
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        ...form,
        lat: form.lat,
        lng: form.lng,
      };

      if (isEditing) {
        await updateCustomer(data);
        toast.success("Cập nhật khách hàng thành công!");
      } else {
        await createCustomer(data);
        toast.success("Tạo khách hàng thành công!");
      }

      fetchCustomers();
      handleCloseModal();
    } catch (e) {
      toast.error("Lỗi khi lưu khách hàng!", e);
    }
  };

  // Delete handlers
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa khách hàng này?")) return;
    try {
      const res = await deleteCustomer(id);
      if (res?.data?.errCode === 0) {
        toast.success("Xóa thành công!");
        if (customers.length === 1 && page > 1) setPage(page - 1);
        else fetchCustomers(page);
      } else {
        setError(res?.data?.errMessage || "Unknown error");
        toast.error("Xóa thất bại!");
      }
    } catch (e) {
      setError("Error deleting customer: " + e.message);
      toast.error("Xóa thất bại!");
    }
  };

  const handleDeleteMultiple = async () => {
    if (!selectedIds.length) return;
    if (
      !window.confirm(`Bạn có chắc muốn xóa ${selectedIds.length} khách hàng?`)
    )
      return;
    try {
      const res = await deleteManyCustomer(selectedIds);
      if (res?.data?.errCode === 0) {
        toast.success("Xóa thành công!");
        setSelectedIds([]);
        fetchCustomers(1);
      } else {
        toast.error(res?.data?.errMessage || "Xóa thất bại!");
      }
    } catch (e) {
      toast.error("Xóa thất bại: " + e.message);
    }
  };

  // Checkbox handlers
  const toggleSelect = (id) => {
    if (selectedIds.includes(id))
      setSelectedIds(selectedIds.filter((x) => x !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === customers.length) setSelectedIds([]);
    else setSelectedIds(customers.map((c) => c.id));
  };

  return (
    <div className="p-6">
      {/* Header + action buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-textPrimary">
          Quản Lý Khách Hàng
        </h1>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-6 py-2 rounded-lg gradient-bg text-white font-semibold shadow-card hover:opacity-90 transition-all"
          >
            Thêm khách hàng
          </button>
          <ExportExcel customers={customers} />
          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteMultiple}
              className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-all duration-200"
            >
              Xóa {selectedIds.length} khách hàng
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 text-red-700 rounded shadow-sm">
          {error}
        </div>
      )}

      {/* Filters */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        allCities={allCities}
      />

      {/* Modal */}
      {isModalOpen && (
        <CustomerModal
          isEditing={isEditing}
          form={form}
          onChange={handleChange}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}

      {/* Table */}
      <CustomerTable
        customers={customers}
        selectedIds={selectedIds}
        toggleSelect={toggleSelect}
        toggleSelectAll={toggleSelectAll}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
export default Customer;
