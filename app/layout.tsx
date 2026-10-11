import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর | নিত্যপ্রয়োজনীয় বাজারদর এক নজরে",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর, দামের পরিবর্তন ও বিস্তারিত বাজার বিশ্লেষণ।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        {children}
      </body>
    </html>
  );
}
