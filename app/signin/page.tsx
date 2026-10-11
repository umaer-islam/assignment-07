import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import SignInForm from "@/components/SignInForm";
import { getCategories, getProducts } from "@/lib/bazar-dor-api";
import type { Category, Product } from "@/types/bazar-dor";

export const metadata: Metadata = {
  title: "সাইন ইন | বাজার দর",
  description: "বাজার দর অ্যাকাউন্টে সাইন ইন করুন।",
};

function getCategoryLabel(category: Category) {
  return category.nameBn || category.name || category.slug;
}

export default async function SignInPage() {
  const [productsResult, categoriesResult] = await Promise.allSettled([
    getProducts(),
    getCategories(),
  ]);

  const products: Product[] =
    productsResult.status === "fulfilled" ? productsResult.value : [];

  const categories: Category[] =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : [];

  const navbarCategories = categories.map((cat) => ({
    slug: cat.slug,
    nameBn: getCategoryLabel(cat),
    icon: cat.icon,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      <Navbar categories={navbarCategories} />

      {products.length > 0 && <PriceTicker products={products} />}

      <main className="flex-1 flex flex-col justify-center py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="mx-auto w-full max-w-md h-96 animate-pulse rounded-2xl bg-stone-100" />
          }
        >
          <SignInForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
