import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth";
import { getCategories, getProducts } from "@/lib/bazar-dor-api";
import type { Category, Product } from "@/types/bazar-dor";

const QUICK_CATEGORIES = [
  { slug: "chal", nameBn: "চাল", icon: "🍚" },
  { slug: "dal", nameBn: "ডাল", icon: "🥩" },
  { slug: "tel", nameBn: "তেল", icon: "🥫" },
  { slug: "sobji", nameBn: "সবজি", icon: "🥦" },
  { slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { slug: "dim-dudh", nameBn: "ডিম-দুধ", icon: "🥛" },
  { slug: "moshla", nameBn: "মসলা", icon: "🌶️" },
];

export default async function NotFound() {
  const [session, productsResult, categoriesResult] = await Promise.all([
    auth.api
      .getSession({
        headers: await headers(),
      })
      .catch(() => null),
    getProducts().then(
      (v) => ({ status: "fulfilled" as const, value: v }),
      (e) => ({ status: "rejected" as const, reason: e })
    ),
    getCategories().then(
      (v) => ({ status: "fulfilled" as const, value: v }),
      (e) => ({ status: "rejected" as const, reason: e })
    ),
  ]);

  const products: Product[] =
    productsResult.status === "fulfilled" ? productsResult.value : [];

  const categories: Category[] =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : [];

  const navbarCategories = categories.map((cat) => ({
    slug: cat.slug,
    nameBn: cat.nameBn || cat.name || cat.slug,
    icon: cat.icon,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-[#f9faf9]">
      <Navbar categories={navbarCategories} initialSession={session} />

      {products.length > 0 && <PriceTicker products={products} />}

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex items-center justify-center">
        <div className="w-full max-w-2xl rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-10 md:p-12 text-center shadow-xs">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 border border-emerald-100">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            ৪০৪ ত্রুটি • পৃষ্ঠা পাওয়া যায়নি
          </div>

          {/* Big Number Illustration */}
          <div className="my-5 select-none">
            <span className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-stone-200 font-mono">
              ৪<span className="text-emerald-700">০</span>৪
            </span>
          </div>

          {/* Title & Description */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 tracking-tight">
            হায়! পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm text-stone-500 leading-relaxed max-w-lg mx-auto">
            আপনি যে ঠিকানাটিতে যাওয়ার চেষ্টা করছেন তা পরিবর্তিত হয়েছে, পণ্যটি সরানো হয়েছে, অথবা ঠিকানা টাইপ করতে ভুল হতে পারে।
          </p>

          {/* Functional Actions */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-emerald-800 shadow-2xs"
            >
              <Home size={16} />
              মূল পাতায় ফিরে যান
            </Link>

            <Link
              href="/#সব-পণ্য"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-stone-700 transition hover:bg-stone-50 hover:border-stone-300 shadow-2xs"
            >
              <Compass size={16} />
              সব পণ্যের বাজারদর
            </Link>
          </div>

          {/* Meaningful Quick Navigation (Popular Categories) */}
          <div className="mt-10 border-t border-stone-100 pt-8 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3 text-center">
              জনপ্রিয় ক্যাটাগরিগুলো এক নজরে
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {QUICK_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="flex items-center gap-2 rounded-xl border border-stone-200/80 bg-stone-50/60 p-2.5 text-xs font-medium text-stone-700 transition hover:border-emerald-300 hover:bg-white hover:text-emerald-800 hover:shadow-2xs"
                >
                  <span className="text-lg">{cat.icon}</span>
                  <span className="truncate">{cat.nameBn}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer categories={navbarCategories} />
    </div>
  );
}
