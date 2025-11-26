import { Suspense } from 'react';
import { client } from '@/sanity/lib/client';
import { photoCategoriesQuery } from '@/sanity/lib/queries';

import LoadingSpinner from './LoadingSpinner';
import type { PhotoCategoriesQueryResult } from '../../types/sanity.types';
import PhotoGridWithCategories from './PhotoGridWithCategories';

// Async component to fetch categories
async function PhotoGallerySection() {
  const categories: PhotoCategoriesQueryResult =
    await client.fetch(photoCategoriesQuery);

  return <PhotoGridWithCategories categories={categories} />;
}

const Images = () => {
  return (
    <section className="container w-full min-w-full py-12">
      <div className="mb-12">
        <h2 className="my-5 text-4xl font-semibold lg:text-5xl">Photography</h2>
        <p className="text-foreground/60 max-w-[70%] text-lg">
          Here is a collection of my best travel pictures that I took while
          traveling places all around the world.
        </p>
      </div>

      <div>
        {/* Photo Gallery with Suspense for PPR */}
        <Suspense
          fallback={
            <div className="py-12">
              <LoadingSpinner />
              <p className="text-muted-foreground mt-4 text-center">
                Loading gallery...
              </p>
            </div>
          }
        >
          <PhotoGallerySection />
        </Suspense>
      </div>
    </section>
  );
};

export default Images;
