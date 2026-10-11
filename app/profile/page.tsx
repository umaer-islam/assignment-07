import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ProfileClient from "@/components/ProfileClient";
import { auth } from "@/lib/auth";
import { getCategories, getProducts } from "@/lib/bazar-dor-api";
import type { Category, Product } from "@/types/bazar-dor";

export const metadata: Metadata = {
  title: "আমার প্রোফাইল | বাজার দর",
  description: "আপনার বাজার দর অ্যাকাউন্টের বিবরণ ও প্রোফাইল তথ্য।",
};

function getCategoryLabel(category: Category) {
  return category.nameBn || category.name || category.slug;
}

export default async function ProfilePage() {
  const session = await auth.api
    .getSession({
      headers: await headers(),
    })
    .catch(() => null);

  if (!session?.user) {
    redirect("/signin?callbackUrl=/profile");
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
      <Navbar categories={navbarCategories} initialSession={session} />

      {products.length > 0 && <PriceTicker products={products} />}

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <ProfileClient user={session.user} />
      </main>

      <Footer />
    </div>
  );
}
