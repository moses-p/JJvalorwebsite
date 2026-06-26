import DynamicBlogPosts from "@/components/DynamicBlogPosts";

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Blog</h1>
          <p className="text-xl text-blue-200">Articles on entrepreneurship, agriculture, and community development</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DynamicBlogPosts />
        </div>
      </section>
    </div>
  );
}
