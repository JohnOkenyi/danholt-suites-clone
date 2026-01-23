import React from "react";

const RestaurantPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-white">
      {/* HERO SECTION (Kept from Root for the Image) */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage:
              "url(\"https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600\")",
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-neutral-950" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 gap-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 border border-white/25 backdrop-blur-md">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-300">
              Fine Dining
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl">
            Our Restaurant
          </h1>
          <p className="max-w-2xl text-lg text-neutral-200 leading-relaxed">
            Indulge in delicious Nigerian cuisines and exotic drinks, prepared fresh daily.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT (From Src for better components) */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 space-y-16 -mt-20 relative z-20">

        {/* Menu Section */}
        <section className="bg-neutral-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Explore Our Menu</h2>
                <p className="text-neutral-400 text-sm mt-1">Authentic tastes, curated for you.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-amber-500 text-black text-sm font-semibold rounded-full hover:bg-amber-400 transition">
                  Reserve Table
                </button>
                <button className="px-6 py-2 border border-white/20 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition">
                  Pre-order
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {["All items", "Starters", "Mains", "Sides", "Drinks", "Desserts"].map((c, i) => (
                <button
                  key={c}
                  className={
                    "inline-flex items-center rounded-full border px-4 py-1.5 text-xs md:text-sm transition " +
                    (i === 0
                      ? "border-amber-500 bg-amber-500/10 text-amber-300"
                      : "border-neutral-700 text-neutral-300 hover:border-amber-500 hover:text-amber-300")
                  }
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {/* Item 1 */}
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 hover:border-amber-500/50 hover:bg-white/10 transition group">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold group-hover:text-amber-300 transition">Jollof Rice</h3>
                  <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-0.5 text-[11px] font-medium text-amber-300">
                    Popular
                  </span>
                </div>
                <p className="mt-2 text-sm text-neutral-400">
                  Signature Nigerian jollof rice with chicken.
                </p>
                <p className="mt-3 text-lg font-medium text-amber-400">
                  ₦ 2,500
                </p>
              </div>

              {/* Item 2 */}
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 hover:border-amber-500/50 hover:bg-white/10 transition group">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold group-hover:text-amber-300 transition">Pounded Yam &amp; Egusi</h3>
                  <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-0.5 text-[11px] font-medium text-amber-300">
                    Popular
                  </span>
                </div>
                <p className="mt-2 text-sm text-neutral-400">
                  Traditional pounded yam with egusi soup.
                </p>
                <p className="mt-3 text-lg font-medium text-amber-400">
                  ₦ 3,000
                </p>
              </div>

              {/* Item 3 */}
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 hover:border-amber-500/50 hover:bg-white/10 transition group">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold group-hover:text-amber-300 transition">Fried Rice</h3>
                </div>
                <p className="mt-2 text-sm text-neutral-400">
                  Nigerian-style fried rice with vegetables.
                </p>
                <p className="mt-3 text-lg font-medium text-amber-400">
                  ₦ 2,500
                </p>
              </div>

              {/* Item 4 */}
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5 hover:border-amber-500/50 hover:bg-white/10 transition group">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold group-hover:text-amber-300 transition">Grilled Fish</h3>
                </div>
                <p className="mt-2 text-sm text-neutral-400">
                  Whole grilled tilapia with sides.
                </p>
                <p className="mt-3 text-lg font-medium text-amber-400">
                  ₦ 4,000
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RestaurantPage;
