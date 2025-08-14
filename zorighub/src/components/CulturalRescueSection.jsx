/* CulturalRescueSection.jsx */
import React from "react";
import woodcarvingImage from "../assets/images/crafts/woodcarving.jpg";

const CulturalRescueSection = () => {
  return (
    <section className="relative min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* Left: Full-bleed image */}
        <div className="relative">
          <img
            src={woodcarvingImage}
            alt="Lingzhi woodcarving artisan at work"
            className="h-[46vh] lg:h-full w-full object-cover bg-no-repeat bg-center"
          />
          {/* Soft edge fade on large screens */}
          <div className="hidden lg:block absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white/0 to-white/70" />
        </div>

        {/* Right: White background with content */}
        <div className="flex items-center justify-center px-6 sm:px-10 bg-white">
          <div className="w-full max-w-xl text-center">

            {/* Eyebrow / tag */}
            <span
              className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold mb-4"
              style={{ backgroundColor: "#FC2839", color: "white" }}
            >
              Preserve Before It Disappears
            </span>

            {/* Heading */}
            <h2
              className="font-extrabold leading-[1.05] mb-4"
              style={{
                color: "#D92231",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
              }}
            >
              Lingzhi woodcarving needs you
            </h2>

            {/* Subcopy */}
            <p
              className="mx-auto mb-8"
              style={{
                color: "#333333",
                fontSize: "clamp(1rem, 2.1vw, 1.25rem)",
              }}
            >
              The best part of ZorigHub is discovering endangered crafts and the
              artisans keeping them alive—then helping them thrive.
            </p>

            {/* Stat pill */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: "#FC2839" }}
                />
                Only 2 master practitioners remain
              </span>
            </div>

            {/* CTA */}
            <a
              href="#support"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-semibold shadow-md transition-colors"
              style={{ backgroundColor: "#FC2839" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e02232")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FC2839")}
            >
              Explore & Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalRescueSection;
