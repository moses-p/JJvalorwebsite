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
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BrandLogo className="h-16 md:h-20" />
              <div>
                <div className="font-bold text-lg">J.J VALOR</div>
                <div className="text-xs text-gray-400">ENTERPRISES LTD</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {companyInfo.tagline}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400">Phone</div>
                  <a href={`tel:${companyInfo.contact.phone[0]}`} className="text-white hover:text-blue-400 transition-colors">
                    {companyInfo.contact.phone[0]}
                  </a>
                  <br />
                  <a href={`tel:${companyInfo.contact.phone[1]}`} className="text-white hover:text-blue-400 transition-colors">
                    {companyInfo.contact.phone[1]}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400">Email</div>
                  <a href={`mailto:${companyInfo.contact.email}`} className="text-white hover:text-blue-400 transition-colors">
                    {companyInfo.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-400">Location</div>
                  <div className="text-white">{companyInfo.contact.location}</div>
                  <div className="text-gray-400 text-xs">{companyInfo.contact.poBox}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white hover:text-blue-400 transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-blue-400">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Construction & Real Estate</li>
              <li>Events Management</li>
              <li>Graphics & Branding</li>
              <li>Tours & Travel</li>
              <li>Agriculture</li>
              <li>Cleaning & Fumigation</li>
              <li>J.J Valor Academy</li>
              <li>Food Supply</li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4 text-blue-400">Connect With Us</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
            <div className="pt-4">
              <h4 className="font-medium mb-2 text-sm">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors text-sm font-medium">
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
            <div>
              © {currentYear} {companyInfo.name}. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
