export interface NavigationItem {
  name: string;
  href: string;
  subpages?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about",
    subpages: [
      { name: "Company History", href: "/about/history" },
      { name: "Founder Story", href: "/about/founder" },
      { name: "Vision & Mission", href: "/about/vision" },
      { name: "Media Center", href: "/about/media" },
      { name: "Blog", href: "/about/blog" },
    ],
  },
  {
    name: "Services",
    href: "/services",
    subpages: [
      { name: "Agriculture & Farming", href: "/services/agriculture" },
      { name: "Education & Training", href: "/services/education" },
      { name: "Food Supply", href: "/services/food-supply" },
      { name: "Tours & Travel", href: "/services/tours-travel" },
      { name: "Marketplace", href: "/services/marketplace" },
    ],
  },
  {
    name: "Orphanage",
    href: "/orphanage",
    subpages: [
      { name: "Donate", href: "/orphanage/donate" },
      { name: "Volunteer", href: "/orphanage/volunteer" },
      { name: "Sponsorship", href: "/orphanage/sponsorship" },
    ],
  },
  {
    name: "Projects",
    href: "/projects",
    subpages: [
      { name: "Portfolio", href: "/projects/portfolio" },
      { name: "Impact Stories", href: "/projects/impact" },
    ],
  },
  {
    name: "Careers",
    href: "/careers",
    subpages: [
      { name: "Job Listings", href: "/careers/jobs" },
      { name: "Volunteer Opportunities", href: "/careers/volunteer" },
    ],
  },
  { name: "Partners", href: "/partners" },
  { name: "Contact", href: "/contact" },
];
