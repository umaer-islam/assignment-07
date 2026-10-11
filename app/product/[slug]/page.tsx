import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";

import { auth } from "@/lib/auth";
import {
  getCategories,
  getProductBySlug,
  getProducts,
} from "@/lib/bazar-dor-api";
import {
  formatBengaliNumber,
  formatPriceChange,
} from "@/lib/formatters";
import type { Category, Product } from "@/types/bazar-dor";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getCategoryLabel(category: Category) {
  return category.nameBn || category.name || category.slug;
}

function formatAveragePrice(min: number, max: number): string {
  const avg = (min + max) / 2;
  if (Number.isInteger(avg)) {
    return new Intl.NumberFormat("bn-BD").format(avg);
  }
  return new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(avg);
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    if (!product) {
      return { title: "পণ্য পাওয়া যায়নি | বাজার দর" };
    }
    const name = product.nameBn || product.name || "পণ্য";
    return {
      title: `${name} এর আজকের বাজারদর | বাজার দর`,
      description: `${name} এর আজকের বাজারভিত্তিক দাম, গড়, সর্বনিম্ন ও সর্বাধিক মূল্য তালিকা।`,
    };
  } catch {
    return { title: "পণ্য | বাজার দর" };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch(() => null);

  if (!session?.user) {
    redirect(`/signin?callbackUrl=/product/${encodeURIComponent(slug)}`);
  }

  const [productResult, allProductsResult, allCategoriesResult] =
    await Promise.allSettled([
      getProductBySlug(slug),
      getProducts(),
      getCategories(),
    ]);

  const product: Product | null =
    productResult.status === "fulfilled" && productResult.value
      ? productResult.value
      : null;

  if (!product) {
    notFound();
  }

  const allProducts: Product[] =
    allProductsResult.status === "fulfilled" ? allProductsResult.value : [];

  const allCategories: Category[] =
    allCategoriesResult.status === "fulfilled"
      ? allCategoriesResult.value
      : [];

  const navbarCategories = allCategories.map((cat) => ({
    slug: cat.slug,
    nameBn: getCategoryLabel(cat),
    icon: cat.icon,
  }));

  const categoryObj = allCategories.find(
    (c) => c.slug === product.category || c.id === product.category
  );
  const categoryName =
    categoryObj?.nameBn || product.categoryNameBn || product.category;

  const { dir, pct } = product.change;
  const isUp = dir === "up";
  const isDown = dir === "down";

  // Yesterday price difference
  const diffYesterday = Math.abs(product.today - product.yesterday);
  const markets = product.markets ?? [];

  // Sort markets by average price ascending to match Figma layout
  const sortedMarkets = [...markets].sort(
    (a, b) => (a.min + a.max) / 2 - (b.min + b.max) / 2
  );

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((m) => m.min))
      : product.today;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((m) => m.max))
      : product.today;

  const avgPrice =
    markets.length > 0
      ? Math.round(
          markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
            markets.length
        )
      : product.today;

  const unitLabel =
    product.unit === "kg"
      ? "কেজি"
      : product.unit === "litre"
      ? "লিটার"
      : product.unit === "hali"
      ? "হালি"
      : product.unit;

  const isImageUrl = Boolean(
    product.image &&
      (product.image.startsWith("http://") ||
        product.image.startsWith("https://") ||
        product.image.startsWith("/"))
  );

  const displayIcon =
    (!isImageUrl && product.image) ||
    product.categoryIcon ||
    product.emoji ||
    "🍚";

  return (
    <div className="flex min-h-screen flex-col bg-[#f9faf9]">
      <Navbar categories={navbarCategories} initialSession={session} />

      {allProducts.length > 0 && <PriceTicker products={allProducts} />}

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 lg:px-8">
        {/* Breadcrumb matching Figma */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-1.5 text-xs text-stone-400"
        >
          <Link
            href="/"
            className="transition hover:text-stone-700"
          >
            হোম
          </Link>
          <span className="text-stone-300">›</span>
          <Link
            href={`/category/${encodeURIComponent(product.category)}`}
            className="transition hover:text-stone-700"
          >
            {categoryName}
          </Link>
          <span className="text-stone-300">›</span>
          <span className="text-stone-600 font-normal" aria-current="page">
            {product.nameBn ?? product.name}
          </span>
        </nav>

        {/* Top Product Header Card */}
        <div className="mb-5 rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6 shadow-2xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Avatar box, Title, Subtitle, Trend */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex h-16 w-16 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#f2f4f2] text-3xl sm:text-4xl select-none overflow-hidden">
                {isImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image}
                    alt={product.nameBn ?? product.name ?? "পণ্য"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{displayIcon}</span>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
                  {product.nameBn ?? product.name}
                </h1>

                <p className="mt-0.5 text-xs text-stone-400">
                  প্রতি {unitLabel} · {categoryName}
                </p>

                <p className="mt-2 text-xs text-stone-500">
                  {isUp && (
                    <>
                      গতকালের তুলনায় আজ দাম{" "}
                      <span className="font-semibold text-stone-700">বেড়েছে</span>{" "}
                      · {formatBengaliNumber(diffYesterday)} টাকা
                    </>
                  )}
                  {isDown && (
                    <>
                      গতকালের তুলনায় আজ দাম{" "}
                      <span className="font-semibold text-stone-700">কমেছে</span>{" "}
                      · {formatBengaliNumber(diffYesterday)} টাকা
                    </>
                  )}
                  {!isUp && !isDown && (
                    <>গতকালের তুলনায় আজ দাম অপরিবর্তিত রয়েছে</>
                  )}
                </p>
              </div>
            </div>

            {/* Right: Today's Price Box */}
            <div className="rounded-2xl border border-stone-200/60 bg-[#fbfbfb] px-6 py-3.5 text-center shrink-0 min-w-[130px] w-full sm:w-auto">
              <p className="text-[11px] text-stone-400 font-medium">
                আজকের দাম
              </p>
              <p className="text-3xl font-extrabold text-stone-900 my-0.5 leading-tight">
                {formatBengaliNumber(product.today)}
              </p>
              <p className="text-[11px] text-stone-400">
                টাকা / {unitLabel}
              </p>

              <div className="mt-1">
                {isUp && (
                  <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-rose-500">
                    ▲ {formatPriceChange(pct)}
                  </span>
                )}
                {isDown && (
                  <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                    ▼ {formatPriceChange(pct)}
                  </span>
                )}
                {!isUp && !isDown && (
                  <span className="text-xs font-semibold text-stone-400">
                    — {formatPriceChange(pct)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Unified Market & Stats Card */}
        <div className="mb-10 rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-7 shadow-2xs">
          {/* Section: দামের সারসংক্ষেপ */}
          <div className="mb-8">
            <h2 className="mb-3.5 text-base font-bold text-stone-900">
              দামের সারসংক্ষেপ
            </h2>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
              {/* Lowest */}
              <div className="rounded-xl border border-stone-200/70 bg-white p-4">
                <p className="text-xs text-stone-500 font-medium">
                  সর্বনিম্ন দাম
                </p>
                <p className="my-1 text-xl font-bold text-emerald-600">
                  {formatBengaliNumber(minPrice)} টাকা
                </p>
                <p className="text-[11px] text-stone-400">
                  সবচেয়ে কম দামের বাজার
                </p>
              </div>

              {/* Highest */}
              <div className="rounded-xl border border-stone-200/70 bg-white p-4">
                <p className="text-xs text-stone-500 font-medium">
                  সর্বাধিক দাম
                </p>
                <p className="my-1 text-xl font-bold text-rose-600">
                  {formatBengaliNumber(maxPrice)} টাকা
                </p>
                <p className="text-[11px] text-stone-400">
                  সবচেয়ে বেশি দামের বাজার
                </p>
              </div>

              {/* Average */}
              <div className="rounded-xl border border-stone-200/70 bg-white p-4">
                <p className="text-xs text-stone-500 font-medium">
                  গড় দাম
                </p>
                <p className="my-1 text-xl font-bold text-emerald-700">
                  {formatBengaliNumber(avgPrice)} টাকা
                </p>
                <p className="text-[11px] text-stone-400">
                  প্রতি {unitLabel}-এর হিসাবে
                </p>
              </div>
            </div>
          </div>

          {/* Section: বাজারভিত্তিক আজকের দাম */}
          <div>
            <h2 className="mb-3.5 text-base font-bold text-stone-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            {sortedMarkets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 text-xs font-semibold text-stone-400">
                      <th scope="col" className="pb-3 text-left">বাজার</th>
                      <th scope="col" className="pb-3 text-left pl-4">বিভাগ</th>
                      <th scope="col" className="pb-3 text-right">সর্বনিম্ন</th>
                      <th scope="col" className="pb-3 text-right pl-4">সর্বাধিক</th>
                      <th scope="col" className="pb-3 text-right pl-4">গড়</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {sortedMarkets.map((m, idx) => (
                      <tr
                        key={`${m.market}-${idx}`}
                        className="transition-colors hover:bg-stone-50/50"
                      >
                        <td className="py-3.5 text-left font-medium text-stone-900">
                          {m.market}
                        </td>
                        <td className="py-3.5 text-left text-stone-600 pl-4">
                          {m.division}
                        </td>
                        <td className="py-3.5 text-right text-stone-700">
                          {formatBengaliNumber(m.min)} টাকা
                        </td>
                        <td className="py-3.5 text-right text-stone-700 pl-4">
                          {formatBengaliNumber(m.max)} টাকা
                        </td>
                        <td className="py-3.5 text-right font-bold text-stone-900 pl-4">
                          {formatAveragePrice(m.min, m.max)} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="rounded-xl bg-stone-50 p-4 text-xs text-stone-500">
                এই পণ্যের বাজারভিত্তিক বিস্তারিত তথ্য পাওয়া যায়নি।
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer categories={navbarCategories} />
    </div>
  );
}
