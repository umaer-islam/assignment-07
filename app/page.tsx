import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import ProductBrowser from "@/components/ProductBrowser";
import Footer from "@/components/Footer";

import { getCategories, getProducts } from "@/lib/bazar-dor-api";
import type { Category, Product } from "@/types/bazar-dor";

function getCategoryLabel(category: Category) {
  return category.nameBn || category.name || category.slug;
}

export default async function HomePage() {

  const [productsResult, categoriesResult] = await Promise.allSettled([
    getProducts(),
    getCategories(),
  ]);

  const products: Product[] =
    productsResult.status === "fulfilled" ? productsResult.value : [];

  const categories: Category[] =
    categoriesResult.status === "fulfilled"
      ? categoriesResult.value
      : [];

  const apiFailed =
    productsResult.status === "rejected" ||
    categoriesResult.status === "rejected";

  const navbarCategories = categories.map((category) => ({
    slug: category.slug,
    nameBn: getCategoryLabel(category),
    icon: category.icon,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-[#f9faf9]">
      <Navbar categories={navbarCategories} />

      {products.length > 0 && <PriceTicker products={products} />}

      {apiFailed && (
        <div
          role="status"
          className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            কিছু বাজারতথ্য লোড করা যায়নি। নিচে পাওয়া তথ্য দেখানো হয়েছে।
            অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
          </div>
        </div>
      )}

      <main className="flex-1">
        <ProductBrowser products={products} />
      </main>

      <Footer categories={navbarCategories} />
    </div>
  );
}
