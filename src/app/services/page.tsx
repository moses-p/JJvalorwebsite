import { services } from "@/data/services";
import HeroBackground from "@/components/HeroBackground";
import { ArrowRight, CheckCircle, Building2, Calendar, Palette, Plane, Sparkles, Sprout, GraduationCap, Utensils } from "lucide-react";

export default function ServicesPage() {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <HeroBackground alt="Our Services" overlay="light" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">Our Services</h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Comprehensive solutions across multiple sectors to transform lives and build legacies
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`h-2 bg-gradient-to-r ${service.color} group-hover:h-3 transition-all duration-300`}></div>
                <div className="p-8">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg hover:shadow-xl`}>
                    {(() => {
                      const IconComponent = iconMap[service.icon as string] || Building2;
                      return <IconComponent className="w-8 h-8 text-white hover:scale-110 transition-transform duration-300" />;
                    })()}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 group-hover:translate-x-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">{service.description}</p>
                  <div className="space-y-2">
                    {service.services.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 hover:translate-x-1 transform">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-blue-200 transition-colors duration-300">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto group-hover:text-blue-100 transition-colors duration-300">
            Contact us today to discuss how our services can help you achieve your goals
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform active:scale-95 group relative overflow-hidden"
          >
            <span className="relative z-10">Request a Quote</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </a>
        </div>
      </section>
    </div>
  );
}
