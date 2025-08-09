import React, { useState } from 'react';
import BuyerNav from '../../components/buyer/BuyerNav';
import BuyerFooter from '../../components/buyer/BuyerFooter';
import ImageF from "../../assets/images/crafts/scarf.jpg";

const BuyerProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState('/images/crafts/scarf.jpg');
    const [activeTab, setActiveTab] = useState('description');

    const updateQuantity = (value) => {
        setQuantity((prev) => Math.max(1, Math.min(3, prev + value)));
    };

    const dummyReviews = [
        {
            name: 'Tashi Dorji',
            date: '2 weeks ago',
            rating: 5,
            comment: "The craftsmanship on this scarf is exceptional. You can truly feel the love and tradition woven into every thread. It's become my favorite accessory!",
            image: ImageF
        },
        {
            name: 'Jigme Johnson',
            date: '1 month ago',
            rating: 5,
            comment: "I bought this as a gift for my sister who loves handmade textiles. She was absolutely thrilled! The quality is outstanding and it came beautifully packaged. Knowing the story behind the artisan makes it even more special."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <BuyerNav />
            <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
                <div className="flex items-center text-sm text-gray-500 mb-6">
                    <a href="/" className="hover:text-bhutan-red">Home</a>
                    <span className="mx-2">/</span>
                    <a href="/buyer/marketplace" className="hover:text-bhutan-red">Marketplace</a>
                    <span className="mx-2">/</span>
                    <span>Traditional Bumthang Wool Scarf</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2">
                        <img src={ImageF} alt="Product" className="w-full rounded-lg border" />
                        <div className="flex space-x-2 mt-4">
                            {[1, 2, 3, 4].map((_, i) => (
                                <img
                                    key={i}
                                    src={ImageF}
                                    onClick={() => setMainImage({ ImageF })}
                                    className="w-20 h-20 object-cover rounded border cursor-pointer hover:border-bhutan-red"
                                    alt={`Thumb ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-md border">
                        <h1 className="text-2xl font-bold mb-2 text-gray-800">Thangka Painting</h1>
                        <div className="flex items-center text-yellow-400 mb-3">
                            {[...Array(4)].map((_, i) => (
                                <i key={i} className="fas fa-star"></i>
                            ))}
                            <i className="fas fa-star-half-alt"></i>
                            <span className="text-sm text-gray-600 ml-2">(24 reviews)</span>
                        </div>
                        <p className="text-3xl font-extrabold tracking-wide text-gray-900 mb-2">Nu. 8000 <span className="text-gray-400 text-base font-medium">(~$30)</span></p>
                        <p className="text-green-600 font-semibold mb-3">In Stock (Only 3 left)</p>
                        <p className="text-gray-700 mb-6">
                            Handwoven by artisans in Bumthang using traditional techniques passed down through generations. This scarf features natural wool dyed with organic colors and showcases intricate Bhutanese patterns.
                        </p>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Quantity</label>
                            <div className="flex items-center border border-gray-300 w-fit rounded overflow-hidden">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="px-3 py-1 bg-gray-100 text-lg font-semibold"
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    readOnly
                                    value={quantity}
                                    className="w-10 text-center text-base border-x border-gray-200"
                                />
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="px-3 py-1 bg-gray-100 text-lg font-semibold"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2 text-sm font-semibold">
                                <i className="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                            <button className="flex-1 border-2 border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50 text-sm font-semibold">
                                Buy Now
                            </button>
                        </div>

                        <ul className="mt-6 space-y-3 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <i className="fas fa-truck text-red-600 mt-1"></i>
                                <span>Free shipping to Thimphu (3–5 days) • Nu. 200 elsewhere in Bhutan</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="fas fa-leaf text-red-600 mt-1"></i>
                                <span>Biodegradable packaging</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="fas fa-hands-helping text-red-600 mt-1"></i>
                                <span>Supports youth artisan empowerment</span>
                            </li>
                        </ul>
                    </div>
                </div>



                {/* Tabs */}
                <div className="mt-12 border-b flex space-x-8">
                    {['description', 'details', 'reviews'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === tab ? 'border-bhutan-red text-bhutan-red' : 'border-transparent text-gray-500'}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="bg-white p-6 border rounded-b">
                    {activeTab === 'description' && (
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">About This Product</h3>
                            <p className="text-gray-700 mb-4">This exquisite scarf is handwoven by skilled artisans in the Bumthang valley of Bhutan using traditional techniques that have been preserved for centuries. The wool is sourced from local sheep and dyed using natural, organic colors derived from plants and minerals found in the Bhutanese Himalayas.</p>
                            <p className="text-gray-700 mb-4">The intricate patterns woven into the scarf are inspired by traditional Bhutanese motifs, each carrying its own symbolic meaning. The primary design represents eternal knots, symbolizing the interconnectedness of all things in Buddhist philosophy.</p>
                            <div className="mt-6">
                                <h4 className="font-semibold text-gray-800 mb-2">Materials</h4>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>100% Bhutanese sheep wool</li>
                                    <li>Natural plant-based dyes</li>
                                    <li>Hand-spun yarn</li>
                                </ul>
                            </div>
                            <div className="mt-6">
                                <h4 className="font-semibold text-gray-800 mb-2">Care Instructions</h4>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    <li>Hand wash in cold water with mild detergent</li>
                                    <li>Lay flat to dry</li>
                                    <li>Iron on low heat if needed</li>
                                    <li>Store folded in a dry place</li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'details' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Dimensions</h4>
                                <p>Length: 180 cm (71 inches)</p>
                                <p>Width: 30 cm (12 inches)</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Weight</h4>
                                <p>Approx. 150 grams</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Technique</h4>
                                <p>Handwoven on traditional backstrap loom</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Handmade', 'Eco-Friendly', 'Traditional', 'Wool', 'Bhutanese'].map((tag, i) => (
                                        <span key={i} className="bg-gray-100 text-sm text-gray-800 px-3 py-1 rounded-full shadow-sm border">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div>
                            {dummyReviews.map((review, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex items-center mb-2">
                                        <div className="flex text-yellow-400 mr-2">
                                            {[...Array(review.rating)].map((_, i) => <i key={i} className="fas fa-star" />)}
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{review.name}</span>
                                        <span className="text-sm text-gray-500 ml-2">• {review.date}</span>
                                    </div>
                                    <p className="text-gray-700 mb-2">{review.comment}</p>
                                    {review.image && <img src={review.image} alt="Review" className="w-16 h-16 object-cover rounded" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Meet the Artisan  */}
                <section className="mt-12 rounded-[20px] border-2 border-red-300 bg-white p-5 md:p-7">
                    {/* Header with left title + red rule */}
                    <div className="flex items-end gap-4 mb-6">
                        <h2 className="text-[28px] md:text-[32px] font-extrabold leading-none">
                            <span className="text-red-600">Meet</span>
                            <span className="text-[#1C2733]"> the Artisan</span>
                        </h2>
                        <div className="h-1 bg-red-500 rounded-full flex-1 translate-y-[-4px]" />
                    </div>

                    {/* Main two-column content */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left profile card */}
                        <div className="bg-white rounded-[16px] border-2 border-red-300 p-6 flex flex-col items-center text-center">
                            {/* Avatar with red ring */}
                            <div className="w-[120px] h-[120px] rounded-full grid place-items-center relative">
                                <div className="absolute inset-0 rounded-full border-4 border-red-400" />
                                <div className="w-[74%] h-[74%] rounded-full bg-gray-100 grid place-items-center z-10">
                                    <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor" className="text-black/80">
                                        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.239-8 5v1h16v-1c0-2.761-3.58-5-8-5Z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Name + country */}
                            <div className="mt-4">
                                <h3 className="text-[20px] font-semibold text-[#1C2733]">Sonam Choden</h3>
                                <p className="text-gray-500 mt-1">Bhutan</p>
                            </div>

                            {/* Badge row */}
                            <div className="mt-3 flex items-center gap-2">
                                <span className="px-3 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-800 border">Artisan</span>
                                <span className="inline-block w-4 h-4 rounded-md bg-gray-200" />
                            </div>
                        </div>

                        {/* Right story panel */}
                        <div className="rounded-xl border bg-white p-6 text-[#1C2733]">
                            <h4 className="text-[18px] font-semibold mb-2">Sonam's Story</h4>
                            <p className="text-gray-700">
                                Expert weaver of handloom textiles from Bumthang.
                            </p>
                        </div>
                    </div>

                    {/* More from Sonam */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">
                                <span className="text-red-600">More</span>
                                <span className="text-[#1C2733]"> from Sonam</span>
                            </h3>
                            <a href="#" className="text-sm text-gray-700 hover:underline">View all →</a>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            {[
                                { title: "Bhutanese Wool Shawl", price: "Nu. 3,200" },
                                { title: "Traditional Table Runner", price: "Nu. 1,800" },
                                { title: "Handwoven Wool Blanket", price: "Nu. 5,500" },
                                { title: "Yak Wool Scarf", price: "Nu. 3,800" },
                            ].map((p, i) => (
                                <div key={i} className="rounded-xl overflow-hidden bg-white border">
                                    <img
                                        src={ImageF}
                                        alt={p.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-3">
                                        <h4 className="text-sm font-medium text-[#1C2733] leading-tight">{p.title}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{p.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* You May Also Like */}
                <section className="mt-12">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C2733] mb-6">
                        You May Also Like
                    </h2>

                    {/*
    Helper: star renderer
    (inline so you can keep this snippet self‑contained)
  */}
                    {(() => {
                        const StarRow = ({ rating = 5 }) => (
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <svg
                                        key={i}
                                        viewBox="0 0 20 20"
                                        className={`w-4 h-4 ${i <= rating ? 'fill-yellow-400' : 'fill-yellow-400/30'}`}
                                    >
                                        <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                                    </svg>
                                ))}
                            </div>
                        );

                        const items = [
                            { title: 'Bhutanese Silk Scarf', by: 'Dorji Wangchuk', price: 'Nu. 3,500', rating: 5 },
                            { title: 'Handwoven Wool Bag', by: 'Pema Lhamo', price: 'Nu. 2,800', rating: 4 },
                            { title: 'Yak Wool Shawl', by: 'Karma Dorji', price: 'Nu. 4,200', rating: 5 },
                            { title: 'Traditional Belt', by: 'Dechen Wangmo', price: 'Nu. 1,500', rating: 4 },
                        ];

                        return (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {items.map((p, idx) => (
                                    <article
                                        key={idx}
                                        className="bg-white rounded-2xl border shadow-[0_10px_20px_rgba(0,0,0,0.06)] overflow-hidden"
                                    >
                                        <img src={ImageF} alt={p.title} className="w-full h-30 object-cover" />
                                        <div className="p-4">
                                            <h3 className="text-[17px] font-semibold text-[#1C2733] leading-snug">
                                                {p.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm mt-1">By {p.by}</p>

                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-[#1C2733] font-bold">{p.price}</span>
                                                <StarRow rating={p.rating} />
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        );
                    })()}
                </section>

            </main >
            <BuyerFooter />
        </div >
    );
};

export default BuyerProductDetails;
