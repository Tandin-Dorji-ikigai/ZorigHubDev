import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import weaveImage from '../assets/images/crafts/weave.jpg';
import silverBowlImage from '../assets/images/crafts/silver-bowl.jpg';

const FeaturedProductsSection = () => {
  const { getFeaturedProducts } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback products with local images
  const fallbackProducts = [
    {
      id: 1,
      name: "Bhutanese Silk Scarf",
      description: "Handwoven with 8 traditional symbols of protection",
      price: 3250,
      artisanShare: 850,
      image: weaveImage,
      artisan: { name: "Tshering" },
      category: "Medical debt relief"
    },
    {
      id: 2,
      name: "Silver Offering Bowls",
      description: "Ritual vessels crafted following temple specifications",
      price: 12800,
      artisanShare: 3200,
      image: silverBowlImage,
      artisan: { name: "Dorji" },
      category: "Disability artisan"
    }
  ];

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      const products = await getFeaturedProducts();
      
      if (products && products.length > 0) {
        setFeaturedProducts(products);
      } else {
        // Use fallback products if no featured products from API
        setFeaturedProducts(fallbackProducts);
      }
    } catch (error) {
      console.error('Failed to load featured products:', error);
      // Use fallback products on error
      setFeaturedProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Best Sellers Changing Lives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg animate-pulse">
                <div className="w-full h-64 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Ensure we have at least 4 products for display (mix API + fallback)
  const displayProducts = [...featuredProducts];
  while (displayProducts.length < 4) {
    displayProducts.push({
      id: `placeholder-${displayProducts.length}`,
      name: "Traditional Craft",
      description: "Handcrafted with traditional techniques",
      price: 0,
      artisanShare: 0,
      artisan: { name: "Artisan" },
      category: "Category"
    });
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Best Sellers Changing Lives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.slice(0, 4).map((product) => (
            <ProductCard 
              key={product.id || product._id} 
              product={product} 
              showArtisanStory={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;

