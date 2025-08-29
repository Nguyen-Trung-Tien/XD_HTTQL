import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
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
        if (data.user.status === "Bị khóa") {
          toast.error(
            "Tài khoản bị khóa. Vui lòng liên hệ quản lý để được hỗ trợ!"
          );
          setError(
            "Tài khoản bị khóa. Vui lòng liên hệ quản lý để được hỗ trợ!"
          );
          return;
        }

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
    <div className="bg-gradient-to-br from-blue-100 via-sky-200 to-blue-200 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center text-sky-700">
          Đăng Nhập
        </h1>
        <h3 className="text-base font-medium text-center text-gray-600 mt-2">
          Hệ Thống Quản lý Kho
        </h3>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignin();
          }}
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
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
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition shadow-sm hover:shadow-md"
                placeholder="Nhập email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
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
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition shadow-sm hover:shadow-md"
                placeholder="Nhập mật khẩu"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-sky-600 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </span>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 text-white bg-sky-500 hover:bg-sky-600 rounded-xl text-sm font-semibold shadow-md transition duration-200"
          >
            Đăng nhập
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/sign-up"
            className="text-sky-600 font-medium hover:underline cursor-pointer"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
