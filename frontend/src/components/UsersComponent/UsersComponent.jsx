import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  DeleteUser,
  GetDetailUser,
  SignUpUser,
  UpdateDetailUser,
} from "../../API/user/userApi";
import { bufferToBase64 } from "../../utils/arrayBufferToString";

export default function UsersComponent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    gender: "Nam",
    status: "Hoạt động",
    address: "",
    phoneNumber: "",
    avatarBase64: "",
  });

  const loadUsers = () => {
    setLoading(true);
    GetDetailUser("All")
      .then((res) => {
        if (res.errCode === 0) {
          const usersWithAvatar = (res.users || []).map((u) => {
            let avatarBase64 = "";
            if (u.image?.data?.length > 0) {
              avatarBase64 =
                "data:image/jpeg;base64," + bufferToBase64(u.image.data);
            }
            return { ...u, avatarBase64 };
          });
          setUsers(usersWithAvatar);
        } else {
          toast.error(res.errMessage || "Lỗi tải dữ liệu!");
        }
      })
      .catch(() => toast.error("Lỗi tải dữ liệu!"))
      .finally(() => setLoading(false));
  };

  useEffect(() => loadUsers(), []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditId(null);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "user",
      gender: "Nam",
      status: "Hoạt động",
      address: "",
      image: "",
      phoneNumber: "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = isEditing ? { ...form, id: editId } : form;
    const action = isEditing
      ? UpdateDetailUser(userData)
      : SignUpUser(userData);

    action
      .then((res) => {
        if (res.errCode === 0) {
          toast.success(
            isEditing ? "Cập nhật thành công!" : "Thêm mới thành công!"
          );
          loadUsers();
          closeModal();
        } else {
          toast.error(res.errMessage || "Đã có lỗi xảy ra!");
        }
      })
      .catch(() => toast.error("Đã có lỗi xảy ra!"));
  };

  const handleEdit = (user) => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      role: user.role,
      gender: user.gender,
      status: user.status,
      address: user.address,
      phoneNumber: user.phoneNumber,
    });
    setEditId(user.id);
    setIsEditing(true);
    openModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      DeleteUser(id)
        .then(() => {
          toast.success("Xóa người dùng thành công!");
          loadUsers();
        })
        .catch(() => toast.error("Xóa thất bại!"));
    }
  };

  if (loading)
    return <div className="text-center py-6">Đang tải dữ liệu...</div>;

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Quản lý nhân viên
        </h1>

        <button
          onClick={openModal}
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] 
               hover:scale-105 hover:shadow-lg transition-transform duration-200"
        >
          <FiPlus className="w-5 h-5" /> Thêm mới
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3  text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Họ
              </th>
              <th className="px-6 py-3  text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên
              </th>
              <th className="px-6 py-3  text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3  text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vai trò
              </th>
              <th className="px-6 py-3  text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Giới tính
              </th>
              <th className="px-6 py-3  text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3  text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                  {u.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                  {u.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                  {u.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                  {u.email}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs 
                   ${u.role === "admin" ? "bg-red-500" : "bg-blue-500"}`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center">
                  {u.gender}
                </td>
                <td className="px-6 py-4 text-sm text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs 
                   ${
                     u.status === "Hoạt động" ? "bg-green-500" : "bg-gray-400"
                   }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => handleEdit(u)}
                      className="p-1 text-primary hover:text-blue-500 transition-colors rounded"
                      title="Chỉnh người dùng"
                    >
                      <FiEdit className="w-5 h-5" />
                    </button>
                    {u.role !== "admin" && (
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        title="Xóa người dùng"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-10 z-50 overflow-auto">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-center">
              {isEditing ? "Cập nhật người dùng" : "Thêm người dùng"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex gap-3">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Họ"
                  value={form.firstName || ""}
                  onChange={handleChange}
                  required
                  className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Tên"
                  value={form.lastName || ""}
                  onChange={handleChange}
                  required
                  className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition"
                />
              </div>

              {!isEditing && (
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email || ""}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition"
                />
              )}

              <input
                type="password"
                name="password"
                placeholder={
                  isEditing ? "Để trống nếu không đổi mật khẩu" : "Mật khẩu"
                }
                value={form.password || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition"
                required={!isEditing}
              />

              <div className="flex gap-3">
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  value={form.address || ""}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition"
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Số điện thoại"
                  value={form.phoneNumber || ""}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition"
                />
              </div>

              <div className="flex gap-3">
                <select
                  name="role"
                  value={form.role || ""}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition appearance-none bg-white"
                >
                  <option value="admin">Quản lý</option>
                  <option value="Kế toán">Kế toán</option>
                  <option value="Nhân viên">Nhân viên</option>
                </select>

                <select
                  name="gender"
                  value={form.gender || ""}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition appearance-none bg-white"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>

                <select
                  name="status"
                  value={form.status || ""}
                  onChange={handleChange}
                  className="flex-1 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition appearance-none bg-white"
                >
                  <option value="Hoạt động">Hoạt động</option>
                  <option value="Không hoạt động">Không hoạt động</option>
                  <option value="Bị khóa">Bị khóa</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:scale-105 transition-transform duration-200"
                >
                  {isEditing ? "Cập nhật" : "Thêm mới"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 shadow"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
