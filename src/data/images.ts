export const heroImage = "/images/hero.jpg";

/** Main site logo (navbar, footer, admin). Not the favicon. */
export const logoImage = "/logo/logo.png";

/** Cropped logo without excess whitespace — preferred for UI */
export const logoMarkImage = "/logo/logo-mark.png";

/** Browser tab icon only */
export const faviconImage = "/favicon.ico";

export type SiteImage = {
  id?: string | number;
  src: string;
  alt: string;
  category?: string;
};

const galleryImages: SiteImage[] = [
  { id: "gallery-hero", src: "/images/hero.jpg", alt: "J.J Valor Enterprises team and projects", category: "Featured" },
  { src: "/images/IMG-20260609-WA0002.png", alt: "J.J Valor community event", category: "Events" },
  { src: "/images/IMG-20260609-WA0007.jpg", alt: "J.J Valor project work", category: "Projects" },
  { src: "/images/IMG-20260609-WA0008.jpg", alt: "J.J Valor community outreach", category: "Community" },
  { src: "/images/IMG-20260609-WA0009.jpg", alt: "J.J Valor team activity", category: "Team" },
  { src: "/images/IMG-20260609-WA0010.jpg", alt: "J.J Valor enterprise operations", category: "Operations" },
  { src: "/images/IMG-20260609-WA0011.jpg", alt: "J.J Valor youth empowerment", category: "Youth" },
  { src: "/images/IMG-20260609-WA0012.jpg", alt: "J.J Valor community impact", category: "Impact" },
  { src: "/images/IMG-20260609-WA0013.jpg", alt: "J.J Valor services in action", category: "Services" },
  { src: "/images/IMG-20260609-WA0014.jpg", alt: "J.J Valor partnership activity", category: "Partnerships" },
  { src: "/images/IMG-20260611-WA0006.jpg", alt: "J.J Valor field work", category: "Field Work" },
  { src: "/images/IMG-20260611-WA0007.jpg", alt: "J.J Valor project milestone", category: "Projects" },
  { src: "/images/Image-1.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
  { src: "/images/IMG_5402.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
  { src: "/images/IMG_5950.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
  { src: "/images/IMG_7306.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
  { src: "/images/IMG_7533.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
  { src: "/images/IMG_7541.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
  { src: "/images/IMG_8064.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
  { src: "/images/IMG_8068.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
  { src: "/images/IMG_8074.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
  { src: "/images/IMG_8075.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
  { src: "/images/IMG_8081.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
  { src: "/images/IMG_8291.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
  { src: "/images/IMG_8294.jpg", alt: "J.J Valor gallery photo", category: "Gallery" },
];

export function getGalleryImages(): SiteImage[] {
  return galleryImages;
}

export function getFeaturedGalleryImages(limit = 8): SiteImage[] {
  return galleryImages.slice(0, limit);
}
