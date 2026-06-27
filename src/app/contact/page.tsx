"use client";

import { useState } from "react";
import { companyInfo } from "@/data/company";
import { submitContactMessage } from "@/lib/api";
import { Phone, Mail, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, Youtube, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      await submitContactMessage(formData);
      setFeedback({
        type: "success",
        message: "Thank you for your message! We will get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your message right now. Please try again or email us directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">Contact Us</h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Get in touch with us to discuss how we can work together
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '0ms' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg hover:shadow-xl">
                <Phone className="w-8 h-8 text-white hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Phone</h3>
              <div className="space-y-2">
                <a href={`tel:${companyInfo.contact.phone[0]}`} className="block text-blue-600 hover:text-blue-800 hover:translate-x-1 transform inline-block transition-all duration-300">
                  {companyInfo.contact.phone[0]}
                </a>
                <a href={`tel:${companyInfo.contact.phone[1]}`} className="block text-blue-600 hover:text-blue-800 hover:translate-x-1 transform inline-block transition-all duration-300">
                  {companyInfo.contact.phone[1]}
                </a>
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg hover:shadow-xl">
                <Mail className="w-8 h-8 text-white hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Email</h3>
              <a href={`mailto:${companyInfo.contact.email}`} className="block text-blue-600 hover:text-blue-800 hover:translate-x-1 transform inline-block transition-all duration-300">
                {companyInfo.contact.email}
              </a>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg hover:shadow-xl">
                <MapPin className="w-8 h-8 text-white hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">Location</h3>
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                <div>{companyInfo.contact.location}</div>
                <div className="text-sm">{companyInfo.contact.poBox}</div>
              </div>
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-left-4 duration-700">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-600 transition-colors duration-300">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 hover:shadow-md"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 hover:shadow-md"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 hover:shadow-md"
                    placeholder="+256 XXX XXX XXX"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400 hover:shadow-md"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="services">Services Request</option>
                    <option value="quote">Request a Quote</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="donation">Donation Inquiry</option>
                    <option value="volunteer">Volunteer Application</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 hover:border-blue-400 hover:shadow-md"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {feedback && (
                  <div
                    className={`rounded-lg px-4 py-3 text-sm animate-in fade-in slide-in-from-bottom-4 duration-300 ${
                      feedback.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {feedback.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105 transform active:scale-95 group relative overflow-hidden"
                >
                  <span className="relative z-10">{submitting ? "Sending..." : "Send Message"}</span>
                  <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </form>
            </div>

            {/* Map and Office Hours */}
            <div className="space-y-8">
              {/* Google Maps */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-64 md:h-80 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-in fade-in slide-in-from-right-4 duration-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.123456789!2d32.6!3d0.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMjQnMDAuMCJOIDMywrDM2JzAwLjAiRQ!5e0!3m2!1sen!2sug!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="J.J Valor Enterprises Location - Gayaza Bulamu"
                  className="hover:scale-105 transition-transform duration-500"
                ></iframe>
              </div>

              {/* Office Hours */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-blue-600 hover:scale-110 hover:rotate-12 transition-all duration-300" />
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between group hover:translate-x-1 transform transition-transform duration-300">
                    <span className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Monday - Friday</span>
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between group hover:translate-x-1 transform transition-transform duration-300">
                    <span className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Saturday</span>
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between group hover:translate-x-1 transform transition-transform duration-300">
                    <span className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Sunday</span>
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Closed</span>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">Connect With Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    <Facebook className="w-6 h-6 text-white hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    <Twitter className="w-6 h-6 text-white hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    <Instagram className="w-6 h-6 text-white hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    <Linkedin className="w-6 h-6 text-white hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    <Youtube className="w-6 h-6 text-white hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-blue-200 transition-colors duration-300">
            Ready to Start a Conversation?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto group-hover:text-blue-100 transition-colors duration-300">
            Whether you need our services, want to partner with us, or wish to support our orphanage project, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/services"
              className="px-8 py-4 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform active:scale-95 group relative overflow-hidden"
            >
              <span className="relative z-10">Explore Our Services</span>
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </a>
            <a
              href="/orphanage"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform active:scale-95 group relative overflow-hidden"
            >
              <span className="relative z-10">Support Our Orphanage</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
