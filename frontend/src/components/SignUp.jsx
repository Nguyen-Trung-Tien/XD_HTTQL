import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpUser } from "../API/user/userApi";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      return setError("Vui lòng nhập đầy đủ thông tin!");
    }
    if (password !== confirmPassword) {
      return setError("Mật khẩu không khớp!");
    }

    try {
      const dataToSend = {
        email,
        password,
        confirmPassword,
      };

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
      setError(
        err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
      );
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">
              Đăng Ký Tài Khoản
            </h1>
            <form
              className="mt-12 space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  User name
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                    placeholder="Enter user email"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                    placeholder="Enter confirm password"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <div className="!mt-12">
                <button
                  type="button"
                  onClick={handleSignUp}
                  className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                >
                  Đăng ký
                </button>
              </div>
              <p className="text-slate-900 text-sm !mt-6 text-center">
                Bạn đã có tài khoản?
                <a
                  onClick={() => navigate("/sign-in")}
                  href="#"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Đăng nhập
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
