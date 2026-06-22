import { companyInfo, founderStory, visionMission, meaningBehindJJValor } from "@/data/company";
import { Calendar, Target, Heart, Sparkles, Award, Users } from "lucide-react";

export default function AboutPage() {
  const milestones = [
    { year: "2022", title: "Vision Born", description: "Juliet Nantege Nababi shares her dream of building a business empire" },
    { year: "2023", title: "Planning Phase", description: "Strategic planning and team building begins" },
    { year: "Feb 2024", title: "Company Incorporated", description: "J.J Valor Enterprises Limited officially registered" },
    { year: "2024", title: "Operations Launch", description: "Full-scale operations across multiple sectors" },
  ];

  const coreValues = [
    { icon: Heart, title: "Faith-Based", description: "Guided by spiritual principles and divine inspiration" },
    { icon: Target, title: "Innovation", description: "Creative solutions that transform lives" },
    { icon: Users, title: "Community", description: "Empowering people and building legacies" },
    { icon: Award, title: "Excellence", description: "Quality service in everything we do" },
    { icon: Sparkles, title: "Creativity", description: "Unbound imagination driving progress" },
    { icon: Calendar, title: "Perseverance", description: "Courage and determination in the face of challenges" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Us</h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
            Building Businesses That Build Lives
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Company Overview</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{companyInfo.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Incorporated</div>
                    <div className="font-semibold text-gray-900">{companyInfo.incorporationDate}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Motto</div>
                    <div className="font-semibold text-gray-900">{companyInfo.motto}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-4xl font-bold">JJ</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{companyInfo.name}</h3>
                <p className="text-blue-100">{companyInfo.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{founderStory.title}</h2>
            <p className="text-xl text-gray-600">The inspiring journey of {founderStory.founder}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                {founderStory.story}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-12 h-12" />
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="text-lg leading-relaxed">{visionMission.vision}</p>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
              <div className="flex items-center gap-4 mb-6">
                <Heart className="w-12 h-12" />
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>
              <p className="text-lg leading-relaxed">{visionMission.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Key milestones in our growth story</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 text-center md:text-right md:pr-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 hidden md:block"></div>
                  <div className="flex-1 md:pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meaning Behind J.J Valor */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{meaningBehindJJValor.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">J.J</h3>
              <p className="text-blue-100 leading-relaxed">{meaningBehindJJValor.jj}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Valor</h3>
              <p className="text-blue-100 leading-relaxed">{meaningBehindJJValor.valor}</p>
            </div>
          </div>
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Our Logo</h3>
            <p className="text-blue-100 leading-relaxed">{meaningBehindJJValor.logo}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
