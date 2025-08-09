// src/pages/ArtisanProfile.jsx
import React from 'react';
import ArtisanLayout from '@/components/artisans/ArtisanLayout';
import userPhoto from "../../assets/images/people/pema.jpg";

function ArtisanProfile() {
    return (
        <ArtisanLayout>
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                    <div className="md:flex">
                        <div className="md:w-1/3 p-6 flex flex-col items-center">
                            <div className="relative mb-4">
                                <img
                                    id="profileImage"
                                    src={userPhoto}
                                    alt="Artisan Profile"
                                    className="w-40 h-40 rounded-full object-cover border-4 border-[#FC2839] shadow-lg"
                                />
                            </div>
                            <button
                                id="uploadBtn"
                                className="bg-[#FC2839] text-white px-6 py-2 rounded-full font-medium hover:bg-red-700"
                            >
                                Upload New Photo
                            </button>
                            <div className="mt-4 text-center">
                                <h3 id="previewName" className="text-xl font-bold">Sonam Dorji</h3>
                                <p id="previewRegion" className="text-gray-600">Paro, Bhutan</p>
                            </div>
                        </div>
                        <div className="md:w-2/3 p-6">
                            <h2 className="text-2xl font-bold mb-6">Artisan Profile</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FC2839] focus:border-[#FC2839]"
                                        value="Sonam Dorji"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FC2839] focus:border-[#FC2839]">
                                            <option selected>Paro</option>
                                            <option>Thimphu</option>
                                            <option>Bumthang</option>
                                            <option>Punakha</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Craft Type</label>
                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FC2839] focus:border-[#FC2839]">
                                            <option selected>Weaving</option>
                                            <option>Wood Carving</option>
                                            <option>Thangka Painting</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Training Certificates</label>
                                    <div className="flex items-center space-x-4">
                                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FC2839] focus:border-[#FC2839]">
                                            <option selected>Zorig Chusum - Traditional Arts School</option>
                                            <option>Private Master-Apprentice</option>
                                        </select>
                                        <button className="bg-[#FC2839] text-white px-4 py-2 rounded-lg hover:bg-red-700">
                                            <i className="fas fa-upload mr-2"></i> Upload
                                        </button>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <button
                                        id="saveProfileBtn"
                                        className="bg-[#FC2839] text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700"
                                    >
                                        Save Profile Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Badges Section */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Artisan Badges</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: 'check-circle', label: 'Verified Artisan', color: 'green' },
                            { icon: 'leaf', label: 'Green Artisan', color: 'blue' },
                            { icon: 'star', label: 'Master Artisan', color: 'yellow' },
                            { icon: 'hands-helping', label: 'Community Mentor', color: 'red' }
                        ].map((badge, i) => (
                            <div
                                key={i}
                                className={`bg-bhutan-${badge.color} bg-opacity-10 p-4 border border-bhutan-${badge.color} rounded-xl text-center`}
                            >
                                <div
                                    className={`w-12 h-12 bg-bhutan-${badge.color} rounded-full flex items-center justify-center mx-auto mb-2 text-white text-xl`}
                                >
                                    <i className={`fas fa-${badge.icon}`}></i>
                                </div>
                                <p className={`font-medium text-bhutan-${badge.color}`}>{badge.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Portfolio Gallery */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Portfolio Gallery</h2>
                        <button
                            id="addWorkBtn"
                            className="bg-[#FC2839] text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2"
                        >
                            <i className="fas fa-plus"></i>
                            <span>Add Work</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["jewellery_1.jpg", "basket.jpg", "thangka.jpg", "sculpting_1.jpg"].map((img, i) => (
                            <div key={i} className="relative group rounded-xl overflow-hidden h-32 md:h-40">
                                <img
                                    src={`/images/crafts/${img}`}
                                    alt="Craft Image"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                                    <button className="text-white bg-[#FC2839] p-2 rounded-full">
                                        <i className="fas fa-expand"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </ArtisanLayout>
    );
}

export default ArtisanProfile;
