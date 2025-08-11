import React, { useEffect, useState } from "react";
import { GetDetailUser, UpdateDetailUser } from "../API/user/userApi";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiPhone, FiShield, FiSave } from "react-icons/fi";

const InputField = ({ label, value, onChange, icon, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-emerald-400">
      <span className="text-gray-400 mr-2">{icon}</span>
      <input
        type="text"
        className="flex-1 outline-none"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  </div>
);

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.id;
        if (!userId) return;
        const res = await GetDetailUser(userId);
        if (res.errCode === 0 && res.users.length > 0) {
          const data = res.users[0];
          setUser({
            email: data.email || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phoneNumber: data.phoneNumber || "",
            role: data.role || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;
      if (!userId) return;

      const res = await UpdateDetailUser({ id: userId, ...user });
      if (res.errCode === 0) {
        toast.success("Cập nhật thành công!");
        await GetDetailUser(userId);
      } else {
        toast.error(res.message || "Cập nhật thất bại!");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Lỗi khi cập nhật!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 pt-8 px-4 pb-16">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-emerald-600 mb-8">
          Thông Tin Cá Nhân
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            icon={<FiMail size={18} />}
            disabled
          />
          <InputField
            label="First Name"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            icon={<FiUser size={18} />}
          />
          <InputField
            label="Last Name"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            icon={<FiUser size={18} />}
          />
          <InputField
            label="Số điện thoại"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            icon={<FiPhone size={18} />}
          />
          <InputField
            label="Vai trò"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            icon={<FiShield size={18} />}
          />

          <div className="text-center pt-4">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md font-medium transition"
              disabled={loading}
            >
              <FiSave className="mr-2" />
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
