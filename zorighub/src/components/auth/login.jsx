import React from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import ndiLogo from "@/assets/images/ndi/transparent-ndi.png";

/**
 * ZorigHub Login / Signup
 * - Tailwind-only (no external CSS needed)
 * - Uses ZorigHub red accents
 * - Accessible, responsive, and production-friendly markup
 */
export default function Login() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, #ef4444 1px, transparent 1.5px)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white/90 backdrop-blur rounded-3xl shadow-xl p-8 border border-gray-100">
                    {/* Brand header */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-16 w-16 rounded-full bg-red-600 flex items-center justify-center shadow">
                            {/* If you prefer the logo image, swap the icon with <img /> below */}
                            {/* <img src={logo} alt="ZorigHub" className="h-10 w-10 object-contain" /> */}
                            <i className="fa-solid fa-mountain text-white text-2xl" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-center text-gray-900">
                        Welcome to ZorigHub
                    </h1>
                    <p className="text-center text-gray-500 mt-1 mb-8">
                        Traditional meets digital
                    </p>

                    <a
                        href="/ndi"
                        className="w-full inline-flex items-center justify-center gap-3 rounded-full px-4 py-3 font-medium text-white transition-colors shadow focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{
                            backgroundColor: "#0e4749",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0c3d3e")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0e4749")}
                    >
                        <img
                            src={ndiLogo}
                            alt="Bhutan NDI"
                            className="h-6 w-6 object-contain"
                        />
                        Login with Bhutan NDI
                    </a>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-2 bg-white text-gray-500 text-sm">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Google Login */}
                    <a
                        href="/api/auth"
                        className="w-full inline-flex items-center justify-center gap-3 rounded-full px-4 py-3 border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        <i className="fab fa-google text-red-500" />
                        Continue with Google
                    </a>

                    {/* Back to home / brand footer */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-sm">
                        <img
                            src={logo}
                            alt="ZorigHub"
                            className="h-5 w-5 object-contain"
                        />
                        <Link
                            to="/"
                            className="text-red-600 hover:text-red-700 font-medium"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
