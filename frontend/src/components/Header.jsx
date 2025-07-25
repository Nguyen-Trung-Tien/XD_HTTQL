import React from "react";

function Header({ setMobileMenuOpen, mobileMenuOpen }) {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const userMenuRef = React.useRef(null);

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

  return (
    <header className="bg-card  ">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-textPrimary hover:text-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Logo for mobile */}
          <div className="md:hidden font-bold text-lg gradient-text">
            HTQLKH
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex md:flex-1 md:mx-4">
            <div className="relative w-full max-w-md">
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
            <div className="relative ml-3" ref={userMenuRef}>
              <div>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primaryLight flex items-center justify-center text-white font-medium">
                    NT
                  </div>
                  <span className="ml-2 hidden md:block">Trịnh Thịnh</span>
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
              </div>
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
                  <a
                    href="#logout"
                    className="block px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Đăng xuất
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
