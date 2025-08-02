import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInUser } from "../API/user/userApi";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/userSlice";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignin = async () => {
    try {
      const data = await SignInUser(email, password);

      if (data?.errCode === 0) {
        // Lưu vào Redux
        dispatch(login(data.user));

        // Lưu vào localStorage để giữ user khi reload
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        setError(data.message || "Email or password is incorrect");
      }
    } catch (err) {
      toast.error("Lỗi hệ thống. Vui lòng thử lại!");
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };
  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">
              Đăng Nhập Tài Khoản
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

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                </div>
                <div className="text-sm">
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <div className="!mt-12">
                <button
                  type="button"
                  onClick={handleSignin}
                  className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                >
                  Đăng nhập
                </button>
              </div>
              <p className="text-slate-900 text-sm !mt-6 text-center">
                Bạn chưa có tài khoản?
                <a
                  onClick={handleSignUp}
                  href="javascript:void(0);"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Tạo tài khoản.
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
