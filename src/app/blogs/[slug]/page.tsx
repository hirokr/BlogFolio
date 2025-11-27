import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { getBlogBySlug } from '@/server/getBlogBySlug';
import { urlFor } from '@/sanity/lib/image';
import { PortableTextComponents } from '@/components/PortableTextComponents';
import Header from '@/components/Header';
import { Calendar, Tag, ArrowLeft, Clock } from 'lucide-react';

// Enable Partial Prerendering for this page
export const experimental_ppr = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const imageUrl = post.mainImage?.asset?.url
    ? urlFor(post.mainImage.asset.url).width(1200).height(630).url()
    : null;

  return {
    title: post.title || 'Blog Post',
    description: post.mainImage?.alt || `Read ${post.title} on our blog`,
    openGraph: {
      title: post.title || 'Blog Post',
      description: post.mainImage?.alt || `Read ${post.title} on our blog`,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'article',
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title || 'Blog Post',
      description: post.mainImage?.alt || `Read ${post.title} on our blog`,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-24 rounded bg-zinc-800" />
          <div className="h-12 w-3/4 rounded bg-zinc-800" />
          <div className="flex gap-4">
            <div className="h-6 w-32 rounded bg-zinc-800" />
            <div className="h-6 w-32 rounded bg-zinc-800" />
          </div>
          <div className="aspect-video w-full rounded-xl bg-zinc-800" />
          <div className="space-y-4">
            <div className="h-4 w-full rounded bg-zinc-800" />
            <div className="h-4 w-full rounded bg-zinc-800" />
            <div className="h-4 w-3/4 rounded bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

async function BlogPostContent({ slug }: { slug: string }) {
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.mainImage?.asset?.url
    ? urlFor(post.mainImage.asset.url).width(1200).height(630).url()
    : null;

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  // Calculate estimated reading time (average 200 words per minute)
  const wordCount = post.body
    ? JSON.stringify(post.body).split(/\s+/).length
    : 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black pt-20">
        {/* pt-20 for header spacing */}
        {/* Back Button */}
        <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>
          </div>
        </div>

        {/* Article */}
        <article className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-12">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {post.categories.map(category => (
                  <span
                    key={category._id}
                    className="flex items-center gap-1 rounded-full bg-orange-500/20 px-4 py-1.5 text-sm font-medium text-orange-400 ring-1 ring-orange-500/30"
                  >
                    <Tag className="h-3 w-3" />
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="mb-6 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400">
              {formattedDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>{formattedDate}</time>
                </div>
              )}
              {readingTime > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{readingTime} min read</span>
                </div>
              )}
            </div>

            {/* Highlighted Badge */}
            {post.highlight && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                ⭐ Highlighted Post
              </div>
            )}
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <div className="mb-12">
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
                <Image
                  src={imageUrl}
                  alt={post.mainImage?.alt || post.title || 'Blog post image'}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg mx-auto max-w-none">
            {post.body && (
              <PortableText
                value={post.body}
                components={PortableTextComponents}
              />
            )}
          </div>

          {/* Footer */}
          <footer className="mt-16 border-t border-zinc-800 pt-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-6 py-3 font-medium text-white transition-all hover:border-zinc-700 hover:bg-zinc-800/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Blogs
            </Link>
          </footer>
        </article>
      </div>
    </>
  );
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent slug={slug} />
    </Suspense>
  );
}

// Generate static params for all blog posts (optional, for static generation)
export async function generateStaticParams() {
  // This can be implemented to pre-render blog posts at build time
  return [];
}
