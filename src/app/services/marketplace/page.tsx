import { ShoppingBag, Tag, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesMarketplacePage() {
  const categories = [
    { icon: ShoppingBag, title: "Agricultural Products", count: "20+" },
    { icon: Tag, title: "Branded Merchandise", count: "15+" },
    { icon: Truck, title: "Event Supplies", count: "10+" },
  ];

  const products = [
    { name: "Maize (50kg)", price: "UGX 150,000", category: "Agriculture" },
    { name: "Beans (50kg)", price: "UGX 200,000", category: "Agriculture" },
    { name: "Branded T-Shirt", price: "UGX 25,000", category: "Merchandise" },
    { name: "Event Banner", price: "UGX 50,000", category: "Events" },
    { name: "Flour (25kg)", price: "UGX 80,000", category: "Agriculture" },
    { name: "Company Cap", price: "UGX 20,000", category: "Merchandise" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-600">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">Marketplace</h1>
          <p className="text-xl text-purple-100 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">Shop our products and services</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {categories.map((cat, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <cat.icon className="w-7 h-7 text-white hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{cat.title}</h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{cat.count} Products</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-xs text-purple-600 font-medium mb-2 group-hover:text-purple-700 transition-colors duration-300">{product.category}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{product.name}</h3>
                <div className="text-xl font-bold text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">{product.price}</div>
                <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 transform active:scale-95 group relative overflow-hidden">
                  <span className="relative z-10">Add to Cart</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Shop?</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:scale-105 transform active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden">
            <span className="relative z-10">Browse All Products</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
        </div>
      </section>
    </div>
  );
}
