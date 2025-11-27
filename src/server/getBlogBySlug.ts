'use server';

import { client } from '@/sanity/lib/client';
import { postQuery } from '@/sanity/lib/queries';

export async function getBlogBySlug(slug: string) {
  try {
    const post = await client.fetch(postQuery, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}
