import React, { useMemo, useRef, useState } from 'react';
import axios from 'axios';
import ArtisanLayout from '@/components/artisans/ArtisanLayout';
import userPhotoFallback from "../../assets/images/people/pema.jpg";
import { uploadImageToIPFS } from "@/lib/ipfsUpload";

const DEV_USER_KEY = "zorighub_dev_user";
const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5173";

function ArtisanProfile() {
    const currentUser = useMemo(() => {
        try {
            const raw = localStorage.getItem(DEV_USER_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    }, []);

    const [photo, setPhoto] = useState(currentUser?.photo || userPhotoFallback);
    const [fullName, setFullName] = useState(currentUser?.fullName || "Sonam Dorji");
    const [dzongkhag, setDzongkhag] = useState(currentUser?.dzongkhag || "Paro");
    const [gewog, setGewog] = useState(currentUser?.gewog || "");
    const [craftType, setCraftType] = useState("Weaving");

    const cid = currentUser?.CID || "";
    const gender = currentUser?.gender || "";
    const isActive = currentUser?.isActive ?? true;

    const [saving, setSaving] = useState(false);
    const [file, setFile] = useState(null);    // ← if set, a new image was chosen
    const fileRef = useRef(null);

    const regionDisplay = [gewog, dzongkhag].filter(Boolean).join(", ") + (dzongkhag ? ", Bhutan" : "");

    const handleUploadClick = () => fileRef.current?.click();

    const handleFileChange = (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        setFile(f);                               // mark as changed
        const url = URL.createObjectURL(f);
        setPhoto(url);                            // local preview only (no upload yet)
    };

    // Save profile: if user selected a new file, upload to IPFS first, then PATCH profile
    const handleSave = async () => {
        try {
            setSaving(true);

            // 1) If a new local file is selected, upload to IPFS now
            let photoUrl = photo;
            if (file) {
                const { url } = await uploadImageToIPFS(file, {
                    kind: "avatar",
                    userId: currentUser?._id || "",
                });
                photoUrl = url;        // use hosted IPFS url for persistence
                setPhoto(url);         // update preview to the hosted image
            }

            // 2) Prepare payload (skip blob previews)
            const payload = {
                fullName,
                dzongkhag,
                gewog,
                ...(gender ? { gender } : {}),
                ...(cid ? { CID: cid } : {}),
                ...(photoUrl && !photoUrl.startsWith("blob:") ? { photo: photoUrl } : {}),
            };

            // 3) PATCH to backend
            const url = currentUser?._id
                ? `${API_BASE}/api/artisans/${currentUser._id}`
                : `${API_BASE}/api/artisans/cid/${encodeURIComponent(cid)}`;

            const { data: updated } = await axios.patch(url, payload, { withCredentials: true });

            // 4) Sync dev session + local UI
            localStorage.setItem(DEV_USER_KEY, JSON.stringify(updated));
            setPhoto(updated.photo || photoUrl || photo);
            setFullName(updated.fullName ?? fullName);
            setDzongkhag(updated.dzongkhag ?? dzongkhag);
            setGewog(updated.gewog ?? gewog);

            // clear the file marker since save is done
            setFile(null);

            alert("Profile updated successfully!");
        } catch (err) {
            console.error(err);
            const msg = err?.response?.data?.error || "Failed to update profile.";
            alert(msg);
        } finally {
            setSaving(false);
        }
    };

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
                                    src={photo}
                                    alt="Artisan Profile"
                                    className="w-40 h-40 rounded-full object-cover border-4 border-[#FC2839] shadow-lg"
                                />
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <div className="flex flex-col items-center gap-2">
                                <button
                                    id="chooseBtn"
                                    onClick={handleUploadClick}
                                    className="bg-[#FC2839] text-white px-4 py-2 rounded-full font-medium hover:bg-red-700"
                                >
                                    Choose Photo
                                </button>
                                <p className="text-xs text-gray-500">
                                    Your image will upload to IPFS when you save.
                                </p>
                            </div>

                            <div className="mt-4 text-center">
                                <h3 id="previewName" className="text-xl font-bold">
                                    {fullName}
                                </h3>
                                <p id="previewRegion" className="text-gray-600">
                                    {[gewog, dzongkhag].filter(Boolean).join(", ") || "Bhutan"}
                                </p>
                            </div>
                        </div>

                        <div className="md:w-2/3 p-6">
                            <h2 className="text-2xl font-bold mb-6">Artisan Profile</h2>

                            <div className="space-y-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FC2839] focus:border-[#FC2839]"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>

                                {/* Region (Dzongkhag) + Gewog */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Dzongkhag (Region)
                                        </label>
                                        <select
                                            value={dzongkhag}
                                            onChange={(e) => setDzongkhag(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FC2839] focus:border-[#FC2839]"
                                        >
                                            <option>Paro</option>
                                            <option>Thimphu</option>
                                            <option>Bumthang</option>
                                            <option>Punakha</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Gewog (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Kawang"
                                            value={gewog}
                                            onChange={(e) => setGewog(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FC2839] focus:border-[#FC2839]"
                                        />
                                    </div>
                                </div>

                                {/* Craft Type (not saved yet—schema doesn't have it) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Craft Type
                                    </label>
                                    <select
                                        value={craftType}
                                        onChange={(e) => setCraftType(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FC2839] focus:border-[#FC2839]"
                                    >
                                        <option>Weaving</option>
                                        <option>Wood Carving</option>
                                        <option>Thangka Painting</option>
                                        <option>Embroidery</option>
                                        <option>Pottery</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-1">
                                        (Not saved — add <code>craftType</code> to your schema if you want this persisted.)
                                    </p>
                                </div>

                                {/* Read-only from login */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            CID
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={cid}
                                            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        id="saveProfileBtn"
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="bg-[#FC2839] text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {saving ? "Saving..." : "Save Profile Changes"}
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
                            { icon: 'hands-helping', label: 'Community Mentor', color: 'red' },
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
