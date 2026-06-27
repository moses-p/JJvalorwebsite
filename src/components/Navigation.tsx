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
            <a href="tel:+256705691361" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Phone size={16} />
              <span className="hidden sm:inline">+256705691361</span>
            </a>
            <a href="mailto:jonvalors@gmail.com" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Mail size={16} />
              <span className="hidden sm:inline">jonvalors@gmail.com</span>
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="hidden sm:inline">Gayaza bulamu</span>
            </span>
          </div>
          <div className="text-xs md:text-sm font-medium">
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
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <BrandLogo />
              <div className="hidden sm:block">
                <div className="font-bold text-lg md:text-xl text-gray-900">J.J VALOR</div>
                <div className="text-xs text-gray-600">ENTERPRISES LTD</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.subpages ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium text-sm flex items-center gap-1"
                      >
                        {item.name}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === item.name && (
                        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border py-2 min-w-48 z-50">
                          {item.subpages.map((subpage) => (
                            <Link
                              key={subpage.name}
                              href={subpage.href}
                              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 text-sm"
                              onClick={() => setOpenDropdown(null)}
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
                      className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium text-sm"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className="px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium text-sm"
              >
                Contact Us
              </Link>
              <Link
                href="/orphanage"
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium text-sm shadow-md"
              >
                Donate
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.subpages ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                      >
                        {item.name}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {openDropdown === item.name && (
                        <div className="pl-4 space-y-1">
                          {item.subpages.map((subpage) => (
                            <Link
                              key={subpage.name}
                              href={subpage.href}
                              className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm"
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
                      className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
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
                  className="block px-4 py-3 text-center text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Contact Us
                </Link>
                <Link
                  href="/orphanage"
                  className="block px-4 py-3 text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium shadow-md"
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
