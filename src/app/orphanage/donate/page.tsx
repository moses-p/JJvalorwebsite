import { Heart, DollarSign, CreditCard, Smartphone, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OrphanageDonatePage() {
  const donationAmounts = [
    { amount: "UGX 50,000", impact: "Provides meals for a week" },
    { amount: "UGX 100,000", impact: "Provides school supplies" },
    { amount: "UGX 250,000", impact: "Covers medical expenses" },
    { amount: "UGX 500,000", impact: "Supports education for a month" },
    { amount: "UGX 1,000,000", impact: "Supports a child for 2 months" },
  ];

  const paymentMethods = [
    { icon: Smartphone, title: "Mobile Money", description: "MTN Mobile Money, Airtel Money" },
    { icon: CreditCard, title: "Bank Transfer", description: "Direct bank transfer" },
    { icon: DollarSign, title: "Cash", description: "In-person donation" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-pink-600 via-pink-500 to-pink-600">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Donate</h1>
          <p className="text-xl text-pink-100">Support our orphanage project with your donation</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Donation Amounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {donationAmounts.map((item, index) => (
              <button key={index} className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 text-center hover:shadow-xl transition-shadow border-2 border-transparent hover:border-pink-400">
                <div className="text-2xl font-bold text-pink-600 mb-2">{item.amount}</div>
                <p className="text-sm text-gray-600">{item.impact}</p>
              </button>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Payment Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Donate</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              <input type="number" placeholder="Amount (UGX)" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" />
              <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition-colors">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Every Donation Makes a Difference</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 rounded-xl font-semibold">
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
