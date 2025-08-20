import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

import NDIlogo from "../../assets/ndibg.svg";
import ndi_scan from "../../assets/scaniconimg.svg";
import google from "../../assets/google.jpg";
import apple from "../../assets/apple.jpg";
import call from "../../assets/Call.svg";
import email from "../../assets/Mail.svg";
import Play from "../../assets/PlayButton.svg";

function NdiLogin() {
    // Frontend-only demo behavior: show spinner, then QR after a moment
    const [qrReady, setQrReady] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setQrReady(true), 900);
        return () => clearTimeout(t);
    }, []);

    return (
        <>
            {/* Back button */}
            <button
                onClick={() => window.history.back()}
                className="bg-[#5ac994] text-white text-[16px] px-5 py-2.5 rounded-[8px] m-5 font-semibold cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-colors duration-300 hover:bg-[#47b483]"
            >
                ← Back
            </button>

            {/* Card container */}
            <div className="w-full max-w-[406px] mx-auto my-[60px] p-[30px] bg-[#f8f8f8] rounded-[16px] shadow-[0_0_8px_rgba(0,0,0,0.05)] text-center font-[Inter,sans-serif] text-[16px]">
                {/* Title (desktop vs mobile text) */}
                <h3 className="text-center text-[18px] font-bold mb-[30px]">
                    <span className="inline md:hidden">
                        Login with <span className="text-[#5ac994] font-semibold">Bhutan NDI</span> Wallet
                    </span>
                    <span className="hidden md:inline">
                        Scan with <span className="text-[#5ac994] font-semibold">Bhutan NDI</span> Wallet
                    </span>
                </h3>

                {/* Mobile-only “Open Wallet” button + OR divider */}
                <div className="block mb-5 md:hidden">
                    <a
                        href="#"
                        className="inline-block bg-[#5ac994] text-white py-3 px-6 rounded-[8px] font-semibold text-[15px] w-full max-w-[280px] no-underline transition-colors duration-300 hover:bg-[#48b585]"
                    >
                        Open Bhutan NDI Wallet
                    </a>

                    {/* OR divider */}
                    <div className="flex items-center text-center my-[30px] text-[#979797] font-medium text-[14px]">
                        <span className="flex-1 h-px bg-[#979797] mr-[10px]" />
                        OR
                        <span className="flex-1 h-px bg-[#979797] ml-[10px]" />
                    </div>
                </div>

                {/* QR container */}
                <div className="relative inline-block p-[15px] border-[3px] border-[#5ac994] rounded-[12px] bg-white w-fit h-fit mb-[30px]">
                    {!qrReady ? (
                        <div className="flex flex-col items-center mt-[10px]">
                            <div className="border-[5px] border-[#f3f3f3] border-t-[5px] border-t-[#4b91e2] rounded-full w-10 h-10 animate-spin" />
                            <div className="mt-2 text-gray-600 text-[14px]">Generating QR...</div>
                        </div>
                    ) : (
                        <>
                            <QRCodeCanvas
                                value={"demo-qr-value"}
                                size={185}
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="H"
                                includeMargin={false}
                            />
                            {/* Center logo overlay */}
                            <img
                                src={NDIlogo}
                                alt="Center Logo"
                                className="absolute top-1/2 left-1/2 w-[50px] h-[50px] rounded-full -translate-x-1/2 -translate-y-1/2 border-[3px] border-white bg-white
                           max-[480px]:w-[40px] max-[480px]:h-[40px]"
                            />
                        </>
                    )}
                </div>

                {/* Steps */}
                <div className="text-[#a1a0a0] text-[14px] mb-[30px] text-left px-5 max-[480px]:text-[13px]">
                    <ol className="list-none space-y-2">
                        <li>1. Open Bhutan NDI Wallet on your phone</li>
                        <li className="flex items-center">
                            2. Tap the scan button
                            <img src={ndi_scan} alt="Scan" className="w-[22px] h-[22px] ml-[5px] align-middle" />
                            &nbsp;and scan the QR code
                        </li>
                    </ol>
                </div>

                {/* Video button container width rules */}
                <div className="mb-[30px] w-[220px] mx-auto max-[480px]:w-full max-[480px]:max-w-[250px]">
                    <a
                        href="#"
                        className="bg-transparent border-2 border-[#5ac994] text-[#5ac994] py-2 px-4 rounded-[20px] cursor-pointer font-medium text-[16px] w-full flex justify-around items-center no-underline transition-colors duration-300 hover:bg-[#ecfdf5]"
                    >
                        <div>Watch video guide</div>
                        <img src={Play} alt="play youtube" className="w-5 h-5 ml-[5px] align-middle" />
                    </a>
                </div>

                {/* Download now text */}
                <div className="text-[14px] text-[#a1a0a0] mb-[10px]">
                    Don't have the Bhutan NDI Wallet?{" "}
                    <span className="font-semibold text-[#5ac994]">Download Now!</span>
                </div>

                {/* Store badges */}
                <div className="flex justify-center gap-[10px] mb-[30px] max-[320px]:flex-col max-[320px]:items-center">
                    <a href="https://play.google.com/store/apps/details?id=com.bhutanndi" target="_blank" rel="noreferrer">
                        <img src={google} alt="Google Play" className="w-[120px] cursor-pointer max-[480px]:w-[160px]" />
                    </a>
                    <a href="https://apps.apple.com/au/app/bhutan-ndi/id1645493166" target="_blank" rel="noreferrer">
                        <img src={apple} alt="App Store" className="w-[120px] cursor-pointer max-[480px]:w-[160px]" />
                    </a>
                </div>

                {/* Support */}
                <p className="font-semibold text-[16px] text-[#5ac994] mb-[10px]">Get Support</p>
                <div className="text-[14px] text-[#000] leading-[1.6] flex justify-center gap-[10px] items-center flex-wrap font-medium">
                    <p className="flex items-center justify-center gap-2">
                        <img src={email} alt="Email" className="w-[18px] h-[18px] align-middle" />
                        <span>ndifeedback@dhi.bt</span>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                        <img src={call} alt="Call" className="w-[18px] h-[18px] align-middle" />
                        <span>1199</span>
                    </p>
                </div>
            </div>
        </>
    );
}

export default NdiLogin;
