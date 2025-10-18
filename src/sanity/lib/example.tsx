// // In your page component
// const currentPage = 1; // or from search params
// const postsPerPage = 10;
// const start = (currentPage - 1) * postsPerPage;
// const end = start + postsPerPage;

// const [posts, totalCount] = await Promise.all([
//   client.fetch(paginatedPostsQuery, { start, end }),
//   client.fetch(postsCountQuery)
// ]);

// const totalPages = Math.ceil(totalCount / postsPerPage);
