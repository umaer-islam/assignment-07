import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import CategoryBrowser from "@/components/CategoryBrowser";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth";

import {
  getCategories,
  getCategoryBySlug,
  getProducts,
  getProductsByCategory,
} from "@/lib/bazar-dor-api";
import type { Category, Product } from "@/types/bazar-dor";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getCategoryLabel(category: Category) {
  return category.nameBn || category.name || category.slug;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategoryBySlug(slug);
    if (!category) {
      return { title: "ক্যাটাগরি পাওয়া যায়নি | বাজার দর" };
    }
    const name = getCategoryLabel(category);
    return {
      title: `${name} এর বাজারদর | বাজার দর`,
      description: `${name} পণ্যের আজকের বাজারদর এবং মূল্য তালিকা।`,
    };
  } catch {
    return { title: "ক্যাটাগরি | বাজার দর" };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [session, categoryResult, productsResult, allCategoriesResult, allProductsResult] =
    await Promise.all([
      auth.api
        .getSession({
          headers: await headers(),
        })
        .catch(() => null),
      getCategoryBySlug(slug).then(
        (v) => ({ status: "fulfilled" as const, value: v }),
        (e) => ({ status: "rejected" as const, reason: e })
      ),
      getProductsByCategory(slug).then(
        (v) => ({ status: "fulfilled" as const, value: v }),
        (e) => ({ status: "rejected" as const, reason: e })
      ),
      getCategories().then(
        (v) => ({ status: "fulfilled" as const, value: v }),
        (e) => ({ status: "rejected" as const, reason: e })
      ),
      getProducts().then(
        (v) => ({ status: "fulfilled" as const, value: v }),
        (e) => ({ status: "rejected" as const, reason: e })
      ),
    ]);

  const category: Category | null =
    categoryResult.status === "fulfilled" ? categoryResult.value : null;

  if (!category) {
    notFound();
  }

  const products: Product[] =
    productsResult.status === "fulfilled" ? productsResult.value : [];

  const allCategories: Category[] =
    allCategoriesResult.status === "fulfilled"
      ? allCategoriesResult.value
      : [];

  const allProducts: Product[] =
    allProductsResult.status === "fulfilled" ? allProductsResult.value : [];

  const navbarCategories = allCategories.map((cat) => ({
    slug: cat.slug,
    nameBn: getCategoryLabel(cat),
    icon: cat.icon,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f7f4]">
      <Navbar categories={navbarCategories} initialSession={session} />

      {allProducts.length > 0 && <PriceTicker products={allProducts} />}

      <main className="flex-1">
        <CategoryBrowser category={category} products={products} />
      </main>

      <Footer categories={navbarCategories} />
    </div>
  );
}
