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

const InputField = ({ label, value, onChange, icon, disabled }) => (
  <div>
    <label className="block text-sm font-medium text-blue-700 mb-1">
      {label}
    </label>
    <div className="flex items-center border border-blue-400 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
      <span className="text-blue-400 mr-2">{icon}</span>
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
          if (data.image && data.image.data && data.image.data.length > 0) {
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

  useEffect(() => {
    console.log("avatarPreview updated:", avatarPreview);
  }, [avatarPreview]);

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
          if (data.image && data.image.data && data.image.data.length > 0) {
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
    <div className="flex justify-center items-center bg-blue-50 pt-8 px-4 pb-16 min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 border border-blue-300">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Thông Tin Cá Nhân
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Ảnh đại diện
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-400 bg-blue-100">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="avatar"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-blue-300">
                    <FiUser size={40} />
                  </div>
                )}
              </div>
              <label
                htmlFor="avatarInput"
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
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
            label="Địa chỉ"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            icon={<FiHome size={18} />}
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
              className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition"
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
