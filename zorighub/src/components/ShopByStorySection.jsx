/* ShopByStorySection.jsx */
import React from "react";

// Replace with your real assets
import img1 from "../assets/images/crafts/basket.jpg";
import img2 from "../assets/images/crafts/scarf.jpg";
import img3 from "../assets/images/crafts/bowl.jpg";
import img4 from "../assets/images/crafts/mask.jpg";
import img5 from "../assets/images/crafts/woodwork.jpg";
import img6 from "../assets/images/crafts/painting.jpg";

const ShopByStorySection = () => {
  return (
    <section
      id="shop"
      className="relative overflow-hidden bg-[#F1F1F1] min-h-screen flex items-center"
    >
      {/* Floating tiles - hidden on mobile */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {/* LEFT COLUMN */}
        <figure className="absolute left-6 lg:left-16 top-10 w-[140px] lg:w-[180px] h-[190px] lg:h-[240px] rounded-[28px] overflow-hidden shadow-xl">
          <img src={img1} alt="" className="h-full w-full object-cover" />
        
        </figure>

        <figure className="absolute left-[140px] lg:left-[220px] top-[120px] w-[110px] lg:w-[140px] h-[130px] lg:h-[160px] rounded-[22px] overflow-hidden shadow-lg">
          <img src={img2} alt="" className="h-full w-full object-cover" />
        </figure>

        <figure className="absolute left-[70px] lg:left-[130px] top-[300px] w-[150px] lg:w-[190px] h-[160px] lg:h-[200px] rounded-[26px] overflow-hidden shadow-lg">
          <img src={img3} alt="" className="h-full w-full object-cover" />
        </figure>

        {/* RIGHT COLUMN */}
        <figure className="absolute right-8 lg:right-20 top-10 w-[150px] lg:w-[190px] h-[170px] lg:h-[220px] rounded-[26px] overflow-hidden shadow-xl">
          <img src={img4} alt="" className="h-full w-full object-cover" />
        </figure>

        <figure className="absolute right-[190px] lg:right-[260px] top-[130px] w-[120px] lg:w-[150px] h-[120px] lg:h-[150px] rounded-[24px] overflow-hidden shadow-lg">
          <img src={img5} alt="" className="h-full w-full object-cover" />
        </figure>

        <figure className="absolute right-[110px] lg:right-[180px] top-[320px] w-[160px] lg:w-[200px] h-[160px] lg:h-[200px] rounded-[28px] overflow-hidden shadow-lg">
          <img src={img6} alt="" className="h-full w-full object-cover" />
       

        </figure>
      </div>

      {/* Center text */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] leading-tight font-extrabold text-white-600 drop-shadow-sm text-center">
            Shop by Story, Not Just Product
          </h2>


          <p className="mt-4 text-[clamp(1.1rem,2vw,1.25rem)] text-gray-700 max-w-2xl mx-auto">
            Connect with the lives you’re transforming through every purchase
          </p>

          <div className="mt-8">
            <a
              href="#impact"
              className="inline-flex items-center rounded-full bg-red-600 px-8 py-3 text-white text-[15px] md:text-base font-semibold hover:bg-red-700 shadow-lg transition"
            >
              Begin Your Impact Journey
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-white/50" />
    </section>
  );
};

export default ShopByStorySection;
