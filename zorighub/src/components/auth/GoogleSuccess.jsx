// src/pages/auth/GoogleSuccess.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";

import { useNavigate } from "react-router-dom";

export default function GoogleSuccess() {
    const [status, setStatus] = useState("loading"); // 'loading' | 'ok' | 'error'
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const run = async () => {
            try {
                const res = await axios.get("/api/auth/user", { withCredentials: true });
                console.log(res.data);
                setStatus("ok");
                setMessage("Google OAuth successful");
                setTimeout(() => {
                    navigate("/buyer", { replace: true });
                }, 1500);
            } catch (e) {
                console.error(e);
                setStatus("error");
                setMessage("We couldn't complete sign-in. Please try again.");
            }
        };
        run();
    }, []);

    const retry = async () => {
        setStatus("loading");
        setMessage("");
        try {
            const res = await axios.get("/api/auth/user", { withCredentials: true });
            console.log(res.data);
            setStatus("ok");
            setMessage("Google OAuth successful");
            // TODO: navigate("/dashboard");
        } catch (e) {
            console.error(e);
            setStatus("error");
            setMessage("Still having trouble. Check your connection or try again.");
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#F6F1ED] via-[#fff] to-[#F6F1ED] relative overflow-hidden">
            {/* Subtle Bhutanese-inspired pattern accents */}
            <div className="pointer-events-none absolute -top-24 -left-24 size-[380px] rounded-full bg-[#B71C1C]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-20 size-[420px] rounded-full bg-[#1F2937]/10 blur-3xl" />

            <div className="mx-auto max-w-md px-6 py-10 md:py-16">
                {/* Brand header */}
                <div className="flex items-center gap-3 mb-10">
                    <img src={logo} alt="ZorigHub" className="h-10 w-10 rounded-xl shadow" />
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-[#1F2937]">ZorigHub</h1>
                        <p className="text-xs text-[#6B7280] -mt-0.5">Artisans • Stories • Impact</p>
                    </div>
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] ring-1 ring-black/5 overflow-hidden">
                    {/* Top bar accent */}
                    <div className="h-1.5 bg-gradient-to-r from-[#B71C1C] via-[#E53935] to-[#B71C1C]" />

                    <div className="p-7 md:p-8">
                        {/* Status icon */}
                        <div className="flex items-center justify-center mb-6">
                            {status === "loading" && (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="h-10 w-10 animate-spin text-[#B71C1C]" />
                                </div>
                            )}

                            {status === "ok" && (
                                <div className="flex items-center justify-center">
                                    <CheckCircle2 className="h-10 w-10 text-[#16A34A]" />
                                </div>
                            )}

                            {status === "error" && (
                                <div className="flex items-center justify-center">
                                    <AlertTriangle className="h-10 w-10 text-[#E11D48]" />
                                </div>
                            )}
                        </div>

                        {/* Headline */}
                        <h2 className="text-center text-2xl font-semibold tracking-tight text-[#111827]">
                            {status === "loading" && "Signing you in…"}
                            {status === "ok" && "You're in 🎉"}
                            {status === "error" && "Something went wrong"}
                        </h2>

                        {/* Subtext */}
                        <p className="mt-2 text-center text-sm text-[#6B7280]">
                            {status === "loading" &&
                                "We’re finalizing your session with Google and ZorigHub. This only takes a moment."}
                            {status === "ok" &&
                                "Your session has been created. Redirecting to your dashboard…"}
                            {status === "error" && message}
                        </p>

                        {/* Skeleton / tips */}
                        {status === "loading" && (
                            <div className="mt-6 space-y-3">
                                <div className="h-2.5 rounded bg-gray-100" />
                                <div className="h-2.5 w-11/12 rounded bg-gray-100" />
                                <div className="h-2.5 w-10/12 rounded bg-gray-100" />
                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-7 flex items-center justify-center gap-3">
                            {status === "error" && (
                                <>
                                    <button
                                        onClick={retry}
                                        className="inline-flex items-center justify-center rounded-xl bg-[#B71C1C] px-4 py-2.5 text-sm font-medium text-white shadow hover:opacity-95 active:scale-[0.99] transition"
                                    >
                                        Try again
                                    </button>
                                    <a
                                        href="/"
                                        className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-[#111827] hover:bg-gray-50"
                                    >
                                        Back home
                                    </a>
                                </>
                            )}

                            {status === "ok" && (
                                <a
                                    href="/dashboard"
                                    className="inline-flex items-center justify-center rounded-xl bg-[#111827] px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-black"
                                >
                                    Go to dashboard
                                </a>
                            )}
                        </div>

                        {/* Fine print */}
                        <p className="mt-6 text-center text-[11px] leading-5 text-[#9CA3AF]">
                            Having trouble? Make sure cookies are enabled and try again. If you’re on a new device,
                            sign-in may take a few extra seconds.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-[#9CA3AF]">
                    © {new Date().getFullYear()} ZorigHub • Built with love in Bhutan
                </div>
            </div>
        </div>
    );
}
