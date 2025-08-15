'use client';

import React, { useEffect, useState } from 'react';
import { 
  User, CheckCircle, Phone, Mail, CreditCard, IdCard, GraduationCap, LogOut,
  Search, Bell, Settings, Award, Calendar, TrendingUp, BookOpen, Users, 
  Target, Star, ArrowRight, Clock, Filter, Heart, Share, Eye
} from 'lucide-react';
import DashboardNavbar from '@/components/DashboardNavbar';
import OpportunityCard from '@/components/OpportunityCard';

interface UserData {
  id: string;
  name: string;
  email: string;
  mobile: string;
  userType: 'parent' | 'student';
  collegeEmail?: string;
  isEmailVerified: boolean;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('opportunities');

  const profileCompletion = 75; // Mock data

  const opportunities = [
    {
      id: 1,
      title: "Adobe India Hackathon",
      company: "Adobe",
      type: "Hackathon",
      deadline: "25 Aug 2025",
      status: "Open",
      participants: "2.5K+",
      logo: "🎨"
    },
    {
      id: 2,
      title: "Google Summer of Code",
      company: "Google",
      type: "Internship",
      deadline: "30 Aug 2025",
      status: "Open",
      participants: "10K+",
      logo: "🔍"
    },
    {
      id: 3,
      title: "Microsoft Coding Challenge",
      company: "Microsoft",
      type: "Competition",
      deadline: "15 Sep 2025",
      status: "Open",
      participants: "5K+",
      logo: "💻"
    }
  ];

  const activities = [
    { type: "Applied", item: "TCS Digital Internship", time: "2 hours ago" },
    { type: "Bookmarked", item: "Flipkart Data Science Role", time: "1 day ago" },
    { type: "Viewed", item: "Amazon SDE Position", time: "3 days ago" }
  ];

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to login if no user data
      window.location.href = '/auth/login';
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navbar */}
      <DashboardNavbar 
        user={user ? { name: user.name, email: user.email } : undefined}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Unlock Your Career
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Explore opportunities from across the globe to grow, showcase skills, gain CV points & get hired by your dream company.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Complete my profile
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Get recommendations
                </button>
              </div>
            </div>
            
            {/* Profile completion widget */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Profile Completion</h3>
                <span className="text-2xl font-bold">{profileCompletion}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
              <p className="text-sm text-blue-100">
                You're missing out on opportunities to create an impact!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <OpportunityCard
            title="Internships"
            count={8}
            description="Gain Experience"
            icon={GraduationCap}
            gradient="bg-gradient-to-r from-green-500 to-green-600"
            textColor="text-green-100"
          />
          
          <OpportunityCard
            title="Jobs"
            count={12}
            description="Advance Career"
            icon={Target}
            gradient="bg-gradient-to-r from-blue-500 to-blue-600"
            textColor="text-blue-100"
          />
          
          <OpportunityCard
            title="Competitions"
            count={5}
            description="Battle Challenges"
            icon={Award}
            gradient="bg-gradient-to-r from-purple-500 to-purple-600"
            textColor="text-purple-100"
          />
          
          <OpportunityCard
            title="More"
            count={15}
            description="Explore All"
            icon={BookOpen}
            gradient="bg-gradient-to-r from-orange-500 to-orange-600"
            textColor="text-orange-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
              <div className="flex border-b border-gray-200">
                {[
                  { key: 'opportunities', label: 'My Opportunities', icon: Target },
                  { key: 'activity', label: 'My Activity', icon: Clock },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'opportunities' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Recommended for You</h2>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Filter size={16} />
                          Filter
                        </button>
                      </div>
                    </div>

                    {opportunities.map((opportunity) => (
                      <div key={opportunity.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                              {opportunity.logo}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800 text-lg">{opportunity.title}</h3>
                              <p className="text-gray-600">{opportunity.company}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                                  {opportunity.type}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {opportunity.participants} registered
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                              <Heart size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                              <Share size={20} />
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar size={16} />
                            Deadline: {opportunity.deadline}
                          </div>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                            Apply Now
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
                    {activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {activity.type === 'Applied' && <Target size={20} className="text-blue-600" />}
                          {activity.type === 'Bookmarked' && <Heart size={20} className="text-red-500" />}
                          {activity.type === 'Viewed' && <Eye size={20} className="text-gray-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800">
                            <span className="font-medium">{activity.type}</span> {activity.item}
                          </p>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-sm text-gray-600">{user?.email}</span>
                  {user?.isEmailVerified && (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                </div>
                <div className="mt-4">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 mx-auto">
                    View Profile
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Profile Completion</span>
                  <span className="font-medium text-gray-800">{profileCompletion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full"
                    style={{ width: `${profileCompletion}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">For Users</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <User className="text-blue-500" size={20} />
                  <span className="text-gray-700">Registrations/Applications</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Target className="text-green-500" size={20} />
                  <span className="text-gray-700">My Jobs & Internships</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Star className="text-purple-500" size={20} />
                  <span className="text-gray-700">My Opportunities</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Users className="text-orange-500" size={20} />
                  <span className="text-gray-700">Referrals</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Award className="text-red-500" size={20} />
                  <span className="text-gray-700">My Rounds</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <TrendingUp className="text-indigo-500" size={20} />
                  <span className="text-gray-700">Unstop Awards Nominations</span>
                </button>
              </div>
            </div>

            {/* Company Logos */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Featured Companies</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'Walmart', logo: '🏪', color: 'bg-blue-50' },
                  { name: 'Microsoft', logo: '💻', color: 'bg-green-50' },
                  { name: 'Amazon', logo: '📦', color: 'bg-orange-50' },
                  { name: 'Google', logo: '🔍', color: 'bg-red-50' },
                  { name: 'Apple', logo: '�', color: 'bg-gray-50' },
                  { name: 'Meta', logo: '📘', color: 'bg-blue-50' }
                ].map((company, index) => (
                  <div 
                    key={index} 
                    className={`w-16 h-16 ${company.color} rounded-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform cursor-pointer border border-gray-100 hover:border-gray-200`}
                    title={company.name}
                  >
                    {company.logo}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All Companies →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Ready to take the next step?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Set Career Goals</h3>
              <p className="text-gray-600 mb-4">Define your career path and get personalized recommendations.</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium">Get Started →</button>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-green-300 transition-colors">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Build Network</h3>
              <p className="text-gray-600 mb-4">Connect with professionals and expand your network.</p>
              <button className="text-green-600 hover:text-green-700 font-medium">Connect Now →</button>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Earn Certificates</h3>
              <p className="text-gray-600 mb-4">Complete challenges and earn valuable certifications.</p>
              <button className="text-purple-600 hover:text-purple-700 font-medium">Explore →</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
