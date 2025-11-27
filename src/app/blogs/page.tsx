import { Suspense } from 'react';
import { Metadata } from 'next';
import { getBlogs } from '@/server/getBlogs';
import BlogGrid, { BlogGridSkeleton } from '@/components/BlogGrid';
import Pagination from '@/components/Pagination';
import Header from '@/components/Header';
import { BookOpen, Sparkles } from 'lucide-react';

// Enable Partial Prerendering for this page
export const experimental_ppr = true;

export const metadata: Metadata = {
  title: 'Blog | Ankita Dey',
  description:
    'Explore articles, tutorials, and insights on web development, design, and technology. Discover stories and technical deep-dives.',
  openGraph: {
    title: 'Blog | Ankita Dey',
    description:
      'Explore articles, tutorials, and insights on web development, design, and technology.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Ankita Dey',
    description:
      'Explore articles, tutorials, and insights on web development, design, and technology.',
  },
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

async function BlogContent({ page }: { page: number }) {
  const { posts, totalPages, currentPage } = await getBlogs(page);

  return (
    <>
      <BlogGrid posts={posts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

const Blogs = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black pt-20">
        {/* pt-20 for header spacing */}
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent" />
          <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <div className="mb-6 flex items-center justify-center gap-3">
                <BookOpen className="h-12 w-12 text-orange-400" />
                <h1 className="text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
                  Blog
                </h1>
              </div>
              <p className="mx-auto max-w-2xl text-lg text-zinc-400 sm:text-xl">
                Thoughts, tutorials, and insights on web development, design,
                and technology. Discover stories and technical deep-dives.
              </p>
              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-zinc-500">
                <Sparkles className="h-4 w-4 text-orange-400" />
                <span>Highlighted posts appear first</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid Section */}
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <Suspense key={page} fallback={<BlogGridSkeleton />}>
            <BlogContent page={page} />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default Blogs;
