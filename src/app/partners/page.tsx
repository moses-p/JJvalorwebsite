import { Handshake, Building2, Heart, Target, ArrowRight, CheckCircle, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function PartnersPage() {
  const partnershipTypes = [
    {
      icon: Building2,
      title: "Corporate Partnership",
      description: "Strategic business partnerships for mutual growth",
      benefits: ["Brand visibility", "Networking opportunities", "Joint ventures"],
    },
    {
      icon: Heart,
      title: "Impact Partnership",
      description: "Support our orphanage and community projects",
      benefits: ["Social impact", "Tax benefits", "Recognition"],
    },
    {
      icon: Target,
      title: "Investment Partnership",
      description: "Invest in our growing enterprise",
      benefits: ["Equity opportunities", "ROI potential", "Growth sharing"],
    },
  ];

  const partnershipLevels = [
    {
      level: "Bronze Partner",
      minInvestment: "UGX 5M",
      benefits: ["Logo on website", "Social media mention", "Annual report feature"],
    },
    {
      level: "Silver Partner",
      minInvestment: "UGX 10M",
      benefits: ["All Bronze benefits", "Event sponsorship", "Priority collaboration"],
    },
    {
      level: "Gold Partner",
      minInvestment: "UGX 25M",
      benefits: ["All Silver benefits", "Board advisory seat", "Exclusive partnerships"],
    },
    {
      level: "Platinum Partner",
      minInvestment: "UGX 50M+",
      benefits: ["All Gold benefits", "Strategic planning input", "Co-branding opportunities"],
    },
  ];

  const currentPartners = [
    { name: "Local Businesses", count: "15+" },
    { name: "NGOs", count: "8+" },
    { name: "Educational Institutions", count: "5+" },
    { name: "Government Agencies", count: "3+" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Partners & Investors</h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
            Join our network of partners and investors building a better future together
          </p>
        </div>
      </section>

      {/* Current Partners Stats */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Growing Network</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trusted by organizations across Uganda
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {currentPartners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{partner.count}</div>
                <div className="text-gray-600">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Partnership Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the partnership model that aligns with your goals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 group"
              >
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Levels */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Partnership Levels</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Flexible partnership tiers to match your commitment level
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipLevels.map((level, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 border-2 transition-all duration-300 ${
                  index === 3
                    ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-400 shadow-xl'
                    : 'bg-white border-gray-200 hover:border-blue-400'
                }`}
              >
                <div className="text-center mb-4">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                    index === 3
                      ? 'bg-gradient-to-br from-yellow-500 to-yellow-600'
                      : 'bg-gradient-to-br from-blue-500 to-blue-700'
                  }`}>
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{level.level}</h3>
                  <div className="text-2xl font-bold text-blue-600 mt-2">{level.minInvestment}</div>
                </div>
                <ul className="space-y-2 text-sm">
                  {level.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Let's discuss how we can work together to create lasting impact
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/orphanage"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Support Our Mission
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
