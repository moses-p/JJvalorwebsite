import { companyInfo } from "@/data/company";
import { Calendar, Building2, Users, Target, Award } from "lucide-react";

export default function AboutHistoryPage() {
  const timeline = [
    { year: "2022", title: "Vision Born", description: "Juliet Nantege Nababi shares her dream of building a business empire", icon: Target },
    { year: "2023", title: "Planning Phase", description: "Strategic planning and team building begins", icon: Calendar },
    { year: "Feb 2024", title: "Company Incorporated", description: "J.J Valor Enterprises Limited officially registered", icon: Building2 },
    { year: "2024", title: "Operations Launch", description: "Full-scale operations across multiple sectors", icon: Users },
    { year: "2024+", title: "Growth & Expansion", description: "Continued growth and community impact", icon: Award },
  ];

  const achievements = [
    { stat: "25+", label: "Projects Completed" },
    { stat: "10+", label: "Communities Impacted" },
    { stat: "50+", label: "Youth Trained" },
    { stat: "15+", label: "Partners" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">Company History</h1>
          <p className="text-xl text-blue-200 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">Our journey from inception to becoming a leading enterprise</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">{achievement.stat}</div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{achievement.label}</div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Timeline</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 text-center md:text-right md:pr-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                      <div className="text-2xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors duration-300">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 hidden md:block group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="flex-1 md:pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
