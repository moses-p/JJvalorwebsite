import { Calendar, Target, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import DynamicProjectsGrid from "@/components/DynamicProjectsGrid";

export default function ProjectsPage() {
  const impactStories = [
    {
      title: "25+ Projects Completed",
      description: "Across multiple sectors and communities",
      icon: Target,
    },
    {
      title: "10+ Communities Impacted",
      description: "Creating lasting change in Uganda",
      icon: Users,
    },
    {
      title: "50+ Youth Trained",
      description: "Empowering the next generation",
      icon: Calendar,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Projects & Portfolio</h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
            Our completed and ongoing projects across various sectors
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStories.map((story, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                  <story.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{story.title}</h3>
                <p className="text-gray-600">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Projects</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our diverse portfolio of projects transforming communities
            </p>
          </div>
          <DynamicProjectsGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Want to Partner With Us?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Join us in creating impactful projects that transform communities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-900 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/partners"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
