import Link from 'next/link';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-zinc-900 p-6 ring-1 ring-zinc-800">
            <FileQuestion className="h-16 w-16 text-orange-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-6xl font-bold text-white">404</h1>
        <h2 className="mb-6 text-2xl font-semibold text-zinc-300">
          Blog Post Not Found
        </h2>

        {/* Description */}
        <p className="mb-8 max-w-md text-zinc-400">
          The blog post you're looking for doesn't exist or has been removed.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-6 py-3 font-medium text-white transition-all hover:border-zinc-700 hover:bg-zinc-800/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-all hover:bg-orange-600"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
