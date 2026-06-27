import Link from "next/link";
import { companyInfo } from "@/data/company";
import { services } from "@/data/services";
import HeroBackground from "@/components/HeroBackground";
import DynamicImageGallery from "@/components/DynamicImageGallery";
import UpdatesMarquee from "@/components/UpdatesMarquee";
import LatestUpdatesSection from "@/components/LatestUpdatesSection";
import { ArrowRight, Building2, Users, Target, Award, Heart, Zap, Calendar, Palette, Plane, Sparkles, Sprout, GraduationCap, Utensils } from "lucide-react";

export default function Home() {
  const iconMap: Record<string, React.ElementType> = {
    Building2,
    Calendar,
    Palette,
    Plane,
    Sparkles,
    Sprout,
    GraduationCap,
    Utensils,
  };

  const headlines = [
    "Building Legacies.",
    "Transforming Communities.",
    "Empowering Generations.",
    "Creating Sustainable Impact.",
    "Innovative Creativity Unbound.",
  ];

  const impactStats = [
    { icon: Building2, label: "Years in Operation", value: "1+" },
    { icon: Target, label: "Projects Completed", value: "25+" },
    { icon: Users, label: "Communities Impacted", value: "10+" },
    { icon: Award, label: "Partners", value: "15+" },
    { icon: Heart, label: "Youth Trained", value: "50+" },
    { icon: Zap, label: "Services Offered", value: "8+" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground alt="J.J Valor Enterprises hero background" overlay="light" />
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Company Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-4xl md:text-5xl">JJ</span>
              </div>
            </div>

            {/* Company Name */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
              {companyInfo.name}
            </h1>

            {/* Hero Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
              {companyInfo.heroTitle}
            </h2>

            {/* Hero Description */}
            {/* <p className="text-lg md:text-xl text-blue-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              {companyInfo.heroDescription}
            </p> */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Request a Quote
              </Link>
              <Link
                href="/partners"
                className="px-8 py-4 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Partner With Us
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Our Services
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowRight className="w-8 h-8 text-white rotate-90" />
        </div>
      </section>

      <UpdatesMarquee />

      {/* Impact Statistics Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {impactStats.map((stat, index) => (
                <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
            </div>
        </div>
      </section>

      {/* Latest Updates — dynamic from admin/API */}
      <LatestUpdatesSection />

      {/* Featured Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions across multiple sectors to transform lives and build legacies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href="/services"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = iconMap[service.icon as string] || Building2;
                      return <IconComponent className="w-7 h-7 text-white" />;
                    })()}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Work in Pictures
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A glimpse of our projects, community work, and the impact we create across Uganda.
            </p>
          </div>
          <DynamicImageGallery limit={8} columns={4} />
          <div className="text-center mt-12">
            <Link
              href="/media"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              View Full Gallery
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Make a Difference?
              </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Join us in building businesses that build lives. Whether you need our services, want to partner with us, or wish to support our orphanage project, there's a place for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Get In Touch
              </Link>
              <Link
                href="/orphanage"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Support Our Orphanage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
