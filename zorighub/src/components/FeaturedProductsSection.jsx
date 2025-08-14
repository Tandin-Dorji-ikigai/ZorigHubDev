/* FeaturedProductsSection.jsx */
import React, { useEffect, useMemo, useRef, useState } from "react";
import weaveImage from "../assets/images/crafts/weave.jpg";
import silverBowlImage from "../assets/images/crafts/silver-bowl.jpg";
import altWeave from "../assets/images/crafts/weave.jpg";

const FeaturedProductsSection = () => {
  // Exactly 3 featured demo products
  const baseProducts = [
    { id: 1, name: "Bhutanese Silk Scarf", image: weaveImage },
    { id: 2, name: "Silver Offering Bowls", image: silverBowlImage },
    { id: 3, name: "Heritage Scarf (Indigo)", image: altWeave },
  ];

  // Repeat them to create a long scrolling rail
  const products = useMemo(() => {
    const list = [];
    for (let i = 0; i < 4; i++) {
      list.push(...baseProducts.map((p, k) => ({ ...p, key: `${i}-${k}` })));
    }
    return list;
  }, []);

  const railRef = useRef(null);
  const [page, setPage] = useState(0);
  const totalPages = 4;

  // Auto-scroll the rail
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const id = setInterval(() => {
      setPage((prev) => {
        const next = (prev + 1) % totalPages;
        const snapWidth = el.scrollWidth / totalPages;
        el.scrollTo({ left: next * snapWidth, behavior: "smooth" });
        return next;
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Headline */}
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 text-center">
        <h2 className="text-[clamp(1.9rem,4.8vw,3.25rem)] font-extrabold leading-tight tracking-tight">
          <span className="text-[#1C2733] block">Best Sellers</span>
          <span className="text-red-600 block">Changing Lives</span>
        </h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Curated crafts with real impact — only the standouts this week.
        </p>

        {/* Dot indicators */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition ${i === page ? "bg-red-600" : "bg-gray-300"
                }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Horizontal image rail */}
      <div className="relative">
        <div
          ref={railRef}
          className="flex gap-6 px-4 pb-24 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {products.map((p, i) => (
            <figure
              key={p.key}
              title={p.name}
              className={[
                "shrink-0 snap-start",
                "w-[220px] sm:w-[260px] md:w-[300px] h-[260px] sm:h-[300px] md:h-[340px]",
                "rounded-[28px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5",
                // gentle staggering for Pinterest vibe
                i % 3 === 0
                  ? "translate-y-2"
                  : i % 3 === 1
                    ? "-translate-y-3"
                    : "translate-y-6",
                "transition-transform duration-300 hover:-translate-y-1",
              ].join(" ")}
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.src = weaveImage)}
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        {/* Curved white mask at the bottom (like Pinterest) */}
        <svg
          className="pointer-events-none absolute inset-x-0 -bottom-1 z-20"
          viewBox="0 0 1440 140"
          height="140"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Upward curve that hides the lower part of tiles */}
          <path
            d="M0,140 C360,20 1080,20 1440,140 L1440,140 L0,140 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
