"use client";

import { useCallback, useEffect, useState } from "react";
import ImageGallery from "@/components/ImageGallery";
import { getFeaturedGalleryImages } from "@/data/images";
import { getPublicGallery } from "@/lib/api";
import { resolveImageUrl } from "@/lib/media";

type DynamicImageGalleryProps = {
  limit?: number;
  columns?: 2 | 3 | 4;
};

export default function DynamicImageGallery({ limit = 8, columns = 4 }: DynamicImageGalleryProps) {
  const [images, setImages] = useState(getFeaturedGalleryImages(limit));

  const load = useCallback(async () => {
    try {
      const data = await getPublicGallery(limit);
      if (data.length > 0) {
        setImages(
          data.map((item) => ({
            src: resolveImageUrl(item.image_url),
            alt: item.alt_text || item.title,
            category: item.category,
          }))
        );
      }
    } catch {
      setImages(getFeaturedGalleryImages(limit));
    }
  }, [limit]);

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [load]);

  return <ImageGallery images={images} columns={columns} />;
}
