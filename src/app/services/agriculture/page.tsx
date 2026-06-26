import { Sprout, Tractor, Wheat, Droplets, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesAgriculturePage() {
  const services = [
    { icon: Tractor, title: "Commercial Farming", description: "Large-scale crop production for food security" },
    { icon: Wheat, title: "Food Supply", description: "Quality produce for markets and institutions" },
    { icon: Sprout, title: "Agricultural Consultancy", description: "Expert advice on farming best practices" },
    { icon: Droplets, title: "Irrigation Systems", description: "Modern water management solutions" },
  ];

  const products = [
    { name: "Maize", description: "High-quality maize for various uses" },
    { name: "Beans", description: "Nutritious beans varieties" },
    { name: "Flour", description: "Processed flour products" },
    { name: "Fresh Produce", description: "Fresh vegetables and fruits" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-green-600 via-green-500 to-green-600">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Agriculture & Farming</h1>
          <p className="text-xl text-green-100">Sustainable farming solutions and agricultural services</p>
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

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Interested in Our Agricultural Services?</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-semibold">
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
