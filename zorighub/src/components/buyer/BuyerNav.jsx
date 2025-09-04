// src/components/buyer/BuyerNav.jsx
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png";

// ✅ use shared helpers so all components agree on shapes/URLs
import { getMe } from "@/lib/apiMe";
import { getCart } from "@/lib/cartApi";

function BuyerNav() {
    const linkBase = "px-3 py-2 text-sm font-medium transition-colors duration-200";
    const linkActive = "text-red-600 border-b-2 border-red-600";
    const linkInactive = "text-gray-700 hover:text-red-600";

    const [me, setMe] = useState(null);
    const [loadingMe, setLoadingMe] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0); // 👈 dynamic cart badge

    const menuRef = useRef(null);
    const navigate = useNavigate();

    // --- load user
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setLoadingMe(true);
                const res = await getMe();              // may be { user: {...} } based on your backend
                const u = res?.user ?? res ?? null;     // normalize
                if (!cancelled) setMe(u);
            } catch {
                if (!cancelled) setMe(null);
            } finally {
                if (!cancelled) setLoadingMe(false);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    // --- load & keep cart count fresh
    useEffect(() => {
        if (!me) return;
        let cancelled = false;

        const getUserId = (u) => u?._id || u?.id || u?.userId;

        const refreshCartCount = async () => {
            try {
                const userId = getUserId(me);
                if (!userId) return;
                const cart = await getCart(userId);
                const count = Array.isArray(cart?.items) ? cart.items.reduce((n, it) => n + (Number(it.quantity) || 0), 0) : 0;
                if (!cancelled) setCartCount(count);
            } catch {
                if (!cancelled) setCartCount(0);
            }
        };

        // initial + interval
        refreshCartCount();
        const int = setInterval(refreshCartCount, 30_000);

        // react to global cart mutations (see note below)
        const onCartUpdated = () => refreshCartCount();
        window.addEventListener("cart:updated", onCartUpdated);

        return () => {
            cancelled = true;
            clearInterval(int);
            window.removeEventListener("cart:updated", onCartUpdated);
        };
    }, [me]);

    // Close on outside click / Esc
    useEffect(() => {
        if (!menuOpen) return;
        const onClick = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
        const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
        document.addEventListener('mousedown', onClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onClick);
            document.removeEventListener('keydown', onKey);
        };
    }, [menuOpen]);

    const displayName = me?.name || me?.fullName || me?.email?.split("@")[0] || "Guest";
    const avatar = me?.avatar || "https://static.thenounproject.com/png/4530368-200.png";

    const handleProfileClick = () => {
        setMenuOpen(false);
        navigate('/buyer/buyerProfile');
    };

    const handleLogout = async () => {
        try {
            // optional: call your logout endpoint if you keep it
            // await axios.post(`${API_BASE}/api/logged/logout`, {}, { withCredentials: true });
        } catch (_) { }
        setMenuOpen(false);
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <img src={Logo} className="w-28 h-14 object-cover" alt="logo" />
                    </div>

                    {/* Links */}
                    <div className="hidden md:flex space-x-8">
                        <NavLink to="/buyer" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>Home</NavLink>
                        <NavLink to="/buyer/BuyerMarketPlace" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>Marketplace</NavLink>
                        <NavLink to="/buyer/BuyerAbout" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>About</NavLink>
                        <NavLink to="/buyer/orders" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>Orders</NavLink>
                    </div>

                    {/* Right */}
                    <div className="hidden md:flex items-center space-x-5">
                        {/* Cart */}
                        <div className="relative">
                            <NavLink to="/buyer/cart" className="text-gray-700 hover:text-red-600 relative inline-block">
                                <i className="fas fa-shopping-cart text-xl" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] leading-none">
                                        {cartCount > 9 ? "9+" : cartCount}
                                    </span>
                                )}
                            </NavLink>
                        </div>

                        {/* Profile menu */}
                        <div className="relative ml-4" ref={menuRef}>
                            <button
                                type="button"
                                onClick={() => setMenuOpen((s) => !s)}
                                className="flex items-center gap-2 cursor-pointer select-none"
                                aria-haspopup="menu"
                                aria-expanded={menuOpen}
                            >
                                <img
                                    src={avatar}
                                    alt="User"
                                    className="w-8 h-8 object-cover rounded-full border-2 border-red-600"
                                />
                                <span className="text-sm font-medium text-gray-700 hidden md:inline" id="welcome-nav">
                                    {loadingMe ? "..." : displayName}
                                </span>
                                <i className="fas fa-chevron-down text-gray-500 text-xs ml-1" />
                            </button>

                            {menuOpen && (
                                <div
                                    role="menu"
                                    className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1"
                                >
                                    <button
                                        role="menuitem"
                                        onClick={handleProfileClick}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        role="menuitem"
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden flex items-center">
                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 focus:outline-none">
                            <i className="fas fa-bars text-xl" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default BuyerNav;
