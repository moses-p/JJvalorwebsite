import { logoMarkImage, logoImage } from "@/data/images";

type BrandLogoProps = {
  className?: string;
};

export default function BrandLogo({ className = "h-20 md:h-24 lg:h-28" }: BrandLogoProps) {
  return (
    <img
      src={logoMarkImage}
      alt="J.J Valor Enterprises"
      className={`${className} w-auto max-w-[300px] md:max-w-[350px] object-contain`}
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
