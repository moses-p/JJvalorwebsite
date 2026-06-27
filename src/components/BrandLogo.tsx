import { logoMarkImage, logoImage } from "@/data/images";

type BrandLogoProps = {
  className?: string;
};

export default function BrandLogo({ className = "h-14 md:h-16 lg:h-[4.5rem]" }: BrandLogoProps) {
  return (
    <img
      src={logoMarkImage}
      alt="J.J Valor Enterprises"
      className={`${className} w-auto max-w-[220px] md:max-w-[260px] object-contain`}
      onError={(e) => {
        const target = e.currentTarget;
        if (!target.dataset.fallback) {
          target.dataset.fallback = "1";
          target.src = logoImage;
        }
      }}
    />
  );
}
