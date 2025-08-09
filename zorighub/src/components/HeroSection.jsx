import landingImage from '../assets/images/landing.jpg';

const HeroSection = () => {
  return (
    <section className="hero-bg relative min-h-screen flex items-center pt-16">
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img src={landingImage} className="min-w-full min-h-full object-cover" alt="Landing background" />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-playfair">
            Preserve Traditions, Transform Lives
          </h1>
          <p className="text-xl md:text-2xl text-white mt-4 mb-10">
            Discover Bhutanese handicrafts with purpose - where every purchase sustains cultural heritage and empowers artisans
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold rounded-full text-lg">
              Shop Crafts with Meaning
            </button>
            <button className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-full text-lg">
              Explore Artisan Stories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

