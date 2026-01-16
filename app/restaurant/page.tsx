import React from "react";

const RestaurantPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white">
      {/* HERO */}
      <section className="relative w-full h-[72vh] md:h-[80vh] overflow-hidden">
        {/* Background image (hallway-like) */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url(\"https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600\")",
          }}
        />
        {/* Dark gradient overlay from top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/60 to-black/90" />

        {/* Top nav overlay */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 pt-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-[22px] font-extrabold tracking-[0.22em] text-amber-300">
              DANHOLT
            </span>
            <span className="text-[22px] font-semibold tracking-[0.18em]">
              SUITES
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-10 text-sm font-semibold">
            <a href="/" className="hover:text-white transition">
              Home
            </a>
            <a href="/rooms" className="hover:text-white transition">
              Rooms
            </a>
            <a
              href="/restaurant"
              className="text-amber-300 border-b-2 border-amber-300 pb-1"
            >
              Restaurant
            </a>
            <a href="/facilities" className="hover:text-white transition">
              Facilities
            </a>
            <a href="/gallery" className="hover:text-white transition">
              Gallery
            </a>
            <a href="/contact" className="hover:text-white transition">
              Contact
            </a>
          </nav>

          {/* Book a Stay button */}
          <a
            href="/rooms"
            className="hidden md:inline-flex items-center rounded-full bg-amber-400 px-7 py-2.5 text-xs font-semibold text-black shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:bg-amber-300 transition"
          >
            Book a Stay
            <span className="ml-1 text-lg">›</span>
          </a>
        </div>

        {/* Hero centered content */}
        <div className="relative z-10 max-w-4xl mx-auto h-full px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center gap-5">
          {/* Fine Dining pill */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 border border-white/25 backdrop-blur-md">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-black text-sm">
              🍽
            </span>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-100">
              Fine Dining
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-[40px] md:text-[64px] lg:text-[72px] font-extrabold leading-tight drop-shadow-[0_6px_30px_rgba(0,0,0,0.85)]">
            Our Restaurant
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl text-sm md:text-lg text-neutral-100/95 leading-relaxed">
            Indulge in delicious Nigerian cuisines and exotic drinks, prepared
            fresh daily.
          </p>

          {/* CTA buttons */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <button className="inline-flex items-center justify-center rounded-full bg-amber-400 px-10 py-3 text-sm md:text-base font-semibold text-black shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:bg-amber-300 transition transform hover:-translate-y-0.5">
              Reserve a Table
              <span className="ml-2 text-lg">›</span>
            </button>
            <button className="inline-flex items-center justify-center rounded-full bg-white/10 px-10 py-3 text-sm md:text-base font-semibold text-white border border-white/30 hover:bg-white/16 transition">
              Pre-order Food
            </button>
          </div>
        </div>
      </section>

      {/* Tabs strip under hero */}
      <section className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-wrap border-b border-neutral-200 text-sm md:text-base font-semibold">
            <button className="px-4 md:px-6 py-4 text-amber-500 border-b-4 border-amber-500">
              Our Menu
            </button>
            <button className="px-4 md:px-6 py-4 text-neutral-500 hover:text-neutral-800">
              Pre-order Food
            </button>
          </div>
        </div>
      </section>

      {/* Simple menu grid */}
      <section className="w-full bg-neutral-50 pb-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-8">
          <div className="flex flex-wrap gap-3 mb-6 text-xs md:text-sm">
            {["All", "Starters", "Mains", "Sides", "Drinks", "Desserts"].map(
              (c, i) => (
                <button
                  key={c}
                  className={
                    "rounded-full px-4 py-1.5 border transition " +
                    (i === 0
                      ? "bg-amber-400 text-black border-amber-400"
                      : "bg-white text-neutral-700 border-neutral-200 hover:border-amber-400")
                  }
                >
                  {c}
                </button>
              )
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white shadow-sm border border-neutral-200 p-5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Jollof Rice
                </h3>
                <span className="rounded-full bg-amber-100 text-amber-600 text-xs font-semibold px-3 py-0.5">
                  Popular
                </span>
              </div>
              <p className="text-sm text-neutral-600">
                Signature Nigerian jollof rice with chicken.
              </p>
              <p className="mt-3 text-sm font-semibold text-neutral-900">
                ₦ 2,500
              </p>
            </div>

            <div className="rounded-2xl bg-white shadow-sm border border-neutral-200 p-5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-lg font-semibold text-neutral-900">
                  Pounded Yam &amp; Egusi
                </h3>
                <span className="rounded-full bg-amber-100 text-amber-600 text-xs font-semibold px-3 py-0.5">
                  Popular
                </span>
              </div>
              <p className="text-sm text-neutral-600">
                Traditional pounded yam with egusi soup.
              </p>
              <p className="mt-3 text-sm font-semibold text-neutral-900">
                ₦ 3,000
              </p>
            </div>

            <div className="rounded-2xl bg-white shadow-sm border border-neutral-200 p-5">
              <h3 className="text-lg font-semibold text-neutral-900">
                Fried Rice
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Nigerian-style fried rice with vegetables.
              </p>
              <p className="mt-3 text-sm font-semibold text-neutral-900">
                ₦ 2,500
              </p>
            </div>

            <div className="rounded-2xl bg-white shadow-sm border border-neutral-200 p-5">
              <h3 className="text-lg font-semibold text-neutral-900">
                Grilled Fish
              </h3>
              <p className="mt-1 text-sm text-neutral-600">
                Whole grilled tilapia with sides.
              </p>
              <p className="mt-3 text-sm font-semibold text-neutral-900">
                ₦ 4,000
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantPage;
