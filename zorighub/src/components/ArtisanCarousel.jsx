import { useState, useEffect } from 'react';
import { useArtisans } from '../hooks/useProducts';
import pemaImage from '../assets/images/people/pema.jpg';
import tsheringImage from '../assets/images/people/tshering.jpg';
import karmaImage from '../assets/images/people/karma.jpg';

const ArtisanCarousel = () => {
  const { artisans, loading } = useArtisans();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayArtisans, setDisplayArtisans] = useState([]);

  // Fallback artisans with local images
  const fallbackArtisans = [
    {
      id: 0,
      fullName: "Pema Wangmo",
      photo: pemaImage,
      specialization: "Hand-woven silk textiles",
      story: "Specializing in hand-woven silk textiles using techniques passed down through five generations of her family. Each pattern tells stories from Bhutanese folklore.",
      quote: "This craft saved my family after my husband passed away. With what I earn, I can send my children to school and keep our traditions alive.",
      tag: "Single mother of three"
    },
    {
      id: 1,
      fullName: "Sangay Dorji",
      photo: tsheringImage,
      specialization: "Silver filigree",
      story: "Masters the intricate art of silver filigree despite limited mobility. His work decorates Buddhist altars and royal palaces throughout Bhutan.",
      quote: "They said I couldn't continue my craft after the accident. This platform gave me a way to support my family and prove them wrong.",
      tag: "Disability artisan"
    },
    {
      id: 2,
      fullName: "Tashi Dorji",
      photo: karmaImage,
      specialization: "Bamboo craftwork",
      story: "Creates traditional bamboo craftwork that was almost lost after floods destroyed his village. Each piece represents resilience of Bhutanese culture.",
      quote: "When the floods took everything, this craft gave me purpose. Now I teach others so our traditions won't disappear.",
      tag: "Flood survivor"
    }
  ];

  useEffect(() => {
    if (!loading) {
      if (artisans && artisans.length > 0) {
        // Use API data if available, otherwise use fallback
        const processedArtisans = artisans.slice(0, 3).map((artisan, index) => ({
          ...artisan,
          photo: artisan.photo || fallbackArtisans[index]?.photo,
          story: artisan.bio || artisan.description || fallbackArtisans[index]?.story,
          quote: artisan.testimonial || fallbackArtisans[index]?.quote,
          tag: artisan.category || fallbackArtisans[index]?.tag
        }));
        setDisplayArtisans(processedArtisans);
      } else {
        setDisplayArtisans(fallbackArtisans);
      }
    }
  }, [artisans, loading]);

  useEffect(() => {
    if (displayArtisans.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % displayArtisans.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [displayArtisans.length]);

  if (loading) {
    return (
      <section id="artisans" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Meet the Hands Behind the Heritage
          </h2>
          <div className="relative overflow-hidden h-[560px]">
            <div className="flex flex-col md:flex-row items-center gap-10 animate-pulse">
              <div className="w-full md:w-1/2">
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl bg-gray-200"></div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
                <div className="h-8 bg-gray-200 rounded mb-4 w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-6"></div>
                <div className="h-16 bg-gray-200 rounded mb-6"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="artisans" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Meet the Hands Behind the Heritage
        </h2>

        <div className="relative overflow-hidden h-[560px]">
          {displayArtisans.map((artisan, index) => (
            <div
              key={artisan.id || artisan._id || index}
              className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="w-full md:w-1/2">
                  <div className="aspect-square overflow-hidden rounded-2xl shadow-xl">
                    <img 
                      src={artisan.photo || artisan.profileImage || '/api/placeholder/400/400'} 
                      alt={`Artisan ${artisan.fullName || artisan.name}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/400/400';
                      }}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full mb-4">
                    {artisan.tag || artisan.category || 'Artisan'}
                  </span>
                  <h3 className="text-3xl font-bold mb-4">
                    {artisan.fullName || artisan.name || 'Artisan'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {artisan.story || artisan.bio || 'Master craftsperson preserving traditional techniques.'}
                  </p>
                  <blockquote className="border-l-4 border-red-600 pl-4 py-2 mb-6 italic">
                    "{artisan.quote || artisan.testimonial || 'This craft is my passion and livelihood.'}"
                  </blockquote>
                  <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full">
                    Shop {(artisan.fullName || artisan.name || 'Artisan').split(' ')[0]}'s Crafts
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtisanCarousel;

