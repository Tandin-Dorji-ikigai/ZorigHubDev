import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';

import { AuthProvider } from './context/AuthContext';
import Header from './components/nav/Header';
import HeroSection from './components/HeroSection';
import ArtisanCarousel from './components/ArtisanCarousel';
import UniqueValueSection from './components/UniqueValueSection';
import ShopByStorySection from './components/ShopByStorySection';
import CulturalRescueSection from './components/CulturalRescueSection';
import FeaturedProductsSection from './components/FeaturedProductsSection';
import StoryDiscoverySection from './components/StoryDiscoverySection';
import TrustIndicatorsSection from './components/TrustIndicatorsSection';
import Footer from './components/footer/Footer';

// Admin pages
import AdminDashboard from './pages/admins/AdminDashboard';
import AdminUsers from './pages/admins/AdminUsers';
import AdminAnalytics from './pages/admins/AdminAnalytics';
import AdminLoan from './pages/admins/AdminLoan';
import AdminSetting from './pages/admins/AdminSetting';
import AdminLogin from './pages/admins/AdminLogin';
import AdminOrders from './pages/admins/AdminOrders';

// Artisan pages
import ArtisanHome from './pages/artisans/ArtisanHome';
import ArtisanProduct from './pages/artisans/ArtisanProduct';
import ArtisanOrders from './pages/artisans/ArtisanOrders';
import ArtisanEarning from './pages/artisans/ArtisanEarning';
import ArtisanProfile from './pages/artisans/ArtisanProfile';

//Buyer pages
import BuyerHome from './pages/buyers/BuyerHome';
import BuyerProductDetails from './pages/buyers/BuyerProductDetails';
import BuyerMarketPlace from './pages/buyers/BuyerMarketPlace';
import BuyerAbout from './pages/buyers/BuyerAbout';
import BuyerOrders from './pages/buyers/BuyerOrders';
import BuyerCart from './pages/buyers/BuyerCart';
import BuyerCheckout from './pages/buyers/BuyerCheckout';
import './App.css';

//auth pages
import Login from './components/auth/login';
import NdiLogin from './components/auth/NdiLogin';
import GoogleSuccess from './components/auth/GoogleSuccess';

const HomePage = () => (
  <div className="bg-gray-50 text-gray-900">
    <Header />
    <HeroSection />
    <ArtisanCarousel />
    <UniqueValueSection />
    <ShopByStorySection />
    <CulturalRescueSection />
    <FeaturedProductsSection />
    <StoryDiscoverySection />
    <TrustIndicatorsSection />
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* auth */}

          <Route path="/login" element={<Login />} />
          <Route path="/ndi" element={< NdiLogin />} />
          <Route path="/google-success" element={< GoogleSuccess />} />
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Buyer Dashboard */}
          <Route path="/buyer" element={<BuyerHome />} />
          <Route path="/buyer/productDetails" element={<BuyerProductDetails />} />
          <Route path="/buyer/BuyerMarketPlace" element={<BuyerMarketPlace />} />
          <Route path="/buyer/BuyerAbout" element={<BuyerAbout />} />
          <Route path="/buyer/orders" element={<BuyerOrders />} />
          <Route path="/buyer/cart" element={<BuyerCart />} />
          <Route path="/buyer/checkout" element={<BuyerCheckout />} />

          {/* Admin Routes (No protection) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/adminuser" element={<AdminUsers />} />
          <Route path="/admin/adminanalytics" element={<AdminAnalytics />} />
          <Route path="/admin/adminorders" element={<AdminOrders />} />
          <Route path="/admin/adminloan" element={<AdminLoan />} />
          <Route path="/admin/adminsettings" element={<AdminSetting />} />

          {/* Artisan Routes */}
          <Route path="/artisan" element={<ArtisanHome />} />
          <Route path="/artisan/products" element={<ArtisanProduct />} />
          <Route path="/artisan/orders" element={<ArtisanOrders />} />
          <Route path="/artisan/earnings" element={<ArtisanEarning />} />
          <Route path="/artisan/profile" element={<ArtisanProfile />} />

          {/* Fallback */}
          {/* <Route path="*" element={<HomePage />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
