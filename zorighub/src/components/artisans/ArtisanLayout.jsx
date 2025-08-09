import React from "react";
import Sidebar from "./ArtisanSidebar"

import TopNav from "./ArtisanTopNav";

const ArtisanLayout = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-bhutan-gray">
            <Sidebar />
            <div className="flex-grow">
                <TopNav />
                <main className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default ArtisanLayout;