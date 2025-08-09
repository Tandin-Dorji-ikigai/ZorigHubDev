import grannyImage from '../assets/images/people/granny.jpg';

const StoryDiscoverySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden">
          <img 
            src={grannyImage} 
            alt="Artisan group" 
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
          <div className="absolute bottom-0 left-0 right-0 p-10 text-white text-center">
            <p className="text-xl md:text-3xl font-bold mb-8">
              Every Stitch Has a Story. Every Purchase Writes a New Chapter.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full">
                Explore Heartfelt Stories
              </button>
              <button className="px-8 py-3 bg-white hover:bg-gray-100 text-red-600 font-bold rounded-full">
                Shop with Purpose
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryDiscoverySection;

