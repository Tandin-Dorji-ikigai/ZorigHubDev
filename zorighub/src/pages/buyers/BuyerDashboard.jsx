import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ApiService from '../../services/api';

const BuyerDashboard = () => {
  const { user, logout } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [topArtisans, setTopArtisans] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [currency, setCurrency] = useState('nu');
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, artisans] = await Promise.all([
          ApiService.getAllProducts(),
          ApiService.getAllArtisans()
        ]);
        setFeaturedProducts(products.filter(p => p.featured).slice(0, 8));
        setTopArtisans(artisans.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatPrice = (price) => {
    if (currency === 'usd') {
      return `$${(price / 80).toFixed(2)}`;
    }
    return `Nu. ${price}`;
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/">
                <img src="/logo.png" className="w-28 h-14 object-cover" alt="logo image" />
              </a>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-red-600 border-b-2 border-red-600 px-3 py-2 text-sm font-medium">Home</a>
              <a href="/buyer/marketplace" className="text-gray-600 hover:text-red-600 px-3 py-2 text-sm font-medium">Marketplace</a>
              <a href="/buyer/artisans" className="text-gray-600 hover:text-red-600 px-3 py-2 text-sm font-medium">Artisans</a>
              <a href="/buyer/about" className="text-gray-600 hover:text-red-600 px-3 py-2 text-sm font-medium">About</a>
              <a href="/buyer/orders" className="text-gray-600 hover:text-red-600 px-3 py-2 text-sm font-medium">Orders</a>
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-5">
              <div className="relative">
                <a href="/buyer/cart" className="text-gray-600 hover:text-red-600 relative inline-block">
                  <i className="fas fa-shopping-cart text-xl"></i>
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                </a>
              </div>
              <div className="relative ml-4">
                <div 
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <img 
                    src={user?.photo || "/images/people/tshering.jpg"} 
                    alt="User"
                    className="w-8 h-8 object-cover rounded-full border-2 border-red-600"
                  />
                  <span className="text-sm font-medium text-gray-600 hidden md:inline">
                    {user?.fullName || 'User'}
                  </span>
                </div>

                {/* Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <a href="/buyer/buyerProfile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </a>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 focus:outline-none">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <section className="mb-10">
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {user?.fullName || 'Valued Customer'}!
            </h1>
            <p className="text-gray-600 mb-4">Discover authentic Bhutanese craftsmanship today</p>
          </div>
        </section>

        {/* Featured Products Carousel */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2 inline-block">Featured Products</h2>
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="currency-toggle" className="text-sm font-medium">Show price in:</label>
              <select 
                id="currency-toggle" 
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="nu">Nu. (BTN)</option>
                <option value="usd">USD ($)</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-red-600">
                        {formatPrice(product.price)}
                      </span>
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/buyer/orders" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex items-center">
              <div className="bg-red-600 bg-opacity-10 text-red-600 rounded-lg p-3 mr-4">
                <i className="fas fa-box-open text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">My Orders</h3>
                <p className="text-gray-600 text-sm mt-1">Track your purchases</p>
              </div>
            </a>

            <a href="#" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex items-center">
              <div className="bg-red-600 bg-opacity-10 text-red-600 rounded-lg p-3 mr-4">
                <i className="fas fa-heart text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Saved Items</h3>
                <p className="text-gray-600 text-sm mt-1">Your wishlist</p>
              </div>
            </a>

            <a href="#" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex items-center">
              <div className="bg-red-600 bg-opacity-10 text-red-600 rounded-lg p-3 mr-4">
                <i className="fas fa-bolt text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Recommended for You</h3>
                <p className="text-gray-600 text-sm mt-1">Personalized picks</p>
              </div>
            </a>
          </div>
        </section>

        {/* Top Artisans */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2 inline-block">Top Artisans of the Month</h2>
            <a href="/buyer/artisans" className="text-red-600 hover:text-red-800 flex items-center text-sm font-medium">
              View all <i className="fas fa-chevron-right ml-1 text-xs"></i>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {topArtisans.map((artisan) => (
              <div key={artisan._id} className="text-center">
                <img 
                  src={artisan.photo} 
                  alt={artisan.fullName}
                  className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border-2 border-red-600"
                />
                <h3 className="font-medium text-sm">{artisan.fullName}</h3>
                <p className="text-xs text-gray-600">{artisan.specialization}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Callout Sections */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learn About Zorig Chusum */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="max-w-md">
                  <h2 className="text-2xl font-bold mb-2">Learn About Zorig Chusum</h2>
                  <p className="mb-4 text-white text-opacity-90">
                    Discover the 13 traditional arts and crafts of Bhutan that represent our rich cultural heritage.
                  </p>
                  <a href="/buyer/about" className="bg-white text-red-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition">
                    Explore Traditions
                  </a>
                </div>
                <div className="relative">
                  <img 
                    src="/images/crafts/thangka.jpg" 
                    alt="Traditional Craft"
                    className="w-20 h-20 rounded-full border-4 border-red-600 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Why Buy from ZorigHub? */}
            <div className="bg-white rounded-xl shadow-lg p-6 flex items-start justify-between">
              <div className="max-w-md">
                <h2 className="text-2xl font-bold mb-2">Why Buy from ZorigHub?</h2>
                <p className="mb-4 text-gray-600">
                  Your purchase directly supports traditional artisans and helps preserve Bhutanese culture.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Authentic handmade products
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Fair compensation for artisans
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    Eco-friendly materials
                  </li>
                </ul>
              </div>
              <div className="hidden md:flex items-center justify-center bg-red-600 bg-opacity-10 text-red-600 rounded-lg p-4">
                <i className="fas fa-hands-helping text-3xl"></i>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
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
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="px-3 py-2 rounded-l-md bg-gray-700 text-white w-full focus:outline-none"
                />
                <button type="submit" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-md">
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
    </div>
  );
};

export default BuyerDashboard;

