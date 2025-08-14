import { useEffect, useMemo, useState } from "react";
import { useArtisans } from "../hooks/useProducts";
import pemaImage from "../assets/images/people/pema.jpg";
import tsheringImage from "../assets/images/people/tshering.jpg";
import karmaImage from "../assets/images/people/karma.jpg";

const ArtisanPinterestHero = () => {
  const { artisans, loading } = useArtisans();
  const [items, setItems] = useState([]);

  const fallback = [
    {
      id: 0,
      fullName: "Pema Wangmo",
      tag: "Single mother of three",
      photo: pemaImage,
      story:
        "Specializing in hand‑woven silk textiles using techniques passed down through five generations.",
    },
    {
      id: 1,
      fullName: "Sangay Dorji",
      tag: "Disability artisan",
      photo: tsheringImage,
      story:
        "Masters the intricate art of silver filigree; his works adorn altars and royal palaces in Bhutan.",
    },
    {
      id: 2,
      fullName: "Tashi Dorji",
      tag: "Flood survivor",
      photo: karmaImage,
      story:
        "Revives traditional bamboo craftwork after floods; each piece reflects cultural resilience.",
    },
  ];

  useEffect(() => {
    if (loading) return;
    if (artisans && artisans.length) {
      const three = artisans.slice(0, 3).map((a, i) => ({
        id: a.id || a._id || i,
        fullName: a.fullName || a.name || fallback[i]?.fullName,
        tag: a.tag || a.category || fallback[i]?.tag || "Artisan",
        photo: a.photo || a.profileImage || fallback[i]?.photo,
        story:
          a.story ||
          a.bio ||
          a.description ||
          fallback[i]?.story ||
          "Master craftsperson preserving traditional techniques.",
      }));
      setItems(three);
    } else {
      setItems(fallback);
    }
  }, [artisans, loading]);

  return (
    <section
      id="artisans"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FFF7AD" }} // Pinterest-like soft yellow
    >
      {/* Subtle gradient wash for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[72vh] py-16 md:py-24">
          {/* LEFT: Overlapping rounded tiles (Pinterest vibe) */}
          <div className="relative order-2 lg:order-1 h-[460px] md:h-[520px] lg:h-[560px]">
            {/* Big back tile */}
            <figure className="absolute left-0 top-6 md:top-8 w-[62%] md:w-[55%] h-[58%] md:h-[62%] rounded-[32px] overflow-hidden shadow-xl ring-1 ring-black/5 bg-white">
              <img
                src={items[0]?.photo}
                alt={items[0]?.fullName || "Artisan"}
                className="h-full w-full object-cover"
              />
             
            </figure>

            {/* Middle tile (on top, slightly right, taller) */}
            <figure className="absolute right-2 md:right-6 top-0 w-[56%] md:w-[48%] h-[66%] md:h-[70%] rounded-[34px] overflow-hidden shadow-2xl ring-1 ring-black/5 rotate-2 bg-white">
              <img
                src={items[1]?.photo}
                alt={items[1]?.fullName || "Artisan"}
                className="h-full w-full object-cover"
              />
            
            </figure>

            {/* Front tile (lower, centered) */}
            <figure className="absolute left-8 md:left-16 bottom-0 w-[62%] md:w-[58%] h-[54%] md:h-[56%] rounded-[36px] overflow-hidden shadow-2xl ring-1 ring-black/5 -rotate-2 bg-white">
              <img
                src={items[2]?.photo}
                alt={items[2]?.fullName || "Artisan"}
                className="h-full w-full object-cover"
              />

            </figure>
          </div>

          {/* RIGHT: Headline & copy (Pinterest style) */}
          <div className="order-1 lg:order-2">
            <h2 className="font-playfair text-4xl md:text-6xl font-extrabold leading-tight text-[#9C123A]">
              Meet the Hands<br className="hidden sm:block" />
              Behind the Heritage
            </h2>

            <p className="mt-4 md:mt-6 text-lg md:text-xl text-[#5B2A36] max-w-xl">
              Discover Bhutanese handicrafts you’ll love—hand‑woven textiles, bamboo craft,
              and intricate filigree. Each piece sustains culture and uplifts its maker.
            </p>

            {/* Minimal CTA row */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/shop"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
              >
                Shop Crafts
              </a>
              <a
                href="#stories"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold text-[#9C123A] bg-white hover:bg-white/90 border border-white/0 transition-colors shadow-sm"
              >
                Explore Stories
              </a>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanPinterestHero;
