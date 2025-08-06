import React, { useEffect, useState } from "react";
import { GetDetailUser, UpdateDetailUser } from "../API/user/userApi";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiPhone, FiShield, FiSave } from "react-icons/fi";

const Profile = () => {
  const [users, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
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
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            role: data.role,
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
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id;
      if (!userId) return;

      const updatedData = {
        id: userId,
        ...users,
      };

      const res = await UpdateDetailUser(updatedData);
      if (res.errCode === 0) {
        toast.success("Cập nhật thành công!");
      } else {
        toast.error("Cập nhật thất bại!");
      }
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Lỗi khi cập nhật!");
    }
  };

  const InputField = ({ label, value, onChange, icon, disabled = false }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500">
          {icon}
        </span>
        <input
          type="text"
          className={`w-full pl-10 pr-4 py-2 border border-emerald-400 rounded-md text-gray-900 bg-white focus:outline-emerald-600 ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center bg-gray-100 pt-8 px-4 pb-16">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-emerald-600 mb-8">
          Thông Tin Cá Nhân
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Email"
            value={users.email}
            onChange={(e) => setUser({ ...users, email: e.target.value })}
            icon={<FiMail size={18} />}
            disabled
          />
          <InputField
            label="First Name"
            value={users.firstName}
            onChange={(e) => setUser({ ...users, firstName: e.target.value })}
            icon={<FiUser size={18} />}
          />
          <InputField
            label="Last Name"
            value={users.lastName}
            onChange={(e) => setUser({ ...users, lastName: e.target.value })}
            icon={<FiUser size={18} />}
          />
          <InputField
            label="Số điện thoại"
            value={users.phoneNumber}
            onChange={(e) => setUser({ ...users, phoneNumber: e.target.value })}
            icon={<FiPhone size={18} />}
          />
          <InputField
            label="Vai trò"
            value={users.role}
            onChange={(e) => setUser({ ...users, role: e.target.value })}
            icon={<FiShield size={18} />}
          />

          <div className="text-center pt-4">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md font-medium transition"
            >
              <FiSave className="mr-2" />
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
