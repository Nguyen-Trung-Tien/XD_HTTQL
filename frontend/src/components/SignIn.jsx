import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInUser } from "../API/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slice/userSlice";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const access_token = useSelector((state) => state.user.access_token);

  if (access_token) {
    return <Navigate to="/" replace />;
  }
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
        setError();
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Lỗi hệ thống. Vui lòng thử lại!"
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
                  Tên đăng nhập
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-[#00BFFF]"
                    placeholder="Nhập email"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Mật khẩu
                </label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-[#00BFFF]"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-[#00BFFF] focus:ring-[#00BFFF] border-slate-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-slate-700"
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="text-[#00BFFF] hover:underline font-semibold"
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
                  className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white"
                  style={{ backgroundColor: "#00BFFF" }}
                >
                  Đăng nhập
                </button>
              </div>
              <p className="text-slate-900 text-sm !mt-6 text-center">
                Bạn chưa có tài khoản?
                <a
                  onClick={handleSignUp}
                  href="#"
                  className="text-[#00BFFF] hover:underline ml-1 whitespace-nowrap font-semibold cursor-pointer"
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
