import React from 'react';

function BuyerFooter() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Zorig<span className="text-red-600">Hub</span></h3>
                        <p className="text-gray-400">Preserving and promoting Bhutanese traditional arts and crafts through ethical commerce.</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-pinterest"></i></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Marketplace</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Artisan Profiles</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">About Zorig Chusum</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Shipping Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Returns & Exchanges</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
                        <p className="text-gray-400 mb-4">Subscribe to receive updates on new products and artisan stories.</p>
                        <form className="flex">
                            <input type="email" placeholder="Your email" className="px-3 py-2 rounded-l-md bg-gray-700 text-white w-full focus:outline-none" />
                            <button type="submit" className="bg-red-600 hover:bg-red-800 px-4 py-2 rounded-r-md">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>© 2025 ZorigHub. All rights reserved. Handcrafted in Bhutan 🇧🇹</p>
                </div>
            </div>
        </footer>
    );
}

export default BuyerFooter;
