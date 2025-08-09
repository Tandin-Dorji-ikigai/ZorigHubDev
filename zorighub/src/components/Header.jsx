import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Header = () => {
  const { user, isAuthenticated, login, logout, loading } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const navigateToDashboard = () => {
    if (user) {
      window.location.href = '/buyer/dashboard';
    }
  };

  if (loading) {
    return (
      <header className="bg-white shadow-sm fixed w-full z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} className="w-28 h-14 object-cover" alt="logo image" />
          </div>
          <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/">
            <img src={logo} className="w-28 h-14 object-cover" alt="logo image" />
          </a>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#artisans" className="hover:text-red-600 transition-colors">Artisans</a>
          <a href="#unique" className="hover:text-red-600 transition-colors">Our Model</a>
          <a href="#shop" className="hover:text-red-600 transition-colors">Shop</a>
          <a href="#impact" className="hover:text-red-600 transition-colors">Impact</a>
          <a href="#stories" className="hover:text-red-600 transition-colors">Stories</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <div className="hidden md:flex space-x-4">
              <button 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors text-white rounded-full"
                onClick={handleLogin}
              >
                Login with Google
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={navigateToDashboard}
                className="hidden md:flex text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Dashboard
              </button>
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold uppercase shadow">
                  {user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.fullName || user?.email || 'User'}
                </span>
              </div>
              <button 
                className="hidden md:flex bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
          
          {/* Admin Link */}
          <a
            href="/admin/login"
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

