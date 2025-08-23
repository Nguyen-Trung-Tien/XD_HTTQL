import React, { useEffect, useState } from "react";
import { GetDetailUser, UpdateDetailUser } from "../API/user/userApi";
import { toast } from "react-toastify";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiSave,
  FiUpload,
  FiHome,
} from "react-icons/fi";
import { arrayBufferToString } from "../utils/arrayBufferToString";

const InputField = ({ label, value, onChange, icon, disabled, onEnter }) => (
  <div>
    <label className="block text-sm font-medium bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] bg-clip-text text-transparent mb-1">
      {label}
    </label>
    <div className="flex items-center border border-blue-400 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#00BFFF]">
      <span className="text-[#00BFFF] mr-2">{icon}</span>
      <input
        type="text"
        className="flex-1 outline-none"
        value={value}
        onChange={onChange}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) {
            onEnter();
          }
        }}
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
    address: "",
    role: "",
    avatarBase64: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.id;
        if (!userId) return;

        const res = await GetDetailUser(userId);
        if (res.errCode === 0 && res.users.length > 0) {
          const data = res.users[0];
          let avatarBase64 = "";
          if (data.image?.data?.length > 0) {
            avatarBase64 = arrayBufferToString(data.image.data);
          }
          setUser({
            email: data.email || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phoneNumber: data.phoneNumber || "",
            address: data.address || "",
            role: data.role || "",
            avatarBase64,
          });
          setAvatarPreview(avatarBase64 || null);
        } else {
          toast.error(res.message || "Lấy thông tin người dùng thất bại!");
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
        const refreshed = await GetDetailUser(userId);
        if (refreshed.errCode === 0 && refreshed.users.length > 0) {
          const data = refreshed.users[0];
          let avatarBase64 = "";
          if (data.image?.data?.length > 0) {
            avatarBase64 = arrayBufferToString(data.image.data);
          }
          setUser({
            email: data.email || "",
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phoneNumber: data.phoneNumber || "",
            address: data.address || "",
            role: data.role || "",
            avatarBase64,
          });
          setAvatarPreview(avatarBase64 || null);
        }
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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh hợp lệ!");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setUser((prev) => ({ ...prev, avatarBase64: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center items-center bg-blue-50 pt-6 px-2 pb-10 min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
        {/* Tiêu đề */}
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-800">
          Thông Tin Cá Nhân
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ảnh đại diện */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Ảnh đại diện
            </label>
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#00BFFF] bg-blue-100 shadow">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#00BFFF]">
                    <FiUser size={40} />
                  </div>
                )}
              </div>
              <label
                htmlFor="avatarInput"
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] text-white rounded-lg hover:opacity-90 transition"
              >
                <FiUpload className="mr-2" />
                Chọn ảnh
              </label>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          {/* Các input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              icon={<FiMail size={16} />}
              disabled
            />
            <InputField
              label="Số điện thoại"
              value={user.phoneNumber}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
              onEnter={handleSubmit}
              icon={<FiPhone size={16} />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              icon={<FiUser size={16} />}
              onEnter={handleSubmit}
            />
            <InputField
              label="Last Name"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              icon={<FiUser size={16} />}
              onEnter={handleSubmit}
            />
          </div>

          <InputField
            label="Địa chỉ"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            icon={<FiHome size={16} />}
            onEnter={handleSubmit}
          />
          <InputField
            label="Vai trò"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            icon={<FiShield size={16} />}
            onEnter={handleSubmit}
          />

          {/* Nút lưu */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#00BFFF] to-[#87CEFA] hover:from-[#009acd] hover:to-[#6cb6ff] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition disabled:opacity-50"
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
