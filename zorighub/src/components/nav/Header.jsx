import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const Header = () => {
  // Make sure your AuthContext provides these. If not, adapt the names here.
  const { logout, loading, user, isAuthenticated, login } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    try {
      logout?.();
    } finally {
      window.location.href = '/';
    }
  };


  const getInitials = () => {
    const full =
      user?.fullName ||
      user?.name ||
      user?.email?.split('@')?.[0] ||
      'User';
    const parts = full.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Close menu on outside click or when pressing Escape
  useEffect(() => {
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    if (menuOpen) {
      document.addEventListener('mousedown', onClick);
      document.addEventListener('keydown', onKey);
    }
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  if (loading) {
    return (
      <header className="bg-white/90 backdrop-blur shadow-sm fixed inset-x-0 top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <img src={logo} className="w-28 h-14 object-cover" alt="ZorigHub logo" />
          <div className="h-9 w-28 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white backdrop-blur shadow-sm fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-3">
          <img src={logo} className="w-28 h-14 object-cover" alt="ZorigHub logo" />
        </a>

        {/* Center: Minimal nav (optional, hidden on mobile for cleanliness) */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
          <a href="#artisans" className="hover:text-red-600 transition-colors">Artisans</a>
          <a href="#unique" className="hover:text-red-600 transition-colors">Our Model</a>
          <a href="#shop" className="hover:text-red-600 transition-colors">Shop</a>
          <a href="#impact" className="hover:text-red-600 transition-colors">Impact</a>
          <a href="#stories" className="hover:text-red-600 transition-colors">Stories</a>
        </nav>

        {/* Right: Auth / Profile */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <button
              onClick={() => (window.location.href = "/login")}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Log in / Sign up
            </button>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="group inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-1.5 pr-2 hover:border-gray-300 transition"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-red-600 text-white text-xs font-semibold shadow">
                  {getInitials()}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-gray-700 max-w-[160px] truncate">
                  {user?.fullName || user?.name || user?.email || 'User'}
                </span>
                <svg
                  className={`h-4 w-4 text-gray-500 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.355a.75.75 0 111.02 1.1l-4.22 3.814a.75.75 0 01-1.02 0L5.25 8.33a.75.75 0 01-.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div
                  role="menu"
                  tabIndex={-1}
                  className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden"
                >
                  <a
                    href="/profile"
                    className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    role="menuitem"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
