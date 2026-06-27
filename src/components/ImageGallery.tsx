"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { SiteImage } from "@/data/images";

type ImageGalleryProps = {
  images: SiteImage[];
  columns?: 2 | 3 | 4;
};

export default function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const [selected, setSelected] = useState<SiteImage | null>(null);
  const gridClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  if (images.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">
        No images available yet. Add JPG or PNG files to the public/images folder.
      </p>
    );
  }

  return (
    <>
      <div className={`grid ${gridClass} gap-4`}>
        {images.map((image, index) => (
          <button
            key={image.id ?? `${index}-${image.src}`}
            type="button"
            onClick={() => setSelected(image)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 text-left shadow-md hover:shadow-xl transition-shadow"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              {image.category && (
                <span className="text-xs font-medium text-blue-200">{image.category}</span>
              )}
              <p className="text-sm text-white line-clamp-2">{image.alt}</p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setSelected(null)}
            aria-label="Close image preview"
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={selected.src}
            alt={selected.alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
