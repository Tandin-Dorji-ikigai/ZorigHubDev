import React from 'react';
import BuyerNav from '../../components/buyer/BuyerNav';
import BuyerFooter from '../../components/buyer/BuyerFooter';
import { FaShoppingCart } from 'react-icons/fa';
import userImage from '../../assets/images/people/tshering.jpg';
import productImage from '../../assets/images/crafts/basket.jpg';
const featuredProducts = [
    {
        id: 1,
        name: 'Bamboo basket',
        description: 'This is a bamboo basket',
        price: 'Nu. 4000',
        image: productImage
    },
    {
        id: 2,
        name: 'Thangka Painting',
        description: 'Sacred thangka depicting Guru Rinpoche, painted with natural mineral pigments.',
        price: 'Nu. 8000',
        image: productImage
    },
    {
        id: 3,
        name: 'Traditional Wooden Bowl (Phob)',
        description: 'Hand-carved wooden bowl used in traditional Bhutanese households.',
        price: 'Nu. 1500',
        image: productImage
    },
    {
        id: 4,
        name: 'Traditional Bhutanese Brickwork Wall Art',
        description: 'Decorative wall piece replicating ancient Bhutanese brickwork patterns.',
        price: 'Nu. 3500',
        image: productImage
    }
];

const topArtisans = [
    { id: 1, name: 'Pema Dorji', image: userImage },
    { id: 2, name: 'Sonam Choden', image: userImage },
    { id: 3, name: 'Karma Wangchuk', image: userImage },
    { id: 4, name: 'Jigme Zangmo', image: userImage },
    { id: 5, name: 'Choden Lhamo', image: userImage }
];

const recentlyViewed = [
    { id: 1, name: 'Ceramic Tea Set', price: 'Nu. 1200', image: productImage },
    { id: 2, name: 'Handmade Notebook', price: 'Nu. 3200', image: productImage },
    { id: 3, name: 'Traditional Necklace', price: 'Nu. 5200', image: productImage },
    { id: 4, name: 'Woolen Scarf', price: 'Nu. 6200', image: productImage },
    { id: 5, name: 'Carved Mask', price: 'Nu. 200', image: productImage }
];

function BuyerHome() {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <BuyerNav />
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <section className="mb-10">
                    <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to ZorigHub</h1>
                        <p className="text-gray-600 mb-4">Discover authentic Bhutanese craftsmanship today</p>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold pb-2 inline-block border-b-2 border-red-600">Featured Products</h2>
                        <div className="flex items-center space-x-4">
                            <label htmlFor="currency-toggle" className="text-sm font-medium">Show price in:</label>
                            <select id="currency-toggle" className="border border-gray-300 rounded px-2 py-1 text-sm">
                                <option value="nu">Nu. (BTN)</option>
                                <option value="usd">USD ($)</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h3>
                                    <p className="text-sm text-gray-600 flex-grow">{product.description}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <p className="text-red-600 font-bold text-lg">{product.price}</p>
                                        <div className="flex gap-2">
                                            <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                                                <FaShoppingCart className="mr-1" /> Add
                                            </button>
                                            <button className="border border-gray-300 px-3 py-1 rounded text-sm">View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                        {topArtisans.map(artisan => (
                            <div key={artisan.id} className="bg-white rounded-xl shadow hover:shadow-lg transition text-center p-4">
                                <img src={artisan.image} alt={artisan.name} className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-red-600 mb-2" />
                                <h4 className="font-semibold text-sm text-gray-700">{artisan.name}</h4>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recently Viewed */}
                <section className="mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold border-b-2 border-red-600 pb-2 inline-block">Recently Viewed</h2>
                        <a href="/buyer/marketplace" className="text-red-600 hover:text-red-800 flex items-center text-sm font-medium">
                            View all <i className="fas fa-chevron-right ml-1 text-xs"></i>
                        </a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {recentlyViewed.map(item => (
                            <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                                <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
                                <div className="p-3 flex flex-col flex-grow">
                                    <p className="font-medium text-sm text-gray-700 mb-1">{item.name}</p>
                                    <p className="text-red-600 font-bold text-sm mb-2">{item.price}</p>
                                    <button className="border border-gray-300 px-3 py-1 rounded text-sm self-start">View</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <BuyerFooter />
        </div>
    );
}

export default BuyerHome;
