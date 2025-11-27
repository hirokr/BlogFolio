'use server';

import { client } from '@/sanity/lib/client';
import {
  paginatedPostsWithExcerptQuery,
  postsCountQuery,
} from '@/sanity/lib/queries';

const POSTS_PER_PAGE = 10;

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

export async function getBlogs(page: number = 1) {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  try {
    const [posts, totalCount] = await Promise.all([
      client.fetch<BlogPost[]>(paginatedPostsWithExcerptQuery, {
        start,
        end,
      }),
      client.fetch<number>(postsCountQuery),
    ]);

    return {
      posts,
      totalCount,
      totalPages: Math.ceil(totalCount / POSTS_PER_PAGE),
      currentPage: page,
      postsPerPage: POSTS_PER_PAGE,
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw new Error('Failed to fetch blogs');
  }
}
