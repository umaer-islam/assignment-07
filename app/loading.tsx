export default function RootLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9faf9] animate-pulse">
      {/* Top Navbar Skeleton */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-20 items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-emerald-700/80" />
              <div className="space-y-1.5">
                <div className="h-5 w-28 rounded-md bg-stone-200" />
                <div className="h-3 w-36 rounded bg-stone-100" />
              </div>
            </div>

            {/* Auth buttons */}
            <div className="flex items-center gap-3">
              <div className="hidden h-9 w-16 rounded-lg bg-stone-100 sm:block" />
              <div className="h-9 w-20 rounded-lg bg-emerald-700/80" />
            </div>
          </div>

          {/* Category nav row */}
          <div className="flex items-center gap-3 overflow-hidden pb-2.5 pt-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-7 w-16 shrink-0 rounded-full bg-stone-100"
              />
            ))}
          </div>
        </div>
      </header>

      {/* Ticker bar skeleton */}
      <div className="border-b border-stone-200/80 bg-white py-2.5">
        <div className="flex items-center gap-8 overflow-hidden px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-stone-100" />
              <div className="h-3.5 w-24 rounded bg-stone-200/80" />
              <div className="h-3.5 w-16 rounded bg-stone-100" />
              <div className="h-3.5 w-12 rounded bg-stone-100" />
              <div className="h-1.5 w-1.5 rounded-full bg-stone-200" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Banner Card */}
        <section className="mb-8 rounded-2xl sm:rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-8 md:p-10">
          <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row md:gap-10">
            <div className="w-full max-w-xl space-y-3">
              <div className="h-5 w-32 rounded-full bg-emerald-100/70" />
              <div className="h-8 w-3/4 rounded-lg bg-stone-200 sm:h-9" />
              <div className="space-y-1.5 pt-1">
                <div className="h-3.5 w-full rounded bg-stone-100" />
                <div className="h-3.5 w-4/5 rounded bg-stone-100" />
              </div>
              <div className="pt-2">
                <div className="h-10 w-32 rounded-xl bg-emerald-700/80" />
              </div>
            </div>

            <div className="h-44 w-56 shrink-0 rounded-2xl bg-stone-100 sm:h-52 sm:w-72" />
          </div>
        </section>

        {/* Section 1: আজ দাম বেড়েছে */}
        <section className="mb-8">
          <div className="mb-3.5 flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded bg-rose-200" />
            <div className="h-4 w-32 rounded bg-stone-200" />
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={`up-${i}`} isUp />
            ))}
          </div>
        </section>

        {/* Section 2: আজ দাম কমেছে */}
        <section className="mb-8">
          <div className="mb-3.5 flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded bg-emerald-200" />
            <div className="h-4 w-32 rounded bg-stone-200" />
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={`down-${i}`} isUp={false} />
            ))}
          </div>
        </section>

        {/* Section 3: সব পণ্য */}
        <section className="pt-2">
          <div className="mb-3.5 space-y-1">
            <div className="h-5 w-24 rounded bg-stone-200" />
            <div className="h-3 w-32 rounded bg-stone-100" />
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={`all-${i}`} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer skeleton */}
      <footer className="mt-auto border-t border-stone-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-3 w-64 rounded bg-stone-200" />
          <div className="h-3 w-80 rounded bg-stone-200" />
        </div>
      </footer>
    </div>
  );
}

function ProductCardSkeleton({ isUp }: { isUp?: boolean }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs">
      {/* Top row */}
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 shrink-0 rounded-xl bg-stone-100" />
        <div className="flex-1 space-y-1.5">
          <div className="h-4 w-28 rounded bg-stone-200" />
          <div className="h-3 w-16 rounded bg-stone-100" />
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-4 flex items-end justify-between border-t border-stone-100/90 pt-3">
        <div className="space-y-1">
          <div className="h-2.5 w-14 rounded bg-stone-100" />
          <div className="h-5 w-20 rounded bg-stone-200" />
        </div>

        <div
          className={`h-5 w-14 rounded-md ${
            isUp === true
              ? "bg-rose-50 border border-rose-100/80"
              : isUp === false
              ? "bg-emerald-50 border border-emerald-100/80"
              : "bg-stone-50 border border-stone-100"
          }`}
        />
      </div>
    </div>
  );
}
