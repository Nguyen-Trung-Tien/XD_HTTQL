import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slice/userSlice"; // import action logout

function Header() {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const userMenuRef = React.useRef(null);
  const navigate = useNavigate();

  // Lấy currentUser từ Redux store
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user"); // Xoá user trong localStorage nếu có
    navigate("/sign-in"); // Chuyển về trang đăng nhập
  };

  return (
    <header className="bg-card">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center justify-center h-16 px-4"
            onClick={() => navigate("/")}
          >
            <h2 className="text-xl font-bold gradient-text cursor-pointer">
              Hệ Thống Kho
            </h2>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex md:mx-4 max-w-xl w-full">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-textSecondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            {currentUser && (
              <div className="relative ml-3" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primaryLight flex items-center justify-center text-white font-medium">
                    {currentUser?.initials || "U"}
                  </div>
                  <span className="ml-2 hidden md:block">
                    {currentUser.email}
                  </span>
                  <svg
                    className="w-4 h-4 ml-1 text-textSecondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-card bg-card ring-1 ring-black ring-opacity-5 py-1 z-50">
                    <a
                      href="#profile"
                      className="block px-4 py-2 text-sm text-textPrimary hover:bg-primaryLight/10"
                    >
                      Hồ sơ
                    </a>
                    <a
                      href="#settings"
                      className="block px-4 py-2 text-sm text-textPrimary hover:bg-primaryLight/10"
                    >
                      Cài đặt
                    </a>
                    <div className="border-t border-border my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
