import { Plane, MapPin, Calendar, Users, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesToursTravelPage() {
  const services = [
    { icon: Calendar, title: "Educational Tours", description: "School trips and educational excursions" },
    { icon: Users, title: "Corporate Retreats", description: "Team building and business travel" },
    { icon: MapPin, title: "Tourism Packages", description: "Local and international tour packages" },
    { icon: Plane, title: "Travel Consultancy", description: "Expert travel planning and advice" },
  ];

  const destinations = [
    { name: "National Parks", description: "Uganda's wildlife sanctuaries" },
    { name: "Cultural Sites", description: "Historical and cultural landmarks" },
    { name: "Adventure Tours", description: "Hiking and outdoor activities" },
    { name: "Beach Getaways", description: "Relaxing coastal destinations" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-green-600 via-green-500 to-green-600">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Tours & Travel</h1>
          <p className="text-xl text-green-100">School trips, corporate travel, and tour packages</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {services.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{dest.name}</h3>
                <p className="text-sm text-gray-600">{dest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Explore?</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-semibold">
            Book Your Trip <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
