// Sidebar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import userPhotoFallback from "../../assets/images/people/pema.jpg";
import { getCurrentUser,devLogout } from "../auth/devAuth";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const user = getCurrentUser();
  const displayName = user?.fullName || "Guest User";
  const avatar = user?.photo || userPhotoFallback;

  const navItems = [
    { path: "/artisan", icon: "fas fa-home", label: "Dashboard" },
    { path: "/artisan/products", icon: "fas fa-tshirt", label: "My Products" },
    { path: "/artisan/orders", icon: "fas fa-shopping-bag", label: "Orders" },
    { path: "/artisan/earnings", icon: "fas fa-coins", label: "Earnings" },
    { path: "/artisan/profile", icon: "fas fa-user", label: "Profile" },
  ];

  const handleLogout = () => {
    // Clear dev creds (and later, your real session too)
    devLogout();
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0 z-10">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <img src={Logo} className="w-28 h-14 object-cover" alt="logo" />
      </div>

      {/* Sidebar Content */}
      <div className="overflow-y-auto flex-grow sidebar px-4 py-6 flex flex-col justify-between">
        {/* Profile */}
        <div>
          <div className="flex items-center space-x-4 px-4 py-3 bg-rose-100 rounded-lg mb-6">
            <img
              src={avatar}
              alt="Profile"
              className="w-12 h-12 object-cover rounded-full border-2 border-red-600"
            />
            <div>
              <p className="text-sm text-gray-600">Welcome back</p>
              <p className="font-medium">{displayName}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav>
            <ul>
              {navItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <li key={item.path} className="mb-2">
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition ${
                        isActive
                          ? "bg-rose-100 text-red-600"
                          : "text-gray-600 hover:bg-rose-100 hover:text-red-600"
                      }`}
                    >
                      <i className={`${item.icon} mr-3`}></i>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-3 border-t border-gray-100 flex items-center justify-between hover:bg-gray-50 rounded-lg cursor-pointer transition text-left"
        >
          <div className="flex items-center space-x-3">
            <i className="fas fa-sign-out-alt text-gray-500 text-lg"></i>
            <span className="text-gray-700 font-medium">Logout</span>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
