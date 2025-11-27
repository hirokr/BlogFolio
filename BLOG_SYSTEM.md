# Blog System Documentation

## Overview

A modern, performant blog system built with Next.js 16, Sanity CMS, and Partial Prerendering (PPR). Features pagination, highlighted posts, responsive card layouts, and SEO optimization.

## Features

### ✨ Main Features

- **📄 Pagination**: 10 posts per page with elegant page navigation
- **⭐ Highlighted Posts**: Featured posts appear first with special badges
- **🎨 Card Layout**: Beautiful card design with hover effects
- **👁️ Excerpt on Hover**: Shows first 120 characters on hover
- **🚀 Partial Prerendering (PPR)**: Optimal performance with Suspense
- **📱 Responsive Design**: Mobile-first, works on all devices
- **🔍 SEO Optimized**: Meta tags, OpenGraph, and Twitter cards
- **⚡ Modern Routing**: Clean slug-based URLs

### 🎯 User Experience

- Smooth hover animations
- Category tags
- Reading time estimates
- Formatted publish dates
- Beautiful image galleries
- Rich text formatting with PortableText
- Loading skeletons for better perceived performance
- Custom 404 pages

## File Structure

```
src/
├── app/
│   └── blogs/
│       ├── page.tsx              # Main blog listing page
│       ├── loading.tsx           # Loading state
│       └── [slug]/
│           ├── page.tsx          # Individual blog post
│           └── not-found.tsx     # 404 page
├── components/
│   ├── BlogCard.tsx              # Blog post card component
│   ├── BlogGrid.tsx              # Grid layout with skeleton
│   ├── Pagination.tsx            # Pagination controls
│   └── PortableTextComponents.tsx # Rich text rendering
├── server/
│   ├── getBlogs.ts               # Fetch paginated blogs
│   └── getBlogBySlug.ts          # Fetch single blog
└── sanity/
    └── lib/
        └── queries.ts            # Sanity GROQ queries
```

## Key Components

### BlogCard

Displays individual blog post preview with:

- Cover image with hover scale effect
- Title with color transition
- Categories (up to 2 shown)
- Published date
- Highlighted badge (if applicable)
- Excerpt reveal on hover (120 characters)
- Read more arrow with slide animation

### BlogGrid

Renders collection of blog cards in responsive grid:

- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop
- Empty state for no posts
- Loading skeleton animation

### Pagination

Smart pagination with:

- Previous/Next buttons
- Page numbers with ellipsis for large ranges
- Current page highlighting
- Disabled state styling
- URL parameter updates

### PortableTextComponents

Rich text rendering with custom styles:

- Headings (h1-h4)
- Paragraphs
- Lists (bullet & numbered)
- Blockquotes
- Links (internal & external)
- Images with captions
- Inline code
- Bold, italic, emphasis

## Data Fetching

### Server Actions

**getBlogs(page)**

- Fetches 10 posts per page
- Orders by highlighted first, then date
- Returns posts, total count, total pages
- Includes 120-char excerpt

**getBlogBySlug(slug)**

- Fetches single post by slug
- Returns null if not found
- Includes full body content

### Sanity Queries

**paginatedPostsWithExcerptQuery**

```groq
*[_type == "post"] | order(highlight desc, publishedAt desc) [$start...$end] {
  _id, title, slug, mainImage, publishedAt, highlight, categories,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..120], "")
}
```

**postQuery**

```groq
*[_type == "post" && slug.current == $slug][0]{
  _id, title, slug, body, mainImage, publishedAt, categories
}
```

## Partial Prerendering (PPR)

### Configuration

**next.config.ts**

```typescript
experimental: {
  ppr: 'incremental';
}
```

**Route Segments**

```typescript
export const experimental_ppr = true;
```

### How It Works

1. Static parts render immediately (header, layout)
2. Dynamic parts (blog content) load with Suspense
3. Optimal blend of static and dynamic content
4. Faster initial page loads
5. SEO benefits with dynamic data

## SEO Features

### Meta Tags

- Dynamic title and description
- OpenGraph tags for social sharing
- Twitter card support
- Article structured data
- Dynamic OG images from Sanity

### URL Structure

```
/blogs              # Main listing
/blogs?page=2       # Page 2
/blogs/my-post      # Individual post
```

## Styling

### Design System

- **Colors**: Zinc scale with orange accents
- **Fonts**: Poppins, Courier Prime, Cutive Mono
- **Gradients**: Subtle backgrounds with zinc
- **Borders**: 1px zinc-800 with hover states
- **Shadows**: Depth with zinc-900 shadows
- **Animations**: Smooth transitions (300ms)

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Performance Optimizations

1. **Image Optimization**: Next.js Image component with Sanity CDN
2. **Code Splitting**: Dynamic imports where beneficial
3. **Suspense Boundaries**: Granular loading states
4. **Streaming**: PPR for progressive rendering
5. **Static Params**: Pre-render popular posts
6. **Font Optimization**: Variable fonts preloaded

## Usage

### View Blog List

Navigate to `/blogs` to see all posts with pagination.

### Read a Post

Click any card or navigate to `/blogs/[slug]` directly.

### Navigate Pages

Use pagination controls at bottom of listing.

### Highlighted Posts

Posts with `highlight: true` in Sanity appear first with ⭐ badge.

## Customization

### Change Posts Per Page

Edit `POSTS_PER_PAGE` in `src/server/getBlogs.ts`:

```typescript
const POSTS_PER_PAGE = 10; // Change to desired number
```

### Modify Excerpt Length

Update query in `src/sanity/lib/queries.ts`:

```groq
"excerpt": array::join(string::split((pt::text(body)), "")[0..120], "")
// Change 120 to desired character count
```

### Adjust Card Columns

Edit grid in `BlogGrid.tsx`:

```tsx
className = 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3';
// Modify breakpoint classes
```

## Future Enhancements

- [ ] Search functionality
- [ ] Category filtering
- [ ] Tag-based navigation
- [ ] Related posts
- [ ] Comments system
- [ ] Social sharing buttons
- [ ] Reading progress indicator
- [ ] Dark/light theme toggle
- [ ] RSS feed
- [ ] Newsletter signup

## Dependencies

- `next`: ^16.0.0-canary.6
- `react`: 19.1.0
- `next-sanity`: ^11.5.5
- `@portabletext/react`: Latest
- `@sanity/image-url`: ^1.2.0
- `lucide-react`: ^0.545.0

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### No Posts Showing

- Check Sanity connection
- Verify posts exist in CMS
- Check console for errors

### Images Not Loading

- Verify Sanity CDN in next.config.ts
- Check image asset URLs
- Confirm projectId and dataset

### Pagination Not Working

- Check URL parameters
- Verify searchParams handling
- Test with query params manually

### PPR Not Working

- Ensure Next.js 16+
- Check experimental.ppr config
- Verify Suspense boundaries

---

Built with ❤️ using Next.js and Sanity
