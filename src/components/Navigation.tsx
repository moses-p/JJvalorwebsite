"use client";

import { useState } from "react";
import Link from "next/link";
import { navigationItems, NavigationItem } from "@/data/navigation";
import BrandLogo from "@/components/BrandLogo";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Handle scroll effect
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 50);
    });
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex flex-wrap gap-4 md:gap-6">
            <a href="tel:+256705691361" className="flex items-center gap-2 hover:text-blue-200 transition-all duration-300 hover:scale-105 transform">
              <Phone size={16} className="hover:rotate-12 transition-transform duration-300" />
              <span className="hidden sm:inline">+256705691361</span>
            </a>
            <a href="mailto:jonvalors@gmail.com" className="flex items-center gap-2 hover:text-blue-200 transition-all duration-300 hover:scale-105 transform">
              <Mail size={16} className="hover:rotate-12 transition-transform duration-300" />
              <span className="hidden sm:inline">jonvalors@gmail.com</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="hover:scale-110 transition-transform duration-300" />
              <span className="hidden sm:inline">Gayaza bulamu</span>
            </span>
          </div>
          <div className="text-xs md:text-sm font-medium animate-pulse">
            Innovative Creativity Unbound
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <BrandLogo />
              <div className="hidden sm:block">
                <div className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">J.J VALOR</div>
                <div className="text-xs text-gray-600 group-hover:text-blue-500 transition-colors duration-300">ENTERPRISES LTD</div>
              </div>
            </Link>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className="px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium text-sm hover:scale-105 transform hover:shadow-lg active:scale-95"
              >
                Contact Us
              </Link>
              <Link
                href="/orphanage"
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-xl hover:scale-105 transform active:scale-95"
              >
                Donate
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 transform active:scale-95"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} className="hover:rotate-90 transition-transform duration-300" /> : <Menu size={24} className="hover:rotate-180 transition-transform duration-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="bg-white border-t shadow-lg absolute top-full right-0 w-80 max-w-[calc(100vw-2rem)] max-h-[80vh] overflow-y-auto z-50 rounded-b-lg">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.subpages ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium hover:scale-105 transform hover:shadow-md"
                      >
                        {item.name}
                        <ChevronDown size={16} className={`transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''} hover:scale-110`} />
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 space-y-1 animate-in slide-in-from-left-2 duration-300">
                          {item.subpages.map((subpage) => (
                            <Link
                              key={subpage.name}
                              href={subpage.href}
                              className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 text-sm hover:scale-102 transform hover:translate-x-1"
                              onClick={() => {
                                setIsOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {subpage.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium hover:scale-105 transform hover:shadow-md hover:translate-x-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  href="/contact"
                  className="block px-4 py-3 text-center text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium hover:scale-105 transform hover:shadow-lg active:scale-95"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
                <Link
                  href="/orphanage"
                  className="block px-4 py-3 text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium shadow-md hover:shadow-xl hover:scale-105 transform active:scale-95"
                  onClick={() => setIsOpen(false)}
                >
                  Donate
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
