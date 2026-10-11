"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut, User } from "lucide-react";
import { getBengaliCurrentDate } from "@/lib/formatters";
import { signOut, useSession } from "@/lib/auth-client";

export interface NavbarCategory {
  slug: string;
  nameBn: string;
  icon?: string;
}

export interface NavbarSessionUser {
  id?: string;
  name?: string;
  email?: string;
  image?: string | null;
}

export interface NavbarSession {
  user: NavbarSessionUser;
  session?: unknown;
}

export interface NavbarProps {
  categories?: NavbarCategory[];
  initialSession?: NavbarSession | null;
}

const emptySubscribe = () => () => {};

export default function Navbar({
  categories = [],
  initialSession = null,
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: clientSession } = useSession();
  const session = clientSession !== undefined ? clientSession : initialSession;
  const user = session?.user;

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const date = useSyncExternalStore(
    emptySubscribe,
    getBengaliCurrentDate,
    () => ""
  );

  const isCategoryActive = (slug: string) =>
    pathname === `/category/${slug}`;

  async function handleSignOut() {
    setUserMenuOpen(false);
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex min-h-20 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="বাজার দর হোম পেজ"
            className="flex shrink-0 items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 p-2 shadow-xs">
              <Image
                src="/images/logo-icon.png"
                alt=""
                width={36}
                height={36}
                className="h-6 w-6 object-contain brightness-0 invert"
                priority
              />
            </span>

            <span className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-stone-900 sm:text-2xl">
                বাজার দর
              </span>

              <span className="mt-0.5 text-xs text-stone-500">
                {date || "প্রতিদিনের বাজারদর"}
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* User Session State */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50/80 py-1.5 pl-1.5 pr-3 text-xs sm:text-sm font-semibold text-stone-800 transition hover:bg-stone-100 cursor-pointer"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white overflow-hidden">
                    {user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user.name?.slice(0, 1).toUpperCase() || "U"
                    )}
                  </span>
                  <span className="max-w-[100px] truncate sm:max-w-none">
                    {user.name}
                  </span>
                  <ChevronDown size={14} className="text-stone-500" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-stone-200 bg-white py-2 shadow-lg z-50">
                    <div className="border-b border-stone-100 px-4 py-2">
                      <p className="truncate text-xs font-bold text-stone-900">
                        {user.name}
                      </p>
                      <p className="truncate text-[11px] text-stone-500">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-50"
                    >
                      <User size={14} />
                      আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 text-left cursor-pointer"
                    >
                      <LogOut size={14} />
                      লগআউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="inline-flex items-center rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-stone-700 transition hover:bg-stone-100 sm:px-3 sm:py-2"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-emerald-800 sm:px-4 sm:py-2.5"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Category navigation */}
        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-2.5 pt-1 sm:mx-0 sm:px-0 text-xs sm:text-sm"
        >
          {categories.map((category) => {
            const active = isCategoryActive(category.slug);

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 font-medium transition ${
                  active
                    ? "bg-emerald-800 text-white font-bold shadow-xs"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {category.icon && (
                  <span aria-hidden="true">{category.icon}</span>
                )}

                {category.nameBn}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
