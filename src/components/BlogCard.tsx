import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Calendar, Tag } from 'lucide-react';

interface BlogCardProps {
  post: {
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
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.mainImage?.asset?.url
    ? urlFor(post.mainImage.asset.url).width(800).height(400).url()
    : '/Images/default-blog.jpg';

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No date';

  return (
    <Link
      href={`/blogs/${post.slug?.current || ''}`}
      className="group relative block h-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:shadow-2xl hover:shadow-zinc-900/50"
    >
      {/* Highlighted Badge */}
      {post.highlight && (
        <div className="absolute top-4 left-4 z-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          ⭐ Highlighted
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-zinc-800">
        <Image
          src={imageUrl}
          alt={post.mainImage?.alt || post.title || 'Blog post image'}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {post.categories.slice(0, 2).map(category => (
              <span
                key={category._id}
                className="flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300"
              >
                <Tag className="h-3 w-3" />
                {category.title}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-orange-400">
          {post.title || 'Untitled Post'}
        </h3>

        {/* Date */}
        <div className="mb-4 flex items-center gap-2 text-sm text-zinc-400">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>

        {/* Excerpt - Only visible on hover */}
        <div className="max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-20">
          <p className="line-clamp-3 text-sm text-zinc-400">
            {post.excerpt || 'Click to read more about this post...'}
          </p>
        </div>

        {/* Read More Arrow */}
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-orange-400 transition-transform group-hover:translate-x-2">
          Read More
          <span className="text-lg">→</span>
        </div>
      </div>
    </Link>
  );
}
