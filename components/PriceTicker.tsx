import Link from "next/link";
import type { Product } from "@/types/bazar-dor";
import { formatBengaliNumber, formatPriceChange } from "@/lib/formatters";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (products.length === 0) {
    return null;
  }

  // Duplicate items to ensure a seamless infinite scrolling loop
  const tickerProducts = [...products, ...products];

  return (
    <section
      aria-label="সর্বশেষ পণ্যের বাজারদর"
      className="relative overflow-hidden border-b border-stone-200/80 bg-white text-stone-800 shadow-2xs select-none"
    >
      <style>{`
        @keyframes bazarTickerScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .bazar-ticker-track {
          display: flex !important;
          width: max-content !important;
          animation: bazarTickerScroll 45s linear infinite !important;
          will-change: transform;
        }
        .bazar-ticker-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="flex items-center">
        <div className="min-w-0 flex-1 overflow-hidden py-2.5">
          <div className="bazar-ticker-track ticker-track flex w-max items-center">
            {tickerProducts.map((product, index) => {
              const isUp = product.change?.dir === "up";
              const isDown = product.change?.dir === "down";

              return (
                <Link
                  key={`${product.id}-${index}`}
                  href={`/product/${encodeURIComponent(product.slug)}`}
                  tabIndex={index >= products.length ? -1 : undefined}
                  aria-hidden={index >= products.length ? true : undefined}
                  className="flex shrink-0 items-center gap-2 px-4 text-xs font-medium text-stone-700 transition-colors hover:text-emerald-700 focus-visible:outline-none"
                >
                  <span aria-hidden="true" className="text-sm">
                    {product.categoryIcon || product.emoji || "🛒"}
                  </span>

                  <span className="font-semibold text-stone-900">
                    {product.nameBn ?? product.name}
                  </span>

                  <span className="text-stone-500">
                    {formatBengaliNumber(product.today)} টাকা/{product.unit === "kg" ? "কেজি" : product.unit === "litre" ? "লিটার" : product.unit}
                  </span>

                  {isUp && (
                    <span className="font-semibold text-rose-600">
                      ▲ +{formatPriceChange(product.change.pct)}
                    </span>
                  )}
                  {isDown && (
                    <span className="font-semibold text-emerald-700">
                      ▼ -{formatPriceChange(product.change.pct)}
                    </span>
                  )}
                  {!isUp && !isDown && (
                    <span className="font-semibold text-stone-400">
                      — {formatPriceChange(product.change?.pct ?? 0)}
                    </span>
                  )}

                  <span
                    aria-hidden="true"
                    className="ml-3 text-stone-300 select-none"
                  >
                    •
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
