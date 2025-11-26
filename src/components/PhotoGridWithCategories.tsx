'use client';

import { useState, useTransition, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import type {
  PhotoCategoriesQueryResult,
  PhotosByCategoryQueryResult,
} from '../../types/sanity.types';
import { client } from '@/sanity/lib/client';
import { photosByCategoryQuery, allPhotosQuery } from '@/sanity/lib/queries';
import LoadingSpinner from './LoadingSpinner';
import { Button } from './ui/button';

interface PhotoGridWithCategoriesProps {
  categories: PhotoCategoriesQueryResult;
}

const PhotoGridWithCategories = ({
  categories,
}: PhotoGridWithCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [photos, setPhotos] = useState<PhotosByCategoryQueryResult>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const fetchPhotos = async (categorySlug: string | null) => {
    setIsLoading(true);
    try {
      const fetchedPhotos: PhotosByCategoryQueryResult = categorySlug
        ? await client.fetch(photosByCategoryQuery, { slug: categorySlug })
        : await client.fetch(allPhotosQuery);

      startTransition(() => {
        setPhotos(fetchedPhotos);
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error fetching photos:', error);
      setIsLoading(false);
    }
  };

  // Fetch all photos on component mount
  useEffect(() => {
    fetchPhotos(null);
  }, []);

  const handleCategoryClick = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    fetchPhotos(categorySlug);
  };

  const handlePhotoClick = (index: number) => {
    setSelectedPhoto(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'unset';
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (selectedPhoto === null) return;

    if (direction === 'next') {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    } else {
      setSelectedPhoto(
        selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        <Button
          size={'lg'}
          onClick={() => handleCategoryClick(null)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            selectedCategory === null ? 'bg-blue-700' : 'hover:bg-blue-700'
          }`}
        >
          All Photos
        </Button>
        {categories.map(category => (
          <Button
            key={category._id}
            onClick={() => handleCategoryClick(category.slug?.current || null)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category.slug?.current
                ? 'bg-blue-700'
                : 'hover:bg-blue-700'
            }`}
            size={'lg'}
          >
            {category.title} ({category.photoCount})
          </Button>
        ))}
      </div>

      {/* Loading State */}
      {(isLoading || isPending) && (
        <div className="py-12">
          <LoadingSpinner />
          <p className="text-muted-foreground mt-4 text-center">
            Loading photos...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading &&
        !isPending &&
        photos.length === 0 &&
        selectedCategory !== null && (
          <div className="text-muted-foreground py-12 text-center">
            <p>No Photos for this category.</p>
          </div>
        )}

      {/* Photo Grid - Masonry Layout */}
      {!isLoading && !isPending && photos.length > 0 && (
        <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {photos.map((photo, index) => (
            <div
              key={photo._id}
              className="group bg-secondary/50 relative cursor-pointer break-inside-avoid overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
              onClick={() => handlePhotoClick(index)}
            >
              {photo.image?.asset?.url && (
                <>
                  <Image
                    src={photo.image.asset.url}
                    alt={photo.altText || photo.title || 'Photo'}
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                    <div className="absolute right-0 bottom-0 left-0 translate-y-full p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
                      <h3 className="text-lg font-semibold">{photo.title}</h3>
                      {photo.image.caption && (
                        <p className="text-sm text-white/80">
                          {photo.image.caption}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedPhoto !== null && photos.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={e => {
              e.stopPropagation();
              navigatePhoto('prev');
            }}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Previous photo"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              navigatePhoto('next');
            }}
            className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Next photo"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Main Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={e => e.stopPropagation()}
          >
            {photos[selectedPhoto]?.image?.asset?.url && (
              <>
                <Image
                  src={photos[selectedPhoto].image!.asset!.url!}
                  alt={
                    photos[selectedPhoto].altText ||
                    photos[selectedPhoto].title ||
                    'Photo'
                  }
                  width={1920}
                  height={1080}
                  className="max-h-[85vh] w-auto object-contain"
                  priority
                />
                <div className="mt-4 text-center text-white">
                  <h3 className="text-xl font-semibold">
                    {photos[selectedPhoto].title}
                  </h3>
                  {photos[selectedPhoto].image?.caption && (
                    <p className="mt-2 text-white/80">
                      {photos[selectedPhoto].image!.caption}
                    </p>
                  )}
                  {photos[selectedPhoto].image?.credit && (
                    <p className="mt-1 text-sm text-white/60">
                      Credit: {photos[selectedPhoto].image!.credit}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-white/60">
                    {selectedPhoto + 1} / {photos.length}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGridWithCategories;
