import React from "react";

const AddProductModal = ({ isOpen, onClose, onSubmit, onUpload }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 min-h-screen">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-600 text-2xl font-bold"
                    >
                        &times;
                    </button>
                </div>
                <form
                    className="space-y-5"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (Nu.)</label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows="3"
                            placeholder="Enter product description"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Select Category</option>
                            <option value="weaving">Weaving</option>
                            <option value="sculpture">Sculpture</option>
                            <option value="wood">Wood Carving</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                        <input
                            type="number"
                            min="0"
                            placeholder="Available stock"
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                        <div className="flex items-center gap-4">
                            <input type="file" className="block w-full text-sm" />
                            <button
                                type="button"
                                onClick={onUpload}
                                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-50"
                            >
                                Upload
                            </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-400">Upload image file to get URL</p>
                    </div>

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
                            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm"
                        >
                            <i className="fas fa-plus mr-1"></i> Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
