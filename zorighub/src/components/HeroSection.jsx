import React from "react";
import landingImage from "../assets/images/landing.jpg";
// Add a few more local images for the collage (replace with your assets)
import img1 from "../assets/images/crafts/basket.jpg";
import img2 from "../assets/images/crafts/scarf.jpg";
import img3 from "../assets/images/crafts/bowl.jpg";
import img4 from "../assets/images/crafts/mask.jpg";
import img5 from "../assets/images/crafts/woodwork.jpg";
import img6 from "../assets/images/crafts/painting.jpg";

const HeroSection = () => {
  // 3-column collage (Pinterest-like)
  const colA = [landingImage, img1, img2];
  const colB = [img3, img4, img5];
  const colC = [img6, img2, img1];

  return (
    <section className="relative min-h-[84vh] md:min-h-screen flex items-center overflow-hidden">
      {/* Background (subtle) */}
      <div className="absolute inset-0 -z-10">
        <img
          src={landingImage}
          alt=""
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-white" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-20 md:pt-28 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Copy + Search + CTAs */}
          <div>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold tracking-tight text-[#1C2733]">
              Preserve Traditions, <br className="hidden sm:block" />
              Transform Lives
            </h1>

            <p className="mt-4 md:mt-6 text-lg md:text-xl text-[#475569] max-w-xl">
              Discover Bhutanese handicrafts with purpose—every purchase sustains
              cultural heritage and empowers artisans.
            </p>

            {/* CTAs */}
            <div className="mt-5 md:mt-6 flex flex-wrap gap-3">
              <a
                href="/shop"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
              >
                Shop Crafts with Meaning
              </a>
              <a
                href="#stories"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 transition-colors shadow-sm"
              >
                Explore Artisan Stories
              </a>
            </div>
          </div>

          {/* Right: Pinterest-like collage */}
          <div className="pointer-events-none select-none hidden lg:block">
            <div className="mx-auto w-full max-w-2xl">
              <div className="grid grid-cols-3 gap-4">
                {/* Column A */}
                <div className="space-y-4 translate-y-6">
                  {colA.map((src, i) => (
                    <figure
                      key={`a-${i}`}
                      className="overflow-hidden rounded-3xl shadow-md"
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                      />
                    </figure>
                  ))}
                </div>

                {/* Column B (taller) */}
                <div className="space-y-4 -translate-y-2">
                  {colB.map((src, i) => (
                    <figure
                      key={`b-${i}`}
                      className="overflow-hidden rounded-3xl shadow-md"
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                      />
                    </figure>
                  ))}
                </div>

                {/* Column C */}
                <div className="space-y-4 translate-y-10">
                  {colC.map((src, i) => (
                    <figure
                      key={`c-${i}`}
                      className="overflow-hidden rounded-3xl shadow-md"
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                      />
                    </figure>
                  ))}
                </div>
              </div>

              {/* Soft gradient fade at bottom to keep it clean */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
