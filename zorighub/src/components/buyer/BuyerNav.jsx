import React from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from "../../assets/images/people/tshering.jpg";
import Logo from "../../assets/logo.png";

function BuyerNav() {
    const linkBase =
        "px-3 py-2 text-sm font-medium transition-colors duration-200";
    const linkActive =
        "text-red-600 border-b-2 border-red-600";
    const linkInactive =
        "text-gray-700 hover:text-red-600";

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <img src={Logo} className="w-28 h-14 object-cover" alt="logo" />
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <NavLink
                            to="/buyer"
                            end
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? linkActive : linkInactive}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/buyer/BuyerMarketPlace"
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? linkActive : linkInactive}`
                            }
                        >
                            Marketplace
                        </NavLink>
                        <NavLink
                            to="/buyer/BuyerAbout"
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? linkActive : linkInactive}`
                            }
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/buyer/orders"
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? linkActive : linkInactive}`
                            }
                        >
                            Orders
                        </NavLink>
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center space-x-5">
                        <div className="relative">
                            <NavLink
                                to="/buyer/cart"
                                className="text-gray-700 hover:text-red-600 relative inline-block"
                            >
                                <i className="fas fa-shopping-cart text-xl"></i>
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                                    2
                                </span>
                            </NavLink>
                        </div>

                        <div className="relative ml-4">
                            <div className="flex items-center space-x-2 cursor-pointer">
                                <img
                                    src={userPhoto}
                                    alt="User"
                                    className="w-8 h-8 object-cover rounded-full border-2 border-red-600"
                                />
                                <span className="text-sm font-medium text-gray-700 hidden md:inline" id="welcome-nav"></span>
                            </div>
                            {/* Dropdown (show/hide via state if needed) */}
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 hidden">
                                <NavLink
                                    to="/buyer/buyerProfile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </NavLink>
                                <button
                                    id="logoutBtn"
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 focus:outline-none"
                        >
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default BuyerNav;
