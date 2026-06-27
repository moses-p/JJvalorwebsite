import { Briefcase, Heart, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
  const jobOpenings = [
    { title: "Project Manager", dept: "Construction", type: "Full-time", location: "Gayaza, Uganda" },
    { title: "Events Coordinator", dept: "Events", type: "Full-time", location: "Gayaza, Uganda" },
    { title: "Agricultural Officer", dept: "Agriculture", type: "Full-time", location: "Gayaza, Uganda" },
    { title: "Graphic Designer", dept: "Branding", type: "Remote", location: "Remote" },
  ];

  const volunteerOps = [
    { title: "Teaching Assistant", area: "Education", time: "10 hours/week" },
    { title: "Event Volunteer", area: "Events", time: "As needed" },
    { title: "Orphanage Support", area: "Community", time: "Flexible" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">Careers & Volunteers</h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">Join our team and help us build businesses that build lives</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Current Openings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobOpenings.map((job, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 border border-gray-100 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg hover:shadow-xl">
                    <Briefcase className="w-6 h-6 text-white hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium hover:bg-green-200 transition-colors duration-300">Open</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{job.title}</h3>
                <div className="space-y-1 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  <p>{job.dept} • {job.type}</p>
                  <p>{job.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Volunteer Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {volunteerOps.map((vol, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <Heart className="w-6 h-6 text-white hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">{vol.title}</h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{vol.area} • {vol.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6 group-hover:text-blue-200 transition-colors duration-300">Ready to Join Us?</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-xl font-semibold hover:scale-105 transform active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden">
            <span className="relative z-10">Apply Now</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
        </div>
      </section>
    </div>
  );
}
