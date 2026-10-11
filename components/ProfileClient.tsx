"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Edit3, Mail, User as UserIcon } from "lucide-react";
import { signOut } from "@/lib/auth-client";

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

  return (
    <div className="w-full">
      {/* Page Title & Subtitle */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
          আমার প্রোফাইল
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-500">
          আপনার অ্যাকাউন্টের বিবরণ ও ব্যক্তিগত তথ্য এখানে দেখতে পাবেন।
        </p>
      </div>

      {/* Card 1: User Overview with Sign Out */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
          className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl border border-rose-300 hover:border-rose-400 bg-white hover:bg-rose-50/60 text-rose-600 text-xs sm:text-sm font-medium transition cursor-pointer shadow-2xs"
        >
          <span className="text-rose-500 font-bold">←</span>
          <span>সাইন আউট</span>
        </button>
      </div>

      {/* Card 2: Account Details & Update Action (C3 requirement) */}
      <div className="mt-5 bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h3 className="text-sm sm:text-base font-bold text-stone-900">
            ব্যক্তিগত তথ্য
          </h3>

          {/* C3: Update button navigating to /profile/update */}
          <Link
            href="/profile/update"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition shadow-2xs cursor-pointer"
          >
            <Edit3 size={13} />
            <span>তথ্য আপডেট করুন</span>
          </Link>
        </div>

        <div className="space-y-3.5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50/80 border border-stone-200/60">
            <UserIcon size={16} className="text-stone-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-stone-400">নাম</p>
              <p className="text-xs sm:text-sm font-semibold text-stone-800 truncate">
                {user.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50/80 border border-stone-200/60">
            <Mail size={16} className="text-stone-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-stone-400">ইমেইল</p>
              <p className="text-xs sm:text-sm font-semibold text-stone-800 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
