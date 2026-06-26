import { heroImage } from "@/data/images";

type HeroBackgroundProps = {
  alt?: string;
  imageSrc?: string;
  overlay?: "dark" | "medium" | "light";
};

export default function HeroBackground({
  alt = "J.J Valor Enterprises",
  imageSrc = heroImage,
  overlay = "medium",
}: HeroBackgroundProps) {
  const overlayClass =
    overlay === "light"
      ? "from-blue-950/40 via-blue-900/30 to-blue-950/50"
      : overlay === "dark"
        ? "from-blue-950/80 via-blue-900/75 to-blue-950/80"
        : "from-blue-950/55 via-blue-900/45 to-blue-950/55";

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${imageSrc}")` }}
        role="img"
        aria-label={alt}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${overlayClass}`} />
    </div>
  );
}
