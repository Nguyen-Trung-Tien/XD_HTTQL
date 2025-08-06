import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SignUpUser } from "../API/user/userApi";
import { FiMail, FiLock } from "react-icons/fi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const access_token = useSelector((state) => state.user.access_token);

  if (access_token) {
    return <Navigate to="/" replace />;
  }

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      return setError("Vui lòng nhập đầy đủ thông tin!");
    }
    if (password !== confirmPassword) {
      return setError("Mật khẩu xác nhận không khớp!");
    }

    try {
      const dataToSend = { email, password, confirmPassword };
      const data = await SignUpUser(dataToSend);
      if (data?.errCode === 0) {
        toast.success("Tạo tài khoản thành công!");
        navigate("/sign-in");
      } else {
        setError(data.message || "Đăng ký thất bại");
        toast.error(data.message || "Đăng ký thất bại");
      }
    } catch (err) {
      toast.error("Lỗi hệ thống. Vui lòng thử lại!");
      setError(err.response?.data?.message || "Đăng ký thất bại.");
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-100 to-blue-200 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-sky-700">Đăng Ký</h2>
        <h3 className="text-1xl font-bold text-center text-sky-700 pt-2">
          Hệ Thống Quản lý Kho
        </h3>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FiMail size={18} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-sky-500"
                placeholder="Nhập email của bạn"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FiLock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-sky-500"
                placeholder="Nhập mật khẩu"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <FiLock size={18} />
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-sky-500"
                placeholder="Nhập lại mật khẩu"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </span>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSignUp}
            className="w-full py-3 text-white bg-sky-500 hover:bg-sky-600 rounded-lg text-sm font-medium transition duration-200"
          >
            Đăng ký
          </button>

          {/* Sign in Redirect */}
          <p className="text-sm text-center text-gray-700 mt-4">
            Bạn đã có tài khoản?{" "}
            <span
              onClick={() => navigate("/sign-in")}
              className="text-sky-600 font-medium hover:underline cursor-pointer"
            >
              Đăng nhập
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
