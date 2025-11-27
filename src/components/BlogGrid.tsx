import BlogCard from '@/components/BlogCard';

interface BlogPost {
  _id: string;
  title?: string;
  slug?: {
    current?: string;
  };
  mainImage?: {
    asset?: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  publishedAt?: string;
  highlight?: boolean;
  categories?: Array<{
    _id: string;
    title?: string;
  }>;
  excerpt?: string;
}

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-[400px] animate-pulse rounded-xl bg-zinc-800/50"
        >
          <div className="h-48 w-full bg-zinc-700/50" />
          <div className="space-y-3 p-6">
            <div className="h-4 w-1/3 rounded bg-zinc-700/50" />
            <div className="h-6 w-full rounded bg-zinc-700/50" />
            <div className="h-4 w-2/3 rounded bg-zinc-700/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
        <div className="mb-4 text-6xl">📝</div>
        <h3 className="mb-2 text-2xl font-bold text-white">No Posts Yet</h3>
        <p className="text-zinc-400">
          Check back soon for new blog posts and updates.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  );
}
