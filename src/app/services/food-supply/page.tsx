import { Utensils, Truck, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesFoodSupplyPage() {
  const products = [
    { name: "Maize", description: "High-quality maize grains", icon: Utensils },
    { name: "Beans", description: "Various bean varieties", icon: Utensils },
    { name: "Flour", description: "Processed wheat flour", icon: Utensils },
    { name: "Rice", description: "Premium rice varieties", icon: Utensils },
    { name: "Fresh Vegetables", description: "Farm-fresh vegetables", icon: Utensils },
    { name: "Fruits", description: "Seasonal fruits", icon: Utensils },
  ];

  const clients = [
    { type: "Schools", count: "10+" },
    { type: "Institutions", count: "5+" },
    { type: "Restaurants", count: "8+" },
    { type: "Households", count: "50+" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-600">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Food Supply</h1>
          <p className="text-xl text-yellow-100">Quality agricultural products for schools and institutions</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {products.map((product, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <product.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Clients</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{client.count}</div>
                <div className="text-gray-600">{client.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Need Food Supplies?</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-yellow-600 rounded-xl font-semibold">
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
