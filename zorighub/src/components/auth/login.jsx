import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import ndiLogo from "@/assets/images/ndi/transparent-ndi.png";

const GOOGLE_OAUTH_START = "http://localhost:5173/api/auth/google/start";
export default function Login() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f9fafb] relative">
            <div className="mx-auto max-w-5xl px-4 py-10 flex items-center justify-center min-h-screen">
                {/* Card */}
                <div className="w-full bg-white rounded-[28px] shadow-[0_2px_6px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        {/* LEFT side */}
                        <div className="px-10 pt-12 pb-10 flex flex-col justify-center border-r border-[#f1f3f4] min-h-[440px] bg-gradient-to-b from-[#f9fafb] to-white">
                            <div className="flex items-center gap-3">
                                <img src={logo} alt="ZorigHub" className="h-8 w-8 object-contain" />
                                <span className="text-[#0e4749] text-[20px] font-semibold">
                                    ZorigHub
                                </span>
                            </div>

                            <h1 className="mt-8 text-[36px] leading-tight font-bold text-[#1f1f1f]">
                                Sign in
                            </h1>
                            <p className="mt-2 text-[16px] text-[#5f6368]">
                                Continue to your ZorigHub account
                            </p>
                        </div>

                        {/* RIGHT side (buttons) */}
                        <div className="px-10 pt-12 pb-10 flex flex-col justify-center gap-6 min-h-[440px]">
                            {/* NDI button */}
                            <button
                                type="button"
                                onClick={() => {

                                    navigate("/ndi")

                                }}
                                className="w-full inline-flex items-center justify-center gap-3 rounded-[24px] px-4 py-3 border border-transparent bg-[#0e4749] text-white hover:bg-[#0c3d3e] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0e4749]/40"
                            >
                                <img src={ndiLogo} alt="NDI" className="h-5 w-5 object-contain" />
                                <span className="text-[15px] font-medium">
                                    Sign in with Bhutan NDI
                                </span>
                            </button>

                            {/* OR divider */}
                            <div className="relative my-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#e5e7eb]" />
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-2 bg-white text-[#5f6368] text-xs">or</span>
                                </div>
                            </div>

                            {/* Google button */}
                            <button
                                type="button"
                                onClick={() => (window.location.href = GOOGLE_OAUTH_START)}
                                className="w-full inline-flex items-center justify-center gap-3 rounded-[24px] px-4 py-3 border border-[#dadce0] bg-white text-[#1f1f1f] hover:bg-[#f8f9fa] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ef4444]/40"
                            >
                                <GenericGIcon className="h-5 w-5 text-[#ef4444]" />
                                <span className="text-[15px] font-medium">Sign in with Google</span>
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-6 border-t border-[#f1f3f4] px-10 py-4 text-[12px] text-[#5f6368]">
                        <Link to="/help" className="hover:underline">Help</Link>
                        <Link to="/privacy" className="hover:underline">Privacy</Link>
                        <Link to="/terms" className="hover:underline">Terms</Link>
                    </div>
                </div>
            </div>

            {/* Language selector */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[12px] text-[#5f6368]">
                English (Bhutan)
            </div>
        </div>
    );
}

function GenericGIcon({ className = "" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path
                d="M13.8 7.5a4.8 4.8 0 1 0 0 9.6h.2v-2h-.2a2.8 2.8 0 1 1 0-5.6h2.7V7.5h-2.7z"
                fill="currentColor"
            />
        </svg>
    );
}
