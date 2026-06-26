import { founderStory } from "@/data/company";
import { Heart, Award, Users, Calendar } from "lucide-react";

export default function AboutFounderPage() {
  const milestones = [
    { year: "2000s", event: "Born and raised by a single mother after losing her father" },
    { year: "2016", event: "At age 16, conversation with uncle Kayongo ignites entrepreneurial dream" },
    { year: "2022", event: "Begins sharing vision of building a business empire with friends" },
    { year: "2022", event: "Ahmedul Raziz Sengoba becomes first believer and supporter" },
    { year: "2023", event: "Strategic planning and team building begins" },
    { year: "Feb 2024", event: "J.J Valor Enterprises Limited officially registered" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{founderStory.title}</h1>
          <p className="text-xl text-blue-200">The inspiring journey of {founderStory.founder}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 mb-12">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{founderStory.founder}</h2>
              <p className="text-gray-600">Founder & CEO, J.J Valor Enterprises Ltd</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{founderStory.story}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Milestones</h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-600 mb-1">{milestone.year}</div>
                  <p className="text-gray-600">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
