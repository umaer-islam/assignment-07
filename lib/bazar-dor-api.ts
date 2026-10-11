import type { Category, Product } from "@/types/bazar-dor";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BAZAR_DOR_API_URL ??
  "https://openapi.programming-hero.com/api/bazardor";

async function fetchApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Bazar Dor API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

export function getProducts(): Promise<Product[]> {
  return fetchApi<Product[]>("/products");
}

export function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  return fetchApi<Product[]>(
    `/products?category=${encodeURIComponent(categorySlug)}`
  );
}

export function getProductById(id: number): Promise<Product> {
  return fetchApi<Product>(`/products/${id}`);
}

export function getCategories(): Promise<Category[]> {
  return fetchApi<Category[]>("/categories");
}

export function getCategoryBySlug(
  slug: string
): Promise<Category> {
  return fetchApi<Category>(
    `/categories/${encodeURIComponent(slug)}`
  );
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}
