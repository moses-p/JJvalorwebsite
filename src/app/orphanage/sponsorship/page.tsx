import { Heart, Users, GraduationCap, Utensils, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OrphanageSponsorshipPage() {
  const sponsorshipLevels = [
    {
      level: "Basic Support",
      amount: "UGX 100,000/month",
      icon: Utensils,
      benefits: ["Meals", "Basic supplies", "Health checkups"],
      color: "from-green-500 to-green-600",
    },
    {
      level: "Education Support",
      amount: "UGX 250,000/month",
      icon: GraduationCap,
      benefits: ["All Basic benefits", "School fees", "School supplies", "Uniforms"],
      color: "from-blue-500 to-blue-600",
    },
    {
      level: "Full Sponsorship",
      amount: "UGX 500,000/month",
      icon: Heart,
      benefits: ["All Education benefits", "Medical care", "Personal mentorship", "Special activities"],
      color: "from-pink-500 to-pink-600",
    },
  ];

  const impact = [
    { stat: "50+", label: "Children waiting for sponsors" },
    { stat: "100%", label: "Of donations go to children" },
    { stat: "Monthly", label: "Updates on your sponsored child" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-600">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Sponsorship</h1>
          <p className="text-xl text-purple-100">Sponsor a child and change their future</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {impact.map((item, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-4xl font-bold text-purple-600 mb-2">{item.stat}</div>
                <div className="text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sponsorship Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {sponsorshipLevels.map((level, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 hover:border-purple-400 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <level.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{level.level}</h3>
                <div className="text-3xl font-bold text-purple-600 mb-6 text-center">{level.amount}</div>
                <ul className="space-y-3">
                  {level.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-3 h-3 text-white" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-colors">
                  Sponsor Now
                </button>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Start Your Sponsorship</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Select Sponsorship Level</option>
                {sponsorshipLevels.map((level, index) => (
                  <option key={index}>{level.level} - {level.amount}</option>
                ))}
              </select>
              <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-colors">
                Begin Sponsorship
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Questions About Sponsorship?</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold">
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
