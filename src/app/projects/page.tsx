import { Building2, Calendar, Target, Users, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Construction & Real Estate",
      icon: Building2,
      description: "Residential and commercial building projects",
      status: "Ongoing",
      progress: 75,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Events Management",
      icon: Calendar,
      description: "Corporate events and weddings",
      status: "Completed",
      progress: 100,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Agriculture Initiative",
      icon: Target,
      description: "Sustainable farming and food production",
      status: "Ongoing",
      progress: 60,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Youth Training Program",
      icon: Users,
      description: "Skills development for young people",
      status: "Ongoing",
      progress: 85,
      color: "from-orange-500 to-orange-700",
    },
    {
      title: "Orphanage Project",
      icon: Building2,
      description: "Children's home construction",
      status: "Planning",
      progress: 30,
      color: "from-pink-500 to-pink-700",
    },
    {
      title: "Graphics & Branding",
      icon: CheckCircle,
      description: "Corporate identity projects",
      status: "Completed",
      progress: 100,
      color: "from-cyan-500 to-cyan-700",
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
                <div className="p-8">
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${project.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <project.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      project.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-sm text-gray-500">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`bg-gradient-to-r ${project.color} h-2 rounded-full transition-all duration-500`} style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
