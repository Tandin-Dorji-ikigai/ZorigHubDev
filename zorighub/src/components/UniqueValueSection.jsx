const UniqueValueSection = () => {
  return (
    <section id="unique" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why ZorigHub is Different
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl text-red-600 mb-6">🏺</div>
            <h3 className="text-xl font-bold mb-4">Cultural Preservation</h3>
            <p className="text-gray-600">
              Every product documents endangered techniques with historical context to ensure Bhutanese traditions live on for generations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl text-red-600 mb-6">❤️</div>
            <h3 className="text-xl font-bold mb-4">Social Impact Engine</h3>
            <p className="text-gray-600">
              10% of your purchase funds community loans for artisans in crisis, creating a sustainable cycle of empowerment.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-5xl text-red-600 mb-6">📖</div>
            <h3 className="text-xl font-bold mb-4">Story-Driven Commerce</h3>
            <p className="text-gray-600">
              Filter by artisan hardship to support those who need it most. Know exactly whose life you're changing with each purchase.
            </p>
          </div>
        </div>

        {/* Impact Fund Visualization */}
        <div className="mt-20 bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-10">
              <h2 className="text-3xl font-bold mb-6">Your Purchase Creates Ripples of Change</h2>
              <p className="text-gray-600 mb-8">
                Every Nu. 100 spent creates a tangible impact. Here's how your support transforms lives:
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-xl">85</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Direct to Artisan</h4>
                    <p className="text-sm text-gray-500">Fair income for skills and materials</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-xl">10</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Platform Operation</h4>
                    <p className="text-sm text-gray-500">Sustainable model to help more artisans</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-xl">5</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Impact Fund</h4>
                    <p className="text-sm text-gray-500">Direct investment in artisan communities</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 bg-red-50 p-10 flex items-center">
              <div className="w-full">
                <div className="bg-white rounded-xl p-6 mb-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold">Impact Fund Distribution</h4>
                    <span className="text-red-600 font-bold">Nu. 100,000</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Emergency loans</span>
                      <span>Nu. 45,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Skill training</span>
                      <span>Nu. 30,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Equipment support</span>
                      <span>Nu. 25,000</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="font-bold mb-2">Lives Transformed This Month</h4>
                  <div className="text-3xl font-bold text-red-600">127</div>
                  <p className="text-sm text-gray-500">Artisans supported through purchases</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniqueValueSection;

