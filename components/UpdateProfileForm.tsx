"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface UpdateProfileFormProps {
  user: {
    id?: string;
    name?: string;
    email?: string;
    image?: string | null;
  };
}

export default function UpdateProfileForm({ user }: UpdateProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নামের ঘরটি পূরণ করুন।");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
      } else {
        toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch {
      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Back button */}
      <div className="mb-4">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition"
        >
          <ArrowLeft size={14} />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-xs">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
            তথ্য আপডেট করুন
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের ঘরে নতুন নাম লিখুন।
          </p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="update-name-input"
              className="block text-xs font-semibold text-stone-700 mb-2"
            >
              নাম (Name)
            </label>
            <input
              id="update-name-input"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার পুরো নাম লিখুন"
              disabled={loading}
              className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label
              htmlFor="profile-email-readonly"
              className="block text-xs font-semibold text-stone-700 mb-2"
            >
              ইমেইল (Email)
            </label>
            <input
              id="profile-email-readonly"
              type="email"
              disabled
              value={user.email || ""}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/70 px-3.5 py-2.5 text-xs sm:text-sm text-stone-500 cursor-not-allowed outline-none"
            />
            <p className="mt-1 text-[11px] text-stone-400">
              নিরাপত্তার স্বার্থে ইমেইল পরিবর্তন করা যাবে না।
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm transition shadow-2xs mt-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? "আপডেট হচ্ছে..." : "Update Information"}
          </button>
        </form>
      </div>
    </div>
  );
}
