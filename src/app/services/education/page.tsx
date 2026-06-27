import { GraduationCap, Monitor, Lightbulb, Award, Users, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesEducationPage() {
  const programs = [
    { icon: Monitor, title: "Computer Training", description: "Basic and advanced computer skills" },
    { icon: Lightbulb, title: "Entrepreneurship", description: "Business skills and startup guidance" },
    { icon: Award, title: "Skills Certification", description: "Recognized certification programs" },
    { icon: Users, title: "Youth Mentorship", description: "One-on-one guidance and support" },
  ];

  const courses = [
    { name: "Computer Basics", duration: "4 weeks" },
    { name: "Business Management", duration: "6 weeks" },
    { name: "Soap Making", duration: "2 weeks" },
    { name: "Baking & Pastry", duration: "3 weeks" },
    { name: "Candle Making", duration: "2 weeks" },
    { name: "Agricultural Skills", duration: "4 weeks" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-600">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">Education & Training</h1>
          <p className="text-xl text-indigo-100 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">Youth empowerment and skills development programs</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {programs.map((program, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <program.icon className="w-7 h-7 text-white hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">{program.title}</h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{program.description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex items-center justify-between hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-300">{course.name}</h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{course.duration}</p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Learn New Skills?</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:scale-105 transform active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden">
            <span className="relative z-10">Enroll Now</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
        </div>
      </section>
    </div>
  );
}
