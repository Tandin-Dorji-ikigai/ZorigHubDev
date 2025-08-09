import { Star } from 'lucide-react';

const TrustIndicatorsSection = () => {
  const trustPartners = [
    "Handicraft Association of Bhutan",
    "Tourism Council of Bhutan", 
    "Kuensel",
    "BBS"
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-gray-600 text-lg font-semibold mb-12">
          Proudly Trusted By
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {trustPartners.map((partner, index) => (
            <div key={index} className="bg-white rounded-xl p-6 h-32 flex items-center justify-center shadow">
              <span className="text-lg font-bold text-center">{partner}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center">
          <div className="bg-white rounded-full px-6 py-3 mb-6">
            <span className="text-xl text-red-600 font-bold flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="ml-2 text-gray-900">Ethical Commerce Certified</span>
            </span>
          </div>

          <p className="text-gray-600 max-w-2xl text-center">
            ZorigHub has been verified by independent auditors to ensure fair trade practices, 
            direct artisan payments, and transparent social impact.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;

