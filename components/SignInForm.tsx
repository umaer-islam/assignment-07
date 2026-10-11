"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);

  function handleDisabledSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast("ইমেইল ও পাসওয়ার্ড লগইন সাময়িকভাবে স্থগিত রয়েছে। দয়া করে Google বা GitHub ব্যবহার করুন।", {
      icon: "ℹ️",
      duration: 4000,
    });
  }

  async function handleSocialLogin(provider: "google" | "github") {
    setSocialLoading(provider);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: callbackUrl || "/",
        errorCallbackURL: "/signin",
      });
    } catch {
      toast.error(
        `দুঃখিত, ${provider === "google" ? "Google" : "GitHub"} লগইন শুরু করা যায়নি। আবার চেষ্টা করুন।`
      );
    } finally {
      setSocialLoading(null);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title & Subtitle */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">
          সাইন ইন
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-stone-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Card matching Figma */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-xs">
        <form onSubmit={handleDisabledSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="signin-email"
              className="block text-xs font-semibold text-stone-700 mb-1.5"
            >
              ইমেইল
            </label>
            <input
              id="signin-email"
              type="email"
              disabled
              placeholder="you@example.com"
              className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-3.5 py-2.5 text-xs sm:text-sm text-stone-700 placeholder:text-stone-400 cursor-not-allowed focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="signin-password"
              className="block text-xs font-semibold text-stone-700 mb-1.5"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="signin-password"
              type="password"
              disabled
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-xl border border-stone-200 bg-stone-50/60 px-3.5 py-2.5 text-xs sm:text-sm text-stone-700 placeholder:text-stone-400 cursor-not-allowed focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm transition-colors shadow-2xs mt-2 cursor-pointer"
          >
            সাইন ইন
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200" />
          </div>
          <div className="relative flex justify-center text-[11px]">
            <span className="bg-white px-3 text-stone-400">অথবা</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={socialLoading !== null}
            className="flex items-center justify-center gap-1.5 w-full py-2.5 px-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-[11px] sm:text-xs font-medium text-stone-700 transition shadow-2xs cursor-pointer disabled:opacity-60"
          >
            <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {socialLoading === "google" ? "প্রবেশ হচ্ছে..." : "Google দিয়ে চালিয়ে যান"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            disabled={socialLoading !== null}
            className="flex items-center justify-center gap-1.5 w-full py-2.5 px-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-[11px] sm:text-xs font-medium text-stone-700 transition shadow-2xs cursor-pointer disabled:opacity-60"
          >
            <GitHubIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {socialLoading === "github" ? "প্রবেশ হচ্ছে..." : "GitHub দিয়ে চালিয়ে যান"}
            </span>
          </button>
        </div>

        {/* Bottom Link inside card */}
        <div className="mt-5 text-center text-xs text-stone-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-emerald-700 font-semibold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      {/* Back to Home Link below card */}
      <div className="mt-4 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-700 transition"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
