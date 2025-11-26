import { groq } from 'next-sanity';
// Get all highlighted posts
export const highlightedPostsQuery = groq`*[_type == "post" && highlight == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  publishedAt,
  categories[]-> {
    _id,
    title
  }
}`;

// Query to get all blog posts
export const allPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  publishedAt,
  categories[]-> {
    _id,
    title
  },
  body
}`;

// Query to get paginated blog posts
export const paginatedPostsQuery = groq`*[_type == "post"] | order(publishedAt desc) [$start...$end] {
  _id,
  title,
  slug,
  mainImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  publishedAt,
  categories[]-> {
    _id,
    title
  },
  body
}`;

// Query to get total count of blog posts
export const postsCountQuery = groq`count(*[_type == "post"])`;

// Query to get a single blog post by slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  body,
  mainImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  publishedAt,
  categories[]-> {
    _id,
    title
  }
}`;

// Query to get all categories
export const categoriesQuery = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug
}`;

// Query to get all photos under a category (by category slug)
export const photosByCategoryQuery = groq`*[_type == "photo" && category->slug.current == $slug] | order(_createdAt desc) {
  _id,
  title,
  image {
    asset-> {
      _id,
      url
    },
    caption,
    credit
  },
  altText,
  category-> {
    _id,
    title,
    slug
  },
  tags
}`;

// Query to get all photo categories
export const photoCategoriesQuery = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  "photoCount": count(*[_type == "photo" && category->_id == ^._id])
}`;
