"use client";

import { useState } from "react";
import { Heart, DollarSign, CreditCard, Smartphone, ArrowRight, Building2, Phone } from "lucide-react";
import Link from "next/link";
import { submitDonation } from "@/lib/api";

export default function OrphanageDonatePage() {
  const [formData, setFormData] = useState({
    donor_name: "",
    donor_email: "",
    donor_phone: "",
    amount: "",
    payment_method: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("");

  const donationAmounts = [
    { amount: 50000, label: "UGX 50,000", impact: "Provides meals for a week" },
    { amount: 100000, label: "UGX 100,000", impact: "Provides school supplies" },
    { amount: 250000, label: "UGX 250,000", impact: "Covers medical expenses" },
    { amount: 500000, label: "UGX 500,000", impact: "Supports education for a month" },
    { amount: 1000000, label: "UGX 1,000,000", impact: "Supports a child for 2 months" },
  ];

  const paymentMethods = [
    { id: "mtn_momo", icon: Smartphone, title: "MTN Mobile Money", description: "Send to 0772XXXXXX" },
    { id: "airtel_money", icon: Smartphone, title: "Airtel Money", description: "Send to 0708XXXXXX" },
    { id: "bank_transfer", icon: Building2, title: "Bank Transfer", description: "Stanbic Bank, Account XXXXXXXXXX" },
    { id: "cash", icon: DollarSign, title: "Cash", description: "In-person donation at our office" },
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount.toString());
    setFormData({ ...formData, amount: amount.toString() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const amount = parseInt(formData.amount);
      if (!amount || amount < 1000) {
        throw new Error("Minimum donation amount is UGX 1,000");
      }

      await submitDonation({
        donor_name: formData.donor_name,
        donor_email: formData.donor_email,
        donor_phone: formData.donor_phone,
        amount,
        currency: "UGX",
        payment_method: formData.payment_method,
        message: formData.message,
      });

      setSuccess(true);
      setFormData({
        donor_name: "",
        donor_email: "",
        donor_phone: "",
        amount: "",
        payment_method: "",
        message: "",
      });
      setSelectedAmount("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit donation");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your donation has been recorded successfully. We will contact you shortly with payment instructions.</p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-300"
          >
            Make Another Donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-pink-600 via-pink-500 to-pink-600">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">Donate</h1>
          <p className="text-xl text-pink-100 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">Support our orphanage project with your donation</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Donation Amounts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {donationAmounts.map((item, index) => (
              <button
                key={index}
                onClick={() => handleAmountSelect(item.amount)}
                className={`bg-gradient-to-br rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-2 animate-in fade-in slide-in-from-bottom-4 duration-700 ${
                  selectedAmount === item.amount.toString()
                    ? "from-pink-500 to-pink-600 border-pink-600 text-white"
                    : "from-pink-50 to-pink-100 border-transparent hover:border-pink-400"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`text-2xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 ${
                  selectedAmount === item.amount.toString() ? "text-white" : "text-pink-600"
                }`}>{item.label}</div>
                <p className={`text-sm group-hover:text-gray-700 transition-colors duration-300 ${
                  selectedAmount === item.amount.toString() ? "text-pink-100" : "text-gray-600"
                }`}>{item.impact}</p>
              </button>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Payment Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {paymentMethods.map((method, index) => (
              <button
                key={method.id}
                onClick={() => setFormData({ ...formData, payment_method: method.id })}
                className={`bg-white rounded-xl shadow-lg p-6 border text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700 ${
                  formData.payment_method === method.id
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-100"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg hover:shadow-xl ${
                  formData.payment_method === method.id
                    ? "bg-gradient-to-br from-pink-500 to-pink-600"
                    : "bg-gradient-to-br from-pink-500 to-pink-600"
                }`}>
                  <method.icon className="w-7 h-7 text-white hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-300">{method.title}</h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{method.description}</p>
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center group-hover:text-pink-600 transition-colors duration-300">Quick Donate</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                  {error}
                </div>
              )}
              <input
                type="text"
                placeholder="Your Name"
                value={formData.donor_name}
                onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 hover:border-pink-400 hover:shadow-md"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.donor_email}
                onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 hover:border-pink-400 hover:shadow-md"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number (for Mobile Money)"
                value={formData.donor_phone}
                onChange={(e) => setFormData({ ...formData, donor_phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 hover:border-pink-400 hover:shadow-md"
              />
              <input
                type="number"
                placeholder="Amount (UGX)"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 hover:border-pink-400 hover:shadow-md"
                required
                min="1000"
              />
              <textarea
                placeholder="Message (optional)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 hover:border-pink-400 hover:shadow-md"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 disabled:opacity-60 transition-all duration-300 hover:scale-105 transform active:scale-95 group relative overflow-hidden"
              >
                {loading ? "Processing..." : "Donate Now"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Every Donation Makes a Difference</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 rounded-xl font-semibold hover:scale-105 transform active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden">
            <span className="relative z-10">Contact Us</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
        </div>
      </section>
    </div>
  );
}
