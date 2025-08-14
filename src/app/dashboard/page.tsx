'use client';

import React, { useEffect, useState } from 'react';
import { User, CheckCircle, Phone, Mail, CreditCard, IdCard, GraduationCap, LogOut } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">upsy</h1>
              <div className="w-8 h-1 bg-orange-500 ml-2 rounded-full"></div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            {user.userType === 'student' 
              ? 'Ready to explore new loan opportunities?' 
              : 'Let\'s help your child achieve their educational goals.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-sm text-gray-600 capitalize">{user.userType}</span>
                  {user.isEmailVerified && (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail size={20} className="text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Email</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={20} className="text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Mobile</div>
                    <div className="text-sm text-gray-600">{user.mobile}</div>
                  </div>
                </div>

                {user.collegeEmail && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <GraduationCap size={20} className="text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">College Email</div>
                      <div className="text-sm text-gray-600">{user.collegeEmail}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard size={24} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Applications</h3>
                    <p className="text-2xl font-bold text-gray-800">0</p>
                    <p className="text-sm text-gray-600">Loan applications</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={24} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Status</h3>
                    <p className="text-2xl font-bold text-green-600">Verified</p>
                    <p className="text-sm text-gray-600">Account status</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Getting Started */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Getting Started</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-xl p-6 hover:border-orange-300 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Complete Profile</h3>
                  <p className="text-gray-600 mb-4">Add additional information to improve your loan eligibility.</p>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Complete Profile
                  </button>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 hover:border-orange-300 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {user.userType === 'student' ? 'Browse Loans' : 'Explore Options'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {user.userType === 'student' 
                      ? 'Discover education loans tailored for you.'
                      : 'Find the best education loans for your child.'
                    }
                  </p>
                  <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-all">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
