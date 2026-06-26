import HeroBackground from "@/components/HeroBackground";
import ImageGallery from "@/components/ImageGallery";
import { getGalleryImages } from "@/data/images";

export default function MediaPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 overflow-hidden">
        <HeroBackground alt="J.J Valor media gallery" overlay="light" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Media Center</h1>
          <p className="text-xl text-blue-200">Photos from our projects, events, and community work</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ImageGallery images={getGalleryImages()} columns={3} />
        </div>
      </section>
    </div>
  );
}
