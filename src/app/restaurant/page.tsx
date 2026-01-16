import React from "react";

const RestaurantPage = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-neutral-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
          <div className="text-sm font-semibold tracking-[0.3em] uppercase">
            DANHOLT <span className="font-normal">SUITES</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/rooms" className="hover:text-white transition">Rooms</a>
            <a href="/restaurant" className="text-amber-400 hover:text-amber-300 transition">Restaurant</a>
            <a href="/facilities" className="hover:text-white transition">Facilities</a>
            <a href="/gallery" className="hover:text-white transition">Gallery</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
            <a
              href="/rooms"
              className="ml-2 inline-flex items-center rounded-full bg-amber-500 px-4 py-1.5 text-xs font-medium text-black hover:bg-amber-400 transition"
            >
              Book a Stay
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16 space-y-16">
        <section className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-400">
            Fine Dining
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold">
            Our Restaurant
          </h1>
          <p className="max-w-xl text-sm md:text-base text-neutral-300">
            Indulge in delicious Nigerian cuisines and exotic drinks, prepared fresh daily.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button className="inline-flex items-center rounded-full bg-amber-500 px-5 py-2 text-xs md:text-sm font-medium text-black hover:bg-amber-400 transition">
              Reserve a Table
            </button>
            <button className="inline-flex items-center rounded-full border border-amber-500 px-5 py-2 text-xs md:text-sm font-medium text-amber-400 hover:bg-amber-500/10 transition">
              Pre-order Food
            </button>
            <button className="inline-flex items-center rounded-full border border-neutral-700 px-5 py-2 text-xs md:text-sm font-medium text-neutral-200 hover:border-amber-500 hover:text-amber-300 transition">
              Our Menu
            </button>
            <button className="inline-flex items-center rounded-full border border-neutral-700 px-5 py-2 text-xs md:text-sm font-medium text-neutral-200 hover:border-amber-500 hover:text-amber-300 transition">
              Pre-order Food
            </button>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-amber-400">
              Culinary Delights
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Explore Our Menu
            </h2>
            <p className="max-w-xl text-sm md:text-base text-neutral-300">
              From traditional Nigerian favorites to continental dishes, our menu has something for everyone.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All items", "Starters", "Mains", "Sides", "Drinks", "Desserts"].map((c, i) => (
              <button
                key={c}
                className={
                  "inline-flex items-center rounded-full border px-4 py-1 text-xs md:text-sm transition " +
                  (i === 0
                    ? "border-amber-500 bg-amber-500/10 text-amber-300"
                    : "border-neutral-700 text-neutral-300 hover:border-amber-500 hover:text-amber-300")
                }
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 pt-2">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 transition">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">Jollof Rice</h3>
                <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-0.5 text-[11px] font-medium text-amber-300">
                  Popular
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-300">
                Signature Nigerian jollof rice with chicken.
              </p>
              <p className="mt-3 text-sm font-medium text-amber-300">
                ₦ 2,500
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 transition">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">Pounded Yam &amp; Egusi</h3>
                <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-0.5 text-[11px] font-medium text-amber-300">
                  Popular
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-300">
                Traditional pounded yam with egusi soup.
              </p>
              <p className="mt-3 text-sm font-medium text-amber-300">
                ₦ 3,000
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 transition">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">Fried Rice</h3>
              </div>
              <p className="mt-2 text-sm text-neutral-300">
                Nigerian-style fried rice with vegetables.
              </p>
              <p className="mt-3 text-sm font-medium text-amber-300">
                ₦ 2,500
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 transition">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">Grilled Fish</h3>
              </div>
              <p className="mt-2 text-sm text-neutral-300">
                Whole grilled tilapia with sides.
              </p>
              <p className="mt-3 text-sm font-medium text-amber-300">
                ₦ 4,000
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-800 bg-neutral-950">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-3">
            <div className="text-sm font-semibold tracking-[0.3em] uppercase">
              DANHOLT <span className="font-normal">SUITES</span>
            </div>
            <p className="text-neutral-300">
              Your home in Abuja. Experience comfort, privacy, and convenience at Danholt Suites – where every stay feels like coming home.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-400">
              Quick Links
            </h4>
            <div className="flex flex-col gap-1 text-neutral-300">
              <a href="/" className="hover:text-white transition">Home</a>
              <a href="/rooms" className="hover:text-white transition">Rooms</a>
              <a href="/restaurant" className="hover:text-white transition">Restaurant</a>
              <a href="/facilities" className="hover:text-white transition">Facilities</a>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-400">
              Contact
            </h4>
            <div className="text-neutral-300 space-y-1">
              <p>#3 Iyabo Okeyode Street</p>
              <p>Beside Collinear Hospital</p>
              <p>Jikwoyi Phase 3, Abuja</p>
              <a href="tel:07046080351" className="hover:text-white transition">
                07046080351
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-800 py-4 text-xs text-center text-neutral-500">
          © 2026 Danholt Suites. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default RestaurantPage;
