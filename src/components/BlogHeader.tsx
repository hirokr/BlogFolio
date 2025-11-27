import Link from 'next/link';
import { Home, BookOpen } from 'lucide-react';

export default function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-lg">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo / Home Link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-white transition-colors hover:text-orange-400"
        >
          <Home className="h-5 w-5" />
          <span className="hidden sm:inline">Home</span>
        </Link>

        {/* Blog Title */}
        <div className="flex items-center gap-2 text-zinc-400">
          <BookOpen className="h-5 w-5" />
          <span className="font-semibold">Blog</span>
        </div>

        {/* Optional: Add more navigation items here */}
      </nav>
    </header>
  );
}
