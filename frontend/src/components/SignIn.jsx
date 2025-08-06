import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignInUser } from "../API/user/userApi";
import { login } from "../redux/slice/userSlice";
import { toast } from "react-toastify";
import { FiMail, FiLock } from "react-icons/fi";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const access_token = useSelector((state) => state.user.access_token);
  if (access_token) return <Navigate to="/" replace />;

  const handleSignin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      toast.error("Vui lòng nhập tài khoản và mật khẩu");
      return;
    }

    try {
      const data = await SignInUser(email, password);
      if (data?.errCode === 0) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...data.user,
            access_token: data.access_token,
          })
        );

        dispatch(
          login({
            ...data.user,
            access_token: data.access_token,
          })
        );

        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        toast.error(data.message || "Email hoặc mật khẩu không đúng");
        setError(data.message || "Email hoặc mật khẩu không đúng");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Lỗi hệ thống. Vui lòng thử lại!"
      );
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-sky-200 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-sky-700">
          Đăng Nhập
        </h1>
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
                placeholder="Nhập email"
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

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-700">
              <input
                type="checkbox"
                className="h-4 w-4 text-sky-500 border-gray-300 rounded"
              />
              <span className="ml-2">Ghi nhớ đăng nhập</span>
            </label>
            <a
              href="#"
              className="text-sm text-sky-600 hover:underline font-semibold"
            >
              Quên mật khẩu?
            </a>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="button"
            onClick={handleSignin}
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition"
          >
            Đăng nhập
          </button>

          <p className="text-sm text-center text-gray-700 mt-4">
            Bạn chưa có tài khoản?{" "}
            <span
              onClick={() => navigate("/sign-up")}
              className="text-sky-600 font-medium hover:underline cursor-pointer"
            >
              Tạo tài khoản
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
