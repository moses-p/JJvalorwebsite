import { Calendar, User, ArrowRight } from "lucide-react";

export default function AboutBlogPage() {
  const blogPosts = [
    {
      title: "Building Dreams: The J.J Valor Story",
      excerpt: "How a vision became a reality and continues to transform communities",
      author: "Juliet Nantege Nababi",
      date: "June 2024",
      category: "Founder's Corner",
    },
    {
      title: "The Power of Youth Empowerment",
      excerpt: "How our training programs are changing lives in Uganda",
      author: "J.J Valor Team",
      date: "May 2024",
      category: "Impact",
    },
    {
      title: "Sustainable Agriculture for Food Security",
      excerpt: "Our approach to farming that benefits both people and planet",
      author: "Agriculture Team",
      date: "April 2024",
      category: "Agriculture",
    },
    {
      title: "Why Community Partnerships Matter",
      excerpt: "The importance of collaboration in creating lasting change",
      author: "Partnership Team",
      date: "March 2024",
      category: "Partnership",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Blog</h1>
          <p className="text-xl text-blue-200">Insights, stories, and updates from J.J Valor</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">{post.category}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <span className="text-blue-600 font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
