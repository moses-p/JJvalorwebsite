import Link from "next/link";
import { companyInfo } from "@/data/company";
import BrandLogo from "@/components/BrandLogo";
import { navigationItems } from "@/data/navigation";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4 group">
            <div className="flex items-center gap-3">
              <BrandLogo className="h-16 md:h-20 group-hover:scale-105 transition-transform duration-300" />
              <div>
                <div className="font-bold text-lg group-hover:text-blue-400 transition-colors duration-300">J.J VALOR</div>
                <div className="text-xs text-gray-400 group-hover:text-blue-300 transition-colors duration-300">ENTERPRISES LTD</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
              {companyInfo.tagline}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3 group/item">
                <Phone size={18} className="text-blue-400 mt-0.5 flex-shrink-0 group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300" />
                <div>
                  <div className="text-gray-400">Phone</div>
                  <a href={`tel:${companyInfo.contact.phone[0]}`} className="text-white hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    {companyInfo.contact.phone[0]}
                  </a>
                  <br />
                  <a href={`tel:${companyInfo.contact.phone[1]}`} className="text-white hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    {companyInfo.contact.phone[1]}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group/item">
                <Mail size={18} className="text-blue-400 mt-0.5 flex-shrink-0 group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-300" />
                <div>
                  <div className="text-gray-400">Email</div>
                  <a href={`mailto:${companyInfo.contact.email}`} className="text-white hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">
                    {companyInfo.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group/item">
                <MapPin size={18} className="text-blue-400 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300" />
                <div>
                  <div className="text-gray-400">Location</div>
                  <div className="text-white group-hover:text-blue-200 transition-colors duration-300">{companyInfo.contact.location}</div>
                  <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">{companyInfo.contact.poBox}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h3 className="font-bold text-lg mb-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">Quick Links</h3>
            <ul className="space-y-2">
              {navigationItems.map((item, index) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white hover:text-blue-400 transition-all duration-300 text-sm hover:translate-x-1 transform inline-block hover:scale-105"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="group">
            <h3 className="font-bold text-lg mb-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Construction & Real Estate", "Events Management", "Graphics & Branding", "Tours & Travel", "Agriculture", "Cleaning & Fumigation", "J.J Valor Academy", "Food Supply"].map((service, index) => (
                <li key={service} className="hover:text-blue-300 hover:translate-x-1 transition-all duration-300 transform cursor-default" style={{ transitionDelay: `${index * 50}ms` }}>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-4 group">
            <h3 className="font-bold text-lg mb-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300">Connect With Us</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                <Facebook size={20} className="hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                <Twitter size={20} className="hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                <Instagram size={20} className="hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                <Linkedin size={20} className="hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-all duration-300 hover:scale-110 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                <Youtube size={20} className="hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
            <div className="pt-4">
              <h4 className="font-medium mb-2 text-sm group-hover:text-blue-300 transition-colors duration-300">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 hover:border-gray-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm font-medium hover:scale-105 transform hover:shadow-lg active:scale-95">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="hover:text-gray-300 transition-colors duration-300">
              © {currentYear} {companyInfo.name}. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white hover:text-blue-400 transition-all duration-300 hover:scale-105 transform inline-block">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white hover:text-blue-400 transition-all duration-300 hover:scale-105 transform inline-block">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white hover:text-blue-400 transition-all duration-300 hover:scale-105 transform inline-block">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
