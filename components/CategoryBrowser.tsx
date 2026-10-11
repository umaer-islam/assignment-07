"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Category, Product } from "@/types/bazar-dor";
import { formatBengaliNumber } from "@/lib/formatters";

interface CategoryBrowserProps {
  category: Category;
  products: Product[];
}

type SortOption = "default" | "low-high" | "high-low";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "low-high", label: "দাম: কম থেকে বেশি" },
  { value: "high-low", label: "দাম: বেশি থেকে কম" },
];

export default function CategoryBrowser({
  category,
  products,
}: CategoryBrowserProps) {
  const [sort, setSort] = useState<SortOption>("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sort === "low-high") {
      list.sort((a, b) => a.today - b.today);
    } else if (sort === "high-low") {
      list.sort((a, b) => b.today - a.today);
    }
    return list;
  }, [products, sort]);

  const currentOption =
    SORT_OPTIONS.find((opt) => opt.value === sort) || SORT_OPTIONS[0];

  const categoryName = category.nameBn || category.name || category.slug;
  const categoryIcon = category.icon || "🛒";

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Category Header Card */}
      <section className="mb-4 rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f2f4f2] text-2xl sm:text-3xl select-none">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">
              {categoryName}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-500">
              {formatBengaliNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </section>

      {/* Sorting Control Bar with Modern Custom Dropdown */}
      <section className="mb-4 flex items-center justify-end rounded-2xl border border-stone-200/80 bg-white px-5 py-3.5 sm:px-6 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <span className="text-xs sm:text-sm font-medium text-stone-500 select-none">
            সাজান
          </span>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              id="category-sort-button"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2.5 rounded-xl border border-stone-200 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-stone-800 shadow-2xs hover:border-stone-300 hover:bg-stone-50/70 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            >
              <span>{currentOption.label}</span>
              <ChevronDown
                size={14}
                className={`text-stone-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180 text-emerald-700" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div
                role="listbox"
                aria-labelledby="category-sort-button"
                className="absolute right-0 top-full mt-1.5 min-w-[180px] rounded-xl border border-stone-200 bg-white p-1.5 shadow-lg z-30 transition"
              >
                {SORT_OPTIONS.map((option) => {
                  const isSelected = sort === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSort(option.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition cursor-pointer text-left ${
                        isSelected
                          ? "bg-emerald-50 text-emerald-800 font-semibold"
                          : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                      }`}
                    >
                      <span>{option.label}</span>
                      {isSelected && (
                        <Check
                          size={14}
                          className="text-emerald-700 shrink-0 ml-2"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Item Count Label */}
      <p className="mb-4 px-1 text-xs text-stone-500">
        মোট {formatBengaliNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* 3-Column Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mb-12 rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center">
          <p className="text-sm font-bold text-stone-900">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </div>
  );
}
