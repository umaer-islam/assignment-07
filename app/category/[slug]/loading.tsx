export default function CategoryLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f9faf9] animate-pulse">
      {/* Top Navbar Skeleton */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-20 items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-emerald-700/80" />
              <div className="space-y-1.5">
                <div className="h-5 w-28 rounded-md bg-stone-200" />
                <div className="h-3 w-36 rounded bg-stone-100" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-20 rounded-lg bg-emerald-700/80" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex-1 w-full">
        {/* Category Header Card Skeleton */}
        <section className="mb-4 rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-stone-100 shrink-0" />
            <div className="space-y-2">
              <div className="h-6 w-32 rounded bg-stone-200" />
              <div className="h-4 w-48 rounded bg-stone-100" />
            </div>
          </div>
        </section>

        {/* Sorting Bar Skeleton */}
        <section className="mb-4 flex items-center justify-end rounded-2xl border border-stone-200/80 bg-white px-5 py-3.5 sm:px-6 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="h-4 w-10 rounded bg-stone-200" />
            <div className="h-8 w-24 rounded-xl bg-stone-100" />
          </div>
        </section>

        {/* Count Label Skeleton */}
        <div className="mb-4 px-1">
          <div className="h-3.5 w-36 rounded bg-stone-200" />
        </div>

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-4 shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 shrink-0 rounded-xl bg-stone-100" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-28 rounded bg-stone-200" />
                  <div className="h-3 w-16 rounded bg-stone-100" />
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between border-t border-stone-100/90 pt-3">
                <div className="space-y-1">
                  <div className="h-2.5 w-14 rounded bg-stone-100" />
                  <div className="h-5 w-20 rounded bg-stone-200" />
                </div>
                <div className="h-5 w-14 rounded-md bg-stone-100" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="mt-auto border-t border-stone-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-3 w-64 rounded bg-stone-200" />
          <div className="h-3 w-80 rounded bg-stone-200" />
        </div>
      </footer>
    </div>
  );
}
