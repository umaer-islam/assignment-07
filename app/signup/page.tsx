import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import SignUpForm from "@/components/SignUpForm";
import { auth } from "@/lib/auth";
import { getCategories, getProducts } from "@/lib/bazar-dor-api";
import type { Category, Product } from "@/types/bazar-dor";

export const metadata: Metadata = {
  title: "অ্যাকাউন্ট তৈরি করুন | বাজার দর",
  description: "বাজার দর-এ একটি নতুন অ্যাকাউন্ট তৈরি করুন।",
};

function getCategoryLabel(category: Category) {
  return category.nameBn || category.name || category.slug;
}

export default async function SignUpPage() {
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch(() => null);

  if (session?.user) {
    redirect("/profile");
  }
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
          <SignUpForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
