import { Heart, Users, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OrphanageVolunteerPage() {
  const opportunities = [
    { icon: Users, title: "Teaching Assistant", description: "Help children with homework and learning", time: "Flexible" },
    { icon: Heart, title: "Caregiver", description: "Provide emotional support and care", time: "Flexible" },
    { icon: Calendar, title: "Event Organizer", description: "Plan activities and events", time: "As needed" },
    { icon: Clock, title: "Administrative Support", description: "Help with office tasks", time: "8 hours/week" },
  ];

  const benefits = [
    "Make a real impact in children's lives",
    "Gain valuable experience",
    "Certificate of appreciation",
    "Networking opportunities",
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">Volunteer</h1>
          <p className="text-xl text-orange-100 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">Join our volunteer program and make a difference</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Volunteer Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {opportunities.map((opp, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <opp.icon className="w-7 h-7 text-white hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">{opp.title}</h3>
                <p className="text-sm text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">{opp.description}</p>
                <p className="text-xs text-orange-600 font-medium group-hover:scale-110 transition-transform duration-300">{opp.time}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-in fade-in slide-in-from-left-4 duration-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-orange-600 transition-colors duration-300">Benefits</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 group hover:translate-x-1 transform transition-transform duration-300">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-in fade-in slide-in-from-right-4 duration-700">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-orange-600 transition-colors duration-300">Apply to Volunteer</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 hover:shadow-md" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 hover:shadow-md" />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 hover:shadow-md" />
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 hover:shadow-md">
                  <option>Select Opportunity</option>
                  {opportunities.map((opp, index) => (
                    <option key={index}>{opp.title}</option>
                  ))}
                </select>
                <textarea placeholder="Why do you want to volunteer?" rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 hover:border-orange-400 hover:shadow-md"></textarea>
                <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 transform active:scale-95 group relative overflow-hidden">
                  <span className="relative z-10">Submit Application</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold hover:scale-105 transform active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden">
            <span className="relative z-10">Contact Us</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
        </div>
      </section>
    </div>
  );
}
