/* UniqueValueSection.jsx */
import React from "react";

// Swap with your real assets
import imgA from "../assets/images/crafts/scarf.jpg";
import imgB from "../assets/images/crafts/basket.jpg";
import imgC from "../assets/images/crafts/jewellery_1.jpg";
import imgD from "../assets/images/crafts/mask.jpg";

const UniqueValueSection = () => {
  return (
    <section
      id="unique"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#D9FAF3" }} // mint background (Pinterest vibe)
    >
      {/* Soft wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Layout: text left, collage right; stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[70vh] py-14 md:py-20">
          {/* LEFT — keep your ZorigHub copy */}
          <div className="order-2 lg:order-1">
            <h2 className="font-extrabold leading-[1.08] text-teal-900 text-[clamp(2rem,5vw,4.5rem)]">
              Why ZorigHub is Different
            </h2>

            <p className="mt-4 md:mt-6 text-[clamp(1rem,2.2vw,1.25rem)] text-teal-800/85 max-w-xl">
              Cultural preservation, a built‑in social impact engine, and
              story‑driven commerce—so every purchase sustains Bhutanese
              heritage and directly empowers artisans.
            </p>

            <div className="mt-7 md:mt-8 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="inline-flex items-center rounded-full bg-red-600 px-6 py-3 text-white text-base font-semibold hover:bg-red-700 transition"
              >
                Explore ZorigHub
              </a>
              <a
                href="#stories"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-teal-900 text-base font-semibold border border-white/0 hover:bg-white/90 transition"
              >
                Read Artisan Stories
              </a>
            </div>
          </div>

          {/* RIGHT — responsive Pinterest collage */}
          <div className="relative order-1 lg:order-2 h-[420px] sm:h-[500px] md:h-[560px] lg:h-[620px]">
            {/* MAIN large tile */}
            <figure className="absolute inset-x-auto top-0 right-[6%] w-[68%] sm:w-[60%] md:w-[58%] h-[58%] sm:h-[64%] md:h-[68%] rounded-[34px] sm:rounded-[40px] overflow-hidden shadow-2xl ring-1 ring-black/5 motion-safe:hover:scale-[1.01] transition">
              <img
                src={imgA}
                alt="Hand‑woven scarf"
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.src = "/api/placeholder/800/600")}
              />
              {/* Overlay label row (bottom-left), optional */}
              <div className="absolute inset-0 p-5 sm:p-6 flex items-end">
                <div className="flex gap-2 sm:gap-3">
                  {[imgB, imgC, imgD].map((src, i) => (
                    <div
                      key={i}
                      className="h-12 w-10 sm:h-16 sm:w-14 rounded-[16px] overflow-hidden bg-white/40 backdrop-blur shadow-md ring-1 ring-black/5"
                    >
                      <img
                        src={src}
                        alt={`thumb-${i}`}
                        className="h-full w-full object-cover"
                        onError={(e) =>
                          (e.currentTarget.src = "/api/placeholder/160/200")
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </figure>

            {/* TOP‑RIGHT small tile */}
            <figure className="absolute top-3 sm:top-4 right-0 w-[34%] sm:w-[30%] md:w-[28%] h-[28%] sm:h-[30%] md:h-[32%] rounded-[22px] sm:rounded-[28px] overflow-hidden shadow-xl ring-1 ring-black/5 motion-safe:hover:scale-[1.02] transition">
              <img
                src={imgC}
                alt="Handmade jewellery"
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.src = "/api/placeholder/400/400")}
              />
              <figcaption className="absolute inset-0 p-3 sm:p-4 flex items-end">
                <span className="text-white text-sm sm:text-base font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                  Ethical jewellery
                </span>
              </figcaption>
            </figure>

            {/* MIDDLE‑LEFT medium tile */}
            <figure className="absolute top-[46%] left-[4%] w-[46%] sm:w-[44%] md:w-[42%] h-[36%] sm:h-[38%] md:h-[40%] rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-xl ring-1 ring-black/5 motion-safe:hover:scale-[1.02] transition">
              <img
                src={imgB}
                alt="Bamboo basket"
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.src = "/api/placeholder/600/500")}
              />
              <figcaption className="absolute inset-0 p-4 sm:p-5 flex items-end">
                <span className="text-white text-lg sm:text-2xl font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                  Everyday craft,
                  <br className="hidden sm:block" /> lasting impact
                </span>
              </figcaption>
            </figure>

            {/* BOTTOM‑RIGHT small tile */}
            <figure className="absolute bottom-0 right-[14%] w-[40%] sm:w-[36%] md:w-[34%] h-[30%] sm:h-[32%] md:h-[34%] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-xl ring-1 ring-black/5 motion-safe:hover:scale-[1.02] transition">
              <img
                src={imgD}
                alt="Traditional mask"
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.src = "/api/placeholder/500/400")}
              />
              <figcaption className="absolute inset-0 p-3 sm:p-4 flex items-end">
                <span className="text-white text-base sm:text-xl font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                  Culture you can keep
                </span>
              </figcaption>
            </figure>

            {/* Decorative glow */}
            <div className="absolute -bottom-10 -left-10 h-40 w-40 sm:h-48 sm:w-48 rounded-full bg-white/30 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniqueValueSection;
