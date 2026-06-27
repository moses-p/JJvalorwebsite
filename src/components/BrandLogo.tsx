import { logoMarkImage, logoImage } from "@/data/images";

type BrandLogoProps = {
  className?: string;
};

export default function BrandLogo({ className = "h-24 md:h-32 lg:h-40" }: BrandLogoProps) {
  return (
    <img
      src={logoMarkImage}
      alt="J.J Valor Enterprises"
      className={`${className} w-auto max-w-[400px] md:max-w-[500px] object-contain`}
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
