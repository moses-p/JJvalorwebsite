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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Education & Training</h1>
          <p className="text-xl text-indigo-100">Youth empowerment and skills development programs</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {programs.map((program, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <program.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-sm text-gray-600">{program.description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{course.name}</h3>
                  <p className="text-sm text-gray-500">{course.duration}</p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Learn New Skills?</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold">
            Enroll Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
