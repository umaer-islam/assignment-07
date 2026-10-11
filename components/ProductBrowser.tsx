"use client";

import { useMemo, useSyncExternalStore } from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/bazar-dor";
import { formatBengaliNumber, getBengaliCurrentDate } from "@/lib/formatters";

interface ProductBrowserProps {
  products: Product[];
}

const emptySubscribe = () => () => {};

export default function ProductBrowser({ products }: ProductBrowserProps) {
  const currentDate = useSyncExternalStore(
    emptySubscribe,
    getBengaliCurrentDate,
    () => ""
  );

  const risers = useMemo(
    () =>
      products
        .filter((product) => product.change?.dir === "up")
        .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
        .slice(0, 6),
    [products]
  );

  const fallers = useMemo(
    () =>
      products
        .filter((product) => product.change?.dir === "down")
        .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
        .slice(0, 6),
    [products]
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero Banner */}
      <section className="mb-8 rounded-2xl sm:rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-2xs">
        <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row md:gap-10">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-semibold text-emerald-800">
              {currentDate || "আজকের বাজারদর"}
            </span>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-stone-500 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন ও সর্বাধিক দাম এক নজরে জানুন।
            </p>

            <div className="mt-5">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-emerald-800 shadow-2xs"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center">
            <Image
              src="/images/bazar-hero.png"
              alt="নিত্যপ্রয়োজনীয় পণ্যের ঝুড়ি"
              width={360}
              height={260}
              priority
              className="h-auto w-56 sm:w-72 max-w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* Section 1: আজ দাম বেড়েছে */}
      {risers.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3.5 flex items-center gap-1.5 text-sm sm:text-base font-bold text-stone-900">
            <span className="text-rose-500 text-xs font-black" aria-hidden="true">
              ▲
            </span>
            <span>আজ দাম বেড়েছে</span>
          </h2>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section 2: আজ দাম কমেছে */}
      {fallers.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3.5 flex items-center gap-1.5 text-sm sm:text-base font-bold text-stone-900">
            <span className="text-emerald-600 text-xs font-black" aria-hidden="true">
              ▼
            </span>
            <span>আজ দাম কমেছে</span>
          </h2>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section 3: সব পণ্য (All Products, no extra elements) */}
      <section id="সব-পণ্য" className="scroll-mt-24 pt-2">
        <div className="mb-3.5">
          <h2 className="text-base sm:text-lg font-bold text-stone-900">
            সব পণ্য
          </h2>
          <p className="mt-0.5 text-xs text-stone-400">
            মোট পণ্য সংখ্যা : {formatBengaliNumber(products.length)}টি
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
