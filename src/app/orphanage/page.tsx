import { Heart, Users, Home, GraduationCap, Apple, Stethoscope, Church, HandHeart, CreditCard, Smartphone, Building2, Mail } from "lucide-react";

export default function OrphanagePage() {
  const currentNeeds = [
    { icon: Home, title: "Buildings", description: "Construction of dormitories and classrooms" },
    { icon: Users, title: "Beds & Furniture", description: "Comfortable sleeping and living arrangements" },
    { icon: GraduationCap, title: "School Materials", description: "Books, uniforms, and learning supplies" },
    { icon: Users, title: "Computers", description: "Technology for education and skills training" },
    { icon: Stethoscope, title: "Medical Supplies", description: "First aid and healthcare equipment" },
    { icon: Heart, title: "Clothing", description: "Daily wear and seasonal clothing" },
    { icon: Users, title: "Playground Equipment", description: "Safe and fun recreational facilities" },
    { icon: Apple, title: "Food", description: "Nutritious meals and groceries" },
    { icon: Building2, title: "Vehicles", description: "Transportation for children and staff" },
    { icon: Users, title: "Caregivers", description: "Loving staff to care for the children" },
    { icon: GraduationCap, title: "Teachers", description: "Qualified educators for the children" },
    { icon: Church, title: "Spiritual Guidance", description: "Counselors and mentors" },
  ];

  const sponsorshipOptions = [
    { icon: Heart, title: "Sponsor a Child", description: "Provide comprehensive care for a child", amount: "UGX 500,000/month" },
    { icon: GraduationCap, title: "Sponsor Education", description: "Cover school fees and supplies", amount: "UGX 300,000/month" },
    { icon: Apple, title: "Sponsor Feeding", description: "Provide meals for children", amount: "UGX 200,000/month" },
    { icon: Stethoscope, title: "Sponsor Healthcare", description: "Medical care and check-ups", amount: "UGX 150,000/month" },
    { icon: Building2, title: "Corporate Sponsorship", description: "Partner with us as a business", amount: "Custom" },
    { icon: HandHeart, title: "Monthly Giving", description: "Regular support of any amount", amount: "Any amount" },
  ];

  const volunteerOpportunities = [
    { icon: GraduationCap, title: "Teachers", description: "Educate and mentor children" },
    { icon: Heart, title: "Caregivers", description: "Provide daily care and support" },
    { icon: Users, title: "Nannies", description: "Assist with childcare needs" },
    { icon: Stethoscope, title: "Doctors", description: "Provide medical care" },
    { icon: Church, title: "Counselors", description: "Offer emotional and spiritual support" },
    { icon: Users, title: "Cleaners", description: "Maintain clean facilities" },
    { icon: Users, title: "Administrators", description: "Help with operations" },
    { icon: Heart, title: "Mission Teams", description: "Short-term mission trips" },
  ];

  const donationMethods = [
    { icon: Smartphone, title: "MTN Mobile Money", number: "+256705691361" },
    { icon: Smartphone, title: "Airtel Money", number: "+256777619877" },
    { icon: Building2, title: "Bank Transfer", details: "Account details available on request" },
    { icon: CreditCard, title: "Visa/Mastercard", details: "Online payment coming soon" },
    { icon: Mail, title: "PayPal", details: "jonvalors@gmail.com" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJzLTItMi00LTJjMCAwLTItMi00LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Children's Orphanage Project</h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-8">
            Building a future home on one acre of land — providing shelter, education, healthcare, nutrition, and spiritual growth
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#donate"
              className="px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-orange-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Donate Now
            </a>
            <a
              href="#volunteer"
              className="px-8 py-4 bg-orange-800 text-white rounded-xl hover:bg-orange-900 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To create a loving home where children can grow, learn, and thrive in a safe environment with access to quality education, healthcare, nutrition, and spiritual guidance.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { icon: Home, label: "Shelter" },
              { icon: GraduationCap, label: "Education" },
              { icon: Stethoscope, label: "Healthcare" },
              { icon: Apple, label: "Nutrition" },
              { icon: Church, label: "Spiritual Growth" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <div className="font-semibold text-gray-900">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Needs */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Current Needs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We are seeking support for the following items and services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentNeeds.map((need, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <need.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{need.title}</h3>
                <p className="text-gray-600">{need.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Opportunities */}
      <section id="donate" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sponsorship Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose how you'd like to make a difference
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsorshipOptions.map((option, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200 hover:border-orange-400 transition-colors">
                <div className="w-12 h-12 mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <option.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="text-lg font-semibold text-orange-600">{option.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How to Donate</h2>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              Choose your preferred donation method
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donationMethods.map((method, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="w-12 h-12 mb-4 bg-white/20 rounded-lg flex items-center justify-center">
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-blue-100">{method.number || method.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Portal */}
      <section id="volunteer" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Volunteer Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our team and make a hands-on difference
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <opportunity.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{opportunity.title}</h3>
                <p className="text-sm text-gray-600">{opportunity.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Apply to Volunteer
              <Heart className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Donation Transparency */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Donation Transparency</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We believe in complete financial accountability
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Progress Tracking</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Funds Raised</span>
                      <span className="font-semibold text-gray-900">UGX 15,000,000</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Target Amount</span>
                      <span className="font-semibold text-gray-900">UGX 50,000,000</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Provide</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Regular financial reports
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Project progress updates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Impact stories and testimonials
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Donation receipts
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Anonymous donation options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Make a Difference Today
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Your support can transform lives and build a brighter future for children in need
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#donate"
              className="px-8 py-4 bg-white text-orange-600 rounded-xl hover:bg-orange-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Donate Now
            </a>
            <a
              href="/contact"
              className="px-8 py-4 bg-orange-800 text-white rounded-xl hover:bg-orange-900 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
