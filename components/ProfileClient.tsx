"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, signOut } from "@/lib/auth-client";

interface ProfileClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
    }
  }

  async function handleUpdateName(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করতে সমস্যা হয়েছে।");
      } else {
        toast.success("নাম সফলভাবে আপডেট করা হয়েছে!");
        router.refresh();
      }
    } catch {
      toast.error("নাম আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* Page Title & Subtitle */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Card 1: User Overview with Sign Out */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200/80 flex items-center justify-center">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl sm:text-2xl font-bold text-emerald-800">
                {user.name?.slice(0, 1).toUpperCase() || "U"}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 truncate">
              {user.name}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 truncate mt-0.5">
              {user.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="shrink-0 inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl border border-rose-300 hover:border-rose-400 bg-white hover:bg-rose-50/60 text-rose-600 text-xs sm:text-sm font-medium transition cursor-pointer shadow-2xs"
        >
          <span className="text-rose-500 font-bold">←</span>
          <span>সাইন আউট</span>
        </button>
      </div>

      {/* Card 2: Information & Name Update Form */}
      <div className="mt-5 bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs">
        <h3 className="text-sm sm:text-base font-bold text-stone-900 mb-4">
          তথ্য
        </h3>

        <form onSubmit={handleUpdateName} className="space-y-4">
          <div>
            <label
              htmlFor="profile-name-input"
              className="block text-xs font-semibold text-stone-700 mb-2"
            >
              নাম
            </label>
            <input
              id="profile-name-input"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm transition-colors shadow-2xs mt-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
}
