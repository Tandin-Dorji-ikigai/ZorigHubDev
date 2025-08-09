import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import userPhoto from "../../assets/images/people/pema.jpg";

const AdminSideNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const navItems = [
    { path: "/admin/dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
    { path: "/admin/adminuser", icon: "fas fa-users", label: "Users" },
    { path: "/admin/adminorders", icon: "fas fa-shopping-basket", label: "Orders" },
    { path: "/admin/adminanalytics", icon: "fas fa-chart-pie", label: "Analytics" },
    { path: "/admin/adminloan", icon: "fas fa-hand-holding-usd", label: "Loan" },
    { path: "/admin/adminsettings", icon: "fas fa-cog", label: "Settings" },
  ];

  const handleLogout = () => {
    // Add logout logic
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 h-screen fixed top-0 left-0 z-10">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <img src={Logo} className="w-28 h-14 object-cover" alt="logo" />
      </div>

      <div className="overflow-y-auto flex-grow sidebar px-4 py-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-4 px-4 py-3 bg-rose-100 rounded-lg mb-6">
            <img
              src={userPhoto}
              alt="Profile"
              className="w-12 h-12 object-cover rounded-full border-2 border-red-600"
            />
            <div>
              <p className="text-sm text-gray-600">Welcome back</p>
              <p className="font-medium">Admin</p>
            </div>
          </div>

          <nav>
            <ul>
              {navItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <li key={item.path} className="mb-2">
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition ${isActive
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

        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between hover:bg-gray-50 rounded-lg cursor-pointer transition">
          <div className="flex items-center space-x-3" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt text-gray-500 text-lg"></i>
            <span className="text-gray-700 font-medium">Logout</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSideNav;