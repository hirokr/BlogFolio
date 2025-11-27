import { BookOpen } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      {/* Hero Section Skeleton */}
      <div className="border-b border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <BookOpen className="h-12 w-12 animate-pulse text-orange-400" />
              <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
                Blog
              </h1>
            </div>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400 sm:text-xl">
              Loading amazing content...
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid Skeleton */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[400px] animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/50"
            >
              <div className="h-48 w-full rounded-t-xl bg-zinc-800/50" />
              <div className="space-y-3 p-6">
                <div className="h-4 w-1/3 rounded bg-zinc-800/50" />
                <div className="h-6 w-full rounded bg-zinc-800/50" />
                <div className="h-4 w-2/3 rounded bg-zinc-800/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
