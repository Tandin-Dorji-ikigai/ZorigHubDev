// src/components/artisans/AddProductModal.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import { uploadImagesToIPFS } from "@/lib/ipfsUpload"; // ✅ centralized batch uploader

const DEV_USER_KEY = "zorighub_dev_user";
const API_BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5173";

export default function AddProductModal({ isOpen, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const [files, setFiles] = useState([]);          // File[]
  const [previews, setPreviews] = useState([]);    // local object URLs
  const [imageUrls, setImageUrls] = useState([]);  // IPFS URLs after upload

  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const inputRef = useRef(null);

  const currentUser = useMemo(() => {
    try {
      const fromLS = localStorage.getItem(DEV_USER_KEY);
      return fromLS ? JSON.parse(fromLS) : null;
    } catch {
      return null;
    }
  }, []);
  const userId = currentUser?._id || "685e063887774590a6c2a9e4"; // fallback

  // Load categories when modal opens
  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      setLoadingCats(true);
      try {
        const res = await axios.get(`${API_BASE}/api/categories`);
        setCategories(res.data || []);
      } catch (e) {
        console.error("Error loading categories:", e);
      } finally {
        setLoadingCats(false);
      }
    })();
  }, [isOpen]);

  // Cleanup previews
  useEffect(() => {
    return () => previews.forEach((u) => URL.revokeObjectURL(u));
  }, [previews]);

  // Auto-upload after selecting files
  const handleFilesChange = async (e) => {
    const selected = Array.from(e.target.files || []);
    const limited = selected.slice(0, 4); // enforce <= 4

    // cleanup old previews
    previews.forEach((u) => URL.revokeObjectURL(u));

    const nextPreviews = limited.map((f) => URL.createObjectURL(f));
    setFiles(limited);
    setPreviews(nextPreviews);
    setImageUrls([]); // clear previous uploads

    if (!limited.length) return;

    setUploading(true);
    try {
      const { urls } = await uploadImagesToIPFS(limited, {
        kind: "product",
        userId,
      });
      setImageUrls(urls); // swap to hosted IPFS URLs
    } catch (err) {
      console.error(err);
      alert("Unable to upload images.");
      // keep local previews so user can retry by reselecting
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setCategoryId("");
    setStockQuantity("");
    setFiles([]);
    previews.forEach((u) => URL.revokeObjectURL(u));
    setPreviews([]);
    setImageUrls([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrls.length) {
      alert("Images missing. Please select images (they’ll auto-upload).");
      return;
    }

    const payload = {
      userId,
      name,
      description,
      price,
      categoryId,
      stockQuantity,
      image: imageUrls[0],  // primary
      images: imageUrls,    // gallery array
    };

    setSubmitting(true);
    try {
      await axios.post(`${API_BASE}/api/products`, payload);
      alert("Product added successfully!");
      resetForm();
      onSuccess?.();
      onClose?.();
    } catch (error) {
      if (error?.response?.data?.error) {
        alert("Failed to add product: " + error.response.data.error);
      } else {
        alert("An error occurred while adding the product.");
      }
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 min-h-screen">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-600 text-2xl font-bold"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (Nu.)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows="3"
              placeholder="Enter product description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">
                {loadingCats ? "Loading categories..." : "Select Category"}
              </option>
              {categories.map((cat) => (
                <option key={cat._id || cat.name} value={cat._id || cat.name}>
                  {cat.name} — {cat.description}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              min="0"
              placeholder="Available stock"
              required
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Images (auto-upload) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images (up to 4)
            </label>

            {/* Show IPFS previews if uploaded, else local previews */}
            {imageUrls.length > 0 ? (
              <div className="mb-3 grid grid-cols-4 gap-2">
                {imageUrls.map((u, i) => (
                  <div key={i} className="h-20 w-full rounded overflow-hidden border">
                    <img src={u} alt={`img-${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : previews.length > 0 ? (
              <div className="mb-3 grid grid-cols-4 gap-2">
                {previews.map((u, i) => (
                  <div key={i} className="h-20 w-full rounded overflow-hidden border">
                    <img src={u} alt={`local-${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="flex items-center gap-4">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="block w-full text-sm"
                onChange={handleFilesChange} // 👈 auto-upload starts here
              />
            </div>

            <p className="mt-1 text-sm text-gray-400">
              {uploading
                ? "Uploading to IPFS… please wait."
                : "Select up to 4 images — they’ll upload automatically."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Adding..." : (<><i className="fas fa-plus mr-1" /> Add Product</>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
