import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product, showArtisanStory = true }) => {
  const { isAuthenticated } = useAuth();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', product);
  };

  const handleViewArtisanStory = () => {
    // TODO: Navigate to artisan profile page
    console.log('View artisan story:', product.artisan);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg craft-item">
      <div className="relative">
        {!imageError ? (
          <img 
            src={product.image || product.imageUrl || '/api/placeholder/300/200'} 
            alt={product.name || product.title}
            className="w-full h-64 object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Product Image</span>
          </div>
        )}
        
        {showArtisanStory && (
          <button 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white text-red-600 border border-red-600 rounded-full font-semibold hover:bg-red-50 transition-colors"
            onClick={handleViewArtisanStory}
          >
            {product.artisan?.name || 'Artisan'}'s Story
          </button>
        )}
        
        {product.category && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white text-xs rounded-full">
            {product.category}
          </span>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2">{product.name || product.title}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.description || 'Handcrafted with traditional techniques'}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-lg">
            Nu. {product.price?.toLocaleString() || '0'}
          </span>
          {product.artisanShare && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
              Nu. {product.artisanShare} to artisan
            </span>
          )}
        </div>
        
        <button 
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

