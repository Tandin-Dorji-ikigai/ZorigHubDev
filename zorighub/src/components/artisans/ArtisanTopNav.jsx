import React from "react";
import { Link } from "react-router-dom";
import userPhoto from "../../assets/images/people/tshering.jpg";
const TopNav = () => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex items-center justify-between">
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        id="mobile-menu-button"
                        className="text-gray-500 hover:text-red-600 focus:outline-none"
                    >
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                </div>

                {/* User Profile */}
                <div className="flex-1 md:text-right">
                    <div className="flex items-center justify-end space-x-4">
                        <div className="hidden md:block">
                            <Link
                                to="/artisan/profile"
                                className="flex items-center space-x-2 border-l border-gray-200 pl-4 cursor-pointer"
                            >
                                <img
                                    src={userPhoto}
                                    alt="Profile"
                                    className="w-8 h-8 object-cover rounded-full"
                                />
                                <span className="text-sm text-gray-800" id="artisan-user-name">
                                    Choden Lhamo
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopNav;
