'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PhotosByCategoryQueryResult } from '../../types/sanity.types';
import { X } from 'lucide-react';

interface PhotoGridProps {
  photos: PhotosByCategoryQueryResult;
}

const PhotoGrid = ({ photos }: PhotoGridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories from photos
  const categories = Array.from(
    new Set(photos.map(photo => photo.category?.title).filter(Boolean))
  ) as string[];

  // Filter photos by selected category
  const filteredPhotos = selectedCategory
    ? photos.filter(photo => photo.category?.title === selectedCategory)
    : photos;

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
      setSelectedPhoto((selectedPhoto + 1) % filteredPhotos.length);
    } else {
      setSelectedPhoto(
        selectedPhoto === 0 ? filteredPhotos.length - 1 : selectedPhoto - 1
      );
    }
  };

  if (!photos || photos.length === 0) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        <p>No photos available yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            All Photos ({photos.length})
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category} (
              {photos.filter(p => p.category?.title === category).length})
            </button>
          ))}
        </div>
      )}

      {/* Photo Grid - Masonry Layout */}
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {filteredPhotos.map((photo, index) => (
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

      {/* Lightbox */}
      {selectedPhoto !== null && (
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
            {filteredPhotos[selectedPhoto]?.image?.asset?.url && (
              <>
                <Image
                  src={filteredPhotos[selectedPhoto].image!.asset!.url!}
                  alt={
                    filteredPhotos[selectedPhoto].altText ||
                    filteredPhotos[selectedPhoto].title ||
                    'Photo'
                  }
                  width={1920}
                  height={1080}
                  className="max-h-[85vh] w-auto object-contain"
                  priority
                />
                <div className="mt-4 text-center text-white">
                  <h3 className="text-xl font-semibold">
                    {filteredPhotos[selectedPhoto].title}
                  </h3>
                  {filteredPhotos[selectedPhoto].image?.caption && (
                    <p className="mt-2 text-white/80">
                      {filteredPhotos[selectedPhoto].image!.caption}
                    </p>
                  )}
                  {filteredPhotos[selectedPhoto].image?.credit && (
                    <p className="mt-1 text-sm text-white/60">
                      Credit: {filteredPhotos[selectedPhoto].image!.credit}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-white/60">
                    {selectedPhoto + 1} / {filteredPhotos.length}
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

export default PhotoGrid;
