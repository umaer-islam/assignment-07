import Link from "next/link";
import type { Product } from "@/types/bazar-dor";
import {
  formatBengaliNumber,
  formatBengaliUnit,
  formatPriceChange,
} from "@/lib/formatters";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dir, pct } = product.change;

  const isUp = dir === "up";
  const isDown = dir === "down";

  const isImageUrl = Boolean(
    product.image &&
      (product.image.startsWith("http://") ||
        product.image.startsWith("https://") ||
        product.image.startsWith("/"))
  );

  const displayIcon =
    (!isImageUrl && product.image) || product.categoryIcon || product.emoji || "🍚";

  return (
    <Link
      href={`/product/${encodeURIComponent(product.slug)}`}
      aria-label={`${product.nameBn ?? product.name}, ${formatBengaliNumber(product.today)} টাকা`}
      className="group flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
    >
      {/* Top row: Avatar + Name & Unit */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f2f4f2] text-2xl transition-transform group-hover:scale-105 select-none overflow-hidden">
          {isImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.nameBn ?? product.name ?? "পণ্য"}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{displayIcon}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
            {product.nameBn ?? product.name}
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            {formatBengaliUnit(product.unit)}
          </p>
        </div>
      </div>

      {/* Bottom row: Today's Price & Trend Movement */}
      <div className="mt-4 flex items-end justify-between border-t border-stone-100/90 pt-3">
        <div>
          <p className="text-[11px] font-medium text-stone-400">
            আজকের দাম
          </p>
          <p className="text-base font-extrabold text-stone-900">
            {formatBengaliNumber(product.today)} টাকা
          </p>
        </div>

        <div>
          {isUp && (
            <span className="inline-flex items-center gap-0.5 rounded-md bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600 border border-rose-100/80">
              <span aria-hidden="true">▲</span> {formatPriceChange(pct)}
            </span>
          )}
          {isDown && (
            <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100/80">
              <span aria-hidden="true">▼</span> {formatPriceChange(pct)}
            </span>
          )}
          {!isUp && !isDown && (
            <span className="inline-flex items-center gap-0.5 rounded-md bg-stone-50 px-2 py-0.5 text-xs font-semibold text-stone-400 border border-stone-100">
              <span aria-hidden="true">—</span> {formatPriceChange(pct)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
