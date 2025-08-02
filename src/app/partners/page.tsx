'use client';
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBuilding, FaUniversity, FaGraduationCap, FaUsers, FaHandshake, FaGlobe, FaChartLine, FaAward, FaStar, FaQuoteLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState('universities');

  useEffect(() => {
    // Smooth scrolling for anchor links
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all sections for animations
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const partnerCategories = {
    universities: {
      title: "University Partners",
      description: "Leading educational institutions providing world-class programs",
      icon: FaUniversity,
      partners: [
        {
          name: "Harvard University",
          logo: "https://logos-world.net/wp-content/uploads/2021/01/Harvard-Logo.png",
          description: "Ivy League university offering online courses and exchange programs",
          programs: ["Business Analytics", "Computer Science", "Data Science"],
          students: "2,500+"
        },
        {
          name: "Stanford University", 
          logo: "https://logos-world.net/wp-content/uploads/2020/06/Stanford-Logo.png",
          description: "Leading technology and innovation programs",
          programs: ["AI & Machine Learning", "Entrepreneurship", "Engineering"],
          students: "1,800+"
        },
        {
          name: "MIT",
          logo: "https://logos-world.net/wp-content/uploads/2020/06/MIT-Logo.png", 
          description: "World-renowned technology and science programs",
          programs: ["Engineering", "Computer Science", "Innovation"],
          students: "2,200+"
        },
        {
          name: "University of Cambridge",
          logo: "https://logos-world.net/wp-content/uploads/2021/01/Cambridge-Logo.png",
          description: "Historic university with cutting-edge research programs",
          programs: ["Research Programs", "Liberal Arts", "Sciences"],
          students: "1,500+"
        }
      ]
    },
    corporates: {
      title: "Corporate Partners",
      description: "Industry leaders offering skill development and internship opportunities",
      icon: FaBuilding,
      partners: [
        {
          name: "Google",
          logo: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png",
          description: "Technology giant offering career development programs",
          programs: ["Digital Marketing", "Cloud Computing", "AI/ML"],
          students: "5,000+"
        },
        {
          name: "Microsoft",
          logo: "https://logos-world.net/wp-content/uploads/2020/04/Microsoft-Logo.png",
          description: "Leading software company with comprehensive training programs",
          programs: ["Azure Certification", "Software Development", "Data Analytics"],
          students: "4,200+"
        },
        {
          name: "Amazon",
          logo: "https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png",
          description: "E-commerce and cloud computing leader",
          programs: ["AWS Training", "Supply Chain", "Business Development"],
          students: "3,800+"
        },
        {
          name: "Meta",
          logo: "https://logos-world.net/wp-content/uploads/2021/10/Meta-Logo.png",
          description: "Social media and metaverse technology company",
          programs: ["Social Media Marketing", "VR/AR Development", "Product Management"],
          students: "2,900+"
        }
      ]
    },
    platforms: {
      title: "Learning Platform Partners",
      description: "Online education platforms providing flexible learning solutions",
      icon: FaGraduationCap,
      partners: [
        {
          name: "Coursera",
          logo: "https://logos-world.net/wp-content/uploads/2021/03/Coursera-Logo.png",
          description: "World's largest online learning platform",
          programs: ["Professional Certificates", "Degrees", "Specializations"],
          students: "8,500+"
        },
        {
          name: "Udacity",
          logo: "https://logos-world.net/wp-content/uploads/2021/05/Udacity-Logo.png",
          description: "Tech-focused online education with industry partnerships",
          programs: ["Nanodegrees", "Tech Skills", "Career Services"],
          students: "3,200+"
        },
        {
          name: "edX",
          logo: "https://logos-world.net/wp-content/uploads/2021/03/edX-Logo.png",
          description: "Non-profit online learning platform by Harvard and MIT",
          programs: ["MicroMasters", "Professional Education", "University Courses"],
          students: "4,700+"
        },
        {
          name: "Skillshare",
          logo: "https://logos-world.net/wp-content/uploads/2021/06/Skillshare-Logo.png",
          description: "Creative and business skills learning community",
          programs: ["Creative Skills", "Business Skills", "Technology"],
          students: "2,100+"
        }
      ]
    }
  };

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Dean of Students, Harvard University",
      content: "Upsy has revolutionized how students access our programs. We've seen a 40% increase in student enrollment from diverse backgrounds.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Learning Director, Google",
      content: "The partnership with Upsy has enabled us to reach talented students who might not have had access to our programs otherwise.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "VP Education, Coursera",
      content: "Upsy's innovative financing model aligns perfectly with our mission to make quality education accessible to everyone.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5
    }
  ];

  const benefits = [
    {
      icon: FaUsers,
      title: "Increased Enrollment",
      description: "Partners see 35% average increase in student applications"
    },
    {
      icon: FaGlobe,
      title: "Global Reach",
      description: "Access to students from 50+ countries worldwide"
    },
    {
      icon: FaChartLine,
      title: "Better Outcomes",
      description: "Higher completion rates and student satisfaction"
    },
    {
      icon: FaAward,
      title: "Quality Assurance",
      description: "Rigorous vetting process ensures program quality"
    }
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .glass-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .glass-card-dark {
          backdrop-filter: blur(16px);
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .initial-hidden {
          opacity: 0;
          transform: translateY(30px);
        }
        
        .tab-active {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
        }
        
        .partner-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .partner-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          border-color: rgba(59, 130, 246, 0.3);
        }
      `}</style>
      
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-transparent"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="initial-hidden animate-slideInLeft">
                  <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full font-medium mb-6">
                    <FaHandshake className="mr-2" />
                    Our Partners
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    Partnering with 
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                      World-Class Institutions
                    </span>
                  </h1>
                </div>
                <div className="initial-hidden animate-fadeIn" style={{animationDelay: '0.3s'}}>
                  <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed font-light">
                    We collaborate with leading universities, corporations, and learning platforms to bring you the best educational opportunities. Together, we're making quality education accessible to everyone.
                  </p>
                </div>
                <div className="initial-hidden animate-scaleIn" style={{animationDelay: '0.6s'}}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                    <Link 
                      href="/form" 
                      className="group bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-white/50"
                    >
                      <span className="group-hover:mr-2 transition-all duration-300">Become a Partner</span>
                      <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                    <a 
                      href="#partners" 
                      className="glass-card text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 focus:ring-4 focus:ring-white/30"
                    >
                      Explore Partners
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="initial-hidden animate-fadeIn" style={{animationDelay: '0.9s'}}>
                <div className="relative">
                  <div className="glass-card rounded-3xl p-8 hover-lift">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white/10 rounded-xl">
                        <h3 className="text-3xl font-bold text-yellow-300">150+</h3>
                        <p className="text-blue-100">Partner Institutions</p>
                      </div>
                      <div className="text-center p-4 bg-white/10 rounded-xl">
                        <h3 className="text-3xl font-bold text-yellow-300">50+</h3>
                        <p className="text-blue-100">Countries</p>
                      </div>
                      <div className="text-center p-4 bg-white/10 rounded-xl">
                        <h3 className="text-3xl font-bold text-yellow-300">25K+</h3>
                        <p className="text-blue-100">Students Supported</p>
                      </div>
                      <div className="text-center p-4 bg-white/10 rounded-xl">
                        <h3 className="text-3xl font-bold text-yellow-300">95%</h3>
                        <p className="text-blue-100">Success Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Partner Benefits Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white animate-on-scroll initial-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Why Partner With Us
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Benefits for 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> Our Partners</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join our network of leading institutions and unlock new opportunities for growth and impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Showcase Section */}
      <section id="partners" className="py-24 lg:py-32 bg-white animate-on-scroll initial-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Our Trusted 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> Partners</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Explore our diverse network of educational institutions, corporations, and platforms.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.entries(partnerCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === key 
                      ? 'tab-active shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <category.icon className="mr-2" />
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* Partners Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {partnerCategories[activeTab as keyof typeof partnerCategories].title}
                </h3>
                <p className="text-gray-600">
                  {partnerCategories[activeTab as keyof typeof partnerCategories].description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {partnerCategories[activeTab as keyof typeof partnerCategories].partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    className="partner-card bg-white rounded-2xl p-6 shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="h-16 flex items-center justify-center mb-6">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="max-h-12 max-w-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = 'w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center';
                          fallback.innerHTML = `<span class="text-blue-600 font-bold">${partner.name.charAt(0)}</span>`;
                          target.parentNode?.appendChild(fallback);
                        }}
                      />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-gray-500">Programs:</div>
                      <div className="flex flex-wrap gap-1">
                        {partner.programs.slice(0, 2).map((program, i) => (
                          <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {program}
                          </span>
                        ))}
                        {partner.programs.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{partner.programs.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {partner.students} students
                      </span>
                      <FaArrowRight className="text-blue-600" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white animate-on-scroll initial-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6">
              <FaStar className="mr-2" />
              What Partners Say
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Success Stories from 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> Our Partners</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                </div>
                <FaQuoteLeft className="text-blue-600 text-2xl mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white animate-on-scroll initial-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400"> Partner with Us?</span>
            </h2>
            <p className="text-xl lg:text-2xl mb-12 text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Join our growing network of partners and help us make quality education accessible to students worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/form" 
                className="group bg-white text-blue-700 px-10 py-5 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-white/50"
              >
                <span className="group-hover:mr-2 transition-all duration-300">Start Partnership</span>
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              
              <a 
                href="mailto:partners@upsy.com" 
                className="glass-card text-white px-10 py-5 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 focus:ring-4 focus:ring-white/30"
              >
                Contact Partnership Team
              </a>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="glass-card rounded-xl p-6">
                <FaCheckCircle className="text-3xl text-green-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Quick Setup</h3>
                <p className="text-blue-100">Get started in under 24 hours</p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <FaUsers className="text-3xl text-yellow-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
                <p className="text-blue-100">Personal partnership manager</p>
              </div>
              <div className="glass-card rounded-xl p-6">
                <FaChartLine className="text-3xl text-purple-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Growth Insights</h3>
                <p className="text-blue-100">Real-time analytics dashboard</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
