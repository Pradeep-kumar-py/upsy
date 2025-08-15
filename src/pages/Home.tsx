'use client';
import Navbar from "@/components/Navbar";
import SubmissionForm from "@/components/SubmissionForm";
import Link from "next/link";
import React, { useEffect } from "react";

export default function HomePage() {
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
      `}</style>

      <Navbar />
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
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
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    Invest in dreams
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400 animate-pulse">
                      Not in upfront Dues
                    </span>
                  </h1>
                </div>
                <div className="initial-hidden mb-16 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                  <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed font-light">
                    Get instant, reliable access to learning—starting day zero.
                    No upfront payment required, so you can focus on what matters most.
                  </p>
                </div>
                <div className="initial-hidden animate-scaleIn" style={{ animationDelay: '0.6s' }}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                    <Link
                      href="/form"
                      className="group bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-white/50"
                    >
                      <span className="group-hover:mr-2 transition-all duration-300">Get Early Access</span>
                      <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                    <a
                      href="#how-it-works"
                      className="glass-card text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 focus:ring-4 focus:ring-white/30"
                    >
                      Learn How It Works
                    </a>
                  </div>
                </div>
              </div>

              <div className="initial-hidden animate-fadeIn" style={{ animationDelay: '0.9s' }}>
                <div className="relative">
                  <div className="glass-card rounded-3xl p-8 hover-lift">
                    <img
                      src="https://img.freepik.com/free-photo/college-friends-teamworking_1098-15709.jpg?t=st=1752571988~exp=1752575588~hmac=8c387279807183f649e1f63fccb1e849a5e81174ee77f6eea4645c3afca9bdbb"
                      alt="Group of students collaborating on a project"
                      className="w-full h-80 object-cover rounded-2xl"
                      loading="eager"
                    />
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

      {/* What is Upsy */}
      <section id="what-is-upsy" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white animate-on-scroll initial-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              What is Upsy?
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              A revolutionary way to fund
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> your dreams</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Without any upfront stress
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="prose prose-lg">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 leading-tight">
                  Upsy ensures your learning begins from day one, free from the upfront payment stress. <br /> Students or parents—
                  <span className="text-blue-600">Upsy’s got you covered </span> every step of the way.

                </h3>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">One stop solution</h4>
                      <p className="text-gray-600">Connect direct from the partner outlet</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Pay nothing now</h4>
                      <p className="text-gray-600">Your repayments broken into parts</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">On spot confirmation</h4>
                      <p className="text-gray-600">Get your enrollment confirmed in the first visit</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
                  <p className="text-blue-800 font-medium text-center">
                    We believe your time is better spent learning, not filling out lengthy information portals.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="glass-card-dark rounded-3xl p-8 hover-lift">
                  <img
                    src="https://img.freepik.com/free-photo/young-woman-working-laptop-floor-white-background_231208-9495.jpg?t=st=1752571898~exp=1752575498~hmac=ea50b6599f0e931827ca1f08f030ed31db827241f43804b579e9a5d1cfcd6f7e&w=2000"
                    alt="Student studying with laptop"
                    className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                  />
                </div>

                {/* Floating stats cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 hover-lift">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">Low</div>
                    <div className="text-sm text-gray-600">Interest</div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 hover-lift">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">Zero</div>
                    <div className="text-sm text-gray-600">Hurdles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-white animate-on-scroll initial-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              How It Works
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Simple, transparent,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> student-first</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four simple steps to fund your dreams without traditional loans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="group relative">
              <div className="glass-card-dark rounded-3xl p-8 h-full hover-lift group-hover:bg-blue-50 transition-all duration-500">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for what you need</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">Apply for the course on the website after signing in.</p>

                  {/* Connection line */}
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300 transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="glass-card-dark rounded-3xl p-8 h-full hover-lift group-hover:bg-blue-50 transition-all duration-500">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Digital KYC</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">Check eligibility with minimum document requirements.</p>

                  {/* Connection line */}
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300 transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="glass-card-dark rounded-3xl p-8 h-full hover-lift group-hover:bg-blue-50 transition-all duration-500">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">We pay directly</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">Check eligibility with minimum document requirements.</p>

                  {/* Connection line */}
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300 transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="glass-card-dark rounded-3xl p-8 h-full hover-lift group-hover:bg-blue-50 transition-all duration-500">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Repay in parts</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">Simple, transparent auto-debit plan to repay</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl px-8 py-4">
              {/* <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg> */}
              <span className="text-lg font-semibold text-gray-900">
                Our technology handles complexity,<br />
                <span className="text-blue-600"> so you don’t have to be tech savvy.</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section id="who-its-for" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white animate-on-scroll initial-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Who It's For
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Made for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> ambitious learners</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Perfect for learners who dream big but need smart funding solutions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="group">
              <div className="glass-card-dark rounded-3xl p-8 h-full hover-lift group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4">students</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">Ambitious learners seeking flexible, affordable education</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="glass-card-dark rounded-3xl p-8 h-full hover-lift group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🌍</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4">parents</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">Making quality education affordable for your child’s future</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="glass-card-dark rounded-3xl p-8 h-full hover-lift group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🎓</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4">employees</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">Professionals upgrading skills for career growth</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="glass-card-dark rounded-3xl p-8 h-full hover-lift group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🥳</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-4">Job seekers</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">Motivated candidates preparing for new roles</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 max-w-4xl mx-auto">
              <p className="text-xl text-gray-800">
                We're here for anyone who says:
                <br />
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 block mt-2">
                  "I can't afford this right now — but I will soon."
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Use Case Examples */}
      {/* <section id="use-cases" className="py-24 lg:py-32 bg-white animate-on-scroll initial-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Success Stories
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Real students,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> real success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how Upsy has helped students achieve their dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group">
              <div className="glass-card-dark rounded-3xl overflow-hidden hover-lift h-full">
                <div className="aspect-w-16 aspect-h-10">
                  <img
                    src="https://img.freepik.com/free-photo/person-working-animation-porject_23-2149269895.jpg"
                    alt="Student coding on laptop"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">M</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-600 text-lg">Manav, 21</h3>
                      <p className="text-sm text-gray-500">Data Science Course</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Used Upsy for a ₹25K data course → Got job in 4 months → Paying ₹1.5K/month (5% income)
                  </p>
                  <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-600">
                    "They trusted me when no one else did."
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="glass-card-dark rounded-3xl overflow-hidden hover-lift h-full">
                <div className="aspect-w-16 aspect-h-10">
                  <img
                    src="https://img.freepik.com/free-photo/portrait-female-college-student-holding-book-hand-smiling-camera_23-2148093193.jpg?semt=ais_hybrid&w=740"
                    alt="Student traveling abroad"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">I</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-600 text-lg">Isha, 20</h3>
                      <p className="text-sm text-gray-500">Foreign Internship</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Used Upsy to fund a foreign internship → Repayment paused during gap year
                  </p>
                  <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-600">
                    "They trusted me when no one else did."
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="glass-card-dark rounded-3xl overflow-hidden hover-lift h-full">
                <div className="aspect-w-16 aspect-h-10">
                  <img
                    src="https://i.pinimg.com/736x/00/73/1c/00731cf8c1391d7b73f8f0bff982b9ff.jpg"
                    alt="Student preparing for MBA"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-600 text-lg">Ananya, 22</h3>
                      <p className="text-sm text-gray-500">MBA Preparation</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    MBA entrance coaching via Upsy → Paid back in 7 months after placement
                  </p>
                  <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-600">
                    "They trusted me when no one else did."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Safe, Secure & Student-First */}
      <section id="safe-secure" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white animate-on-scroll initial-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Trust & Safety
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Safe, secure &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> student-first</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with student welfare and protection as our top priority
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="group">
              <div className="glass-card-dark rounded-3xl p-8 hover-lift group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500 h-full">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Trustworthy & transparent</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">No gimmicky promises and hidden charges  ever</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="glass-card-dark rounded-3xl p-8 hover-lift group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-500 h-full">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 WhatsApp Support</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">Always available when you need us, with friendly human support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Form */}
      <section id="early-access" className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-32 overflow-hidden animate-on-scroll initial-hidden">
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to fund
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400"> your dreams?</span>
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 mb-12 leading-relaxed">
              Join our early access program and be among the first to experience the future of student financing.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/form"
                className="group bg-white text-blue-700 px-10 py-5 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl focus:ring-4 focus:ring-white/50 text-lg"
              >
                <span className="group-hover:mr-2 transition-all duration-300">Get Early Access</span>
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              <Link
                href="#"
                className="glass-card text-white px-10 py-5 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 focus:ring-4 focus:ring-white/30 text-lg"
              >
                📞 Chat with Team Upsy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white animate-on-scroll initial-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              FAQs
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Got
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> questions?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've answered the most common questions about how Upsy works
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="group">
              <div className="glass-card-dark rounded-3xl p-8 hover-lift group-hover:bg-blue-50 transition-all duration-500">
                <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-sm">?</span>
                  Is this a loan?
                </h3>
                <p className="text-gray-700 leading-relaxed pl-11">No. You pay only if you earn. No interest, no credit score needed. It's an Income Share Agreement (ISA).</p>
              </div>
            </div>

            <div className="group">
              <div className="glass-card-dark rounded-3xl p-8 hover-lift group-hover:bg-blue-50 transition-all duration-500">
                <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-sm">?</span>
                  What if I never get a job?
                </h3>
                <p className="text-gray-700 leading-relaxed pl-11">You don't repay. That's the risk we take for believing in you and your potential.</p>
              </div>
            </div>

            <div className="group">
              <div className="glass-card-dark rounded-3xl p-8 hover-lift group-hover:bg-blue-50 transition-all duration-500">
                <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-sm">?</span>
                  Will you harass me if I delay payments?
                </h3>
                <p className="text-gray-700 leading-relaxed pl-11">Never. Our model is designed around trust and flexibility. We believe in supporting students, not pressuring them.</p>
              </div>
            </div>

            <div className="group">
              <div className="glass-card-dark rounded-3xl p-8 hover-lift group-hover:bg-blue-50 transition-all duration-500">
                <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-sm">?</span>
                  Can I use this for fun stuff like trips?
                </h3>
                <p className="text-gray-700 leading-relaxed pl-11">Yes! As long as you agree to repay from your future income. We believe experiences matter too.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Upsy</div>
              </div>
              <p className="text-gray-300 max-w-md text-lg leading-relaxed mb-6">
                Fund your DREAM faster without upfront stress
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.45 20.45h-3.85v-5.6c0-1.32-.47-2.22-1.63-2.22-.89 0-1.42.6-1.65 1.18-.08.21-.1.5-.1.79v5.85h-3.85s.05-9.5 0-10.48h3.85v1.48c-.01.02-.03.04-.04.06h.04v-.06c.51-.78 1.42-1.9 3.47-1.9 2.53 0 4.43 1.65 4.43 5.19v6.71zM5.34 8.68c-1.24 0-2.05-.82-2.05-1.85 0-1.05.83-1.85 2.1-1.85 1.24 0 2.05.8 2.05 1.85-.02 1.03-.83 1.85-2.1 1.85zm1.92 11.77h-3.85V9.97h3.85v10.48z" />
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zm0 5.84c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 9.9c-2.14 0-3.9-1.76-3.9-3.9s1.76-3.9 3.9-3.9 3.9 1.76 3.9 3.9-1.76 3.9-3.9 3.9zm7.85-10.1c0 .77-.62 1.4-1.4 1.4-.77 0-1.4-.62-1.4-1.4 0-.78.62-1.4 1.4-1.4.78 0 1.4.62 1.4 1.4z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6 text-lg">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2">How It Works</a></li>
                <li><a href="#who-its-for" className="text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2">Who It's For</a></li>
                <li><a href="#faqs" className="text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2">FAQs</a></li>
                <li><a href="#early-access" className="text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2">Early Access</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-6 text-lg">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hover:pl-2">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="text-center">
              <p className="text-gray-400 mb-4 text-lg">
                Have questions?
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-semibold ml-2">
                  Chat with Team Upsy →
                </a>
              </p>
              <p className="text-gray-500">
                © 2025 Upsy. All rights reserved. Building the future of student financing.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
