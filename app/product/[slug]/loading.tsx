export default function ProductLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa] animate-pulse">
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
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="mb-4 flex items-center gap-2">
          <div className="h-3.5 w-10 rounded bg-stone-200" />
          <div className="h-3 w-3 rounded bg-stone-200" />
          <div className="h-3.5 w-12 rounded bg-stone-200" />
          <div className="h-3 w-3 rounded bg-stone-200" />
          <div className="h-3.5 w-24 rounded bg-stone-200" />
        </div>

        {/* Top Product Header Card */}
        <section className="rounded-2xl border border-stone-200/80 bg-white p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 rounded-xl bg-stone-100" />
              <div className="space-y-2">
                <div className="h-7 w-48 rounded-md bg-stone-200" />
                <div className="h-4 w-28 rounded bg-stone-100" />
                <div className="h-3.5 w-40 rounded bg-stone-100" />
              </div>
            </div>

            <div className="w-40 space-y-2 rounded-xl bg-stone-50/80 p-4 border border-stone-100 sm:text-right">
              <div className="h-3 w-16 rounded bg-stone-200 sm:ml-auto" />
              <div className="h-8 w-24 rounded bg-stone-200 sm:ml-auto" />
              <div className="h-5 w-16 rounded-md bg-emerald-50 border border-emerald-100/80 sm:ml-auto" />
            </div>
          </div>
        </section>

        {/* 3 Summary Cards */}
        <section className="my-6 rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs">
          <div className="h-5 w-32 rounded bg-stone-200 mb-4" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-stone-100 bg-stone-50/60 p-4 space-y-2"
              >
                <div className="h-3 w-16 rounded bg-stone-200" />
                <div className="h-6 w-24 rounded bg-stone-200" />
                <div className="h-2.5 w-28 rounded bg-stone-100" />
              </div>
            ))}
          </div>
        </section>

        {/* Market Table Skeleton */}
        <section className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-xs">
          <div className="h-5 w-44 rounded bg-stone-200 mb-4" />
          <div className="space-y-3">
            <div className="h-10 w-full rounded-lg bg-stone-100" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-12 w-full rounded-lg border border-stone-100 bg-white px-4 flex items-center justify-between"
              >
                <div className="h-4 w-24 rounded bg-stone-200" />
                <div className="h-4 w-20 rounded bg-stone-100" />
                <div className="h-4 w-16 rounded bg-stone-200" />
                <div className="h-4 w-16 rounded bg-stone-200" />
                <div className="h-4 w-16 rounded bg-stone-200" />
              </div>
            ))}
          </div>
        </section>
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
