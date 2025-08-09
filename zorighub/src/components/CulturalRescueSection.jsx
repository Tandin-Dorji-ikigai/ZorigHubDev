import woodcarvingImage from '../assets/images/crafts/woodcarving.jpg';

const CulturalRescueSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-red-600 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl p-10 shadow-2xl">
          <div className="flex items-center justify-between flex-wrap mb-8">
            <div>
              <span className="inline-block px-3 py-1 bg-red-600 text-white rounded-full mb-2 font-semibold">
                Preserve Before It Disappears
              </span>
              <h2 className="text-3xl font-bold">Lingzhi Woodcarving</h2>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full font-semibold">
                Only 2 master practitioners remain
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={woodcarvingImage} 
                  alt="Lingzhi Woodcarving"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-2xl font-bold mb-4">Cultural Significance</h3>
                <p className="text-gray-600 mb-6">
                  For over 500 years, Lingzhi woodcarving has been essential in constructing Bhutan's sacred temples. 
                  Each intricate pattern represents Buddhist cosmology and protection symbols unique to Himalayan architecture.
                </p>

                <h3 className="text-2xl font-bold mb-4">Why It's Endangered</h3>
                <p className="text-gray-600 mb-6">
                  Young generations are migrating to cities, and without apprentices, this 15th-century technique faces extinction. 
                  The specialized tools and monastic knowledge required take decades to master.
                </p>

                <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full">
                  Support This Tradition
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalRescueSection;

