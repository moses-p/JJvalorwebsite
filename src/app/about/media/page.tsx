import { Calendar, Download, Video } from "lucide-react";
import HeroBackground from "@/components/HeroBackground";
import DynamicImageGallery from "@/components/DynamicImageGallery";

export default function AboutMediaPage() {
  const newsItems = [
    { date: "June 2024", title: "J.J Valor Launches Orphanage Project", category: "Announcement" },
    { date: "May 2024", title: "Youth Training Program Reaches 50 Graduates", category: "Impact" },
    { date: "April 2024", title: "New Partnership with Local Schools", category: "Partnership" },
    { date: "February 2024", title: "J.J Valor Enterprises Officially Registered", category: "Milestone" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 overflow-hidden">
        <HeroBackground alt="J.J Valor media center" overlay="light" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Media Center</h1>
          <p className="text-xl text-blue-200">News, press releases, and media resources</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {newsItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{item.category}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">Read more about this update and its impact on our community.</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">Photo Gallery</h2>
          <DynamicImageGallery limit={50} columns={3} />

          <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-16">Media Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
              <Video className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Video Library</h3>
              <p className="text-gray-600 text-sm">Videos showcasing our work and impact</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
              <Download className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Press Kit</h3>
              <p className="text-gray-600 text-sm">Logo, brand assets, and company information</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
              <Download className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Brand Assets</h3>
              <p className="text-gray-600 text-sm">Logo files can be added to public/images/logo.png</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
