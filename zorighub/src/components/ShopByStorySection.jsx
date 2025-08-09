const ShopByStorySection = () => {
  const storyCategories = [
    {
      emoji: "♿",
      title: "Support Disability Artisans",
      description: "Showcase extraordinary skills overcoming physical challenges"
    },
    {
      emoji: "🆘",
      title: "Save Endangered Crafts",
      description: "Rescue traditions with fewer than 5 practitioners"
    },
    {
      emoji: "👩‍👧‍👦",
      title: "Empower Single Parents",
      description: "Support families where craft is the sole income"
    },
    {
      emoji: "🌧️",
      title: "Rebuild After Disasters",
      description: "Help artisans recover from natural calamities"
    }
  ];

  return (
    <section id="shop" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Shop by Story, Not Just Product
        </h2>
        <p className="text-xl text-center text-gray-600 mb-16">
          Connect with the lives you're transforming through every purchase
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {storyCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 text-center shadow-sm border border-gray-200 hover:shadow-lg transition-all craft-item"
            >
              <div className="text-5xl mb-4">{category.emoji}</div>
              <h3 className="text-xl font-bold mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-6 text-sm">{category.description}</p>
              <button className="px-4 py-2 bg-white border border-red-600 text-red-600 text-sm rounded-full w-full hover:bg-red-50 transition-colors">
                View Crafts
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full text-lg shadow-lg">
            Begin Your Impact Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopByStorySection;

