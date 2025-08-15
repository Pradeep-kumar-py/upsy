'use client';

import React, { useState } from 'react';
import { 
  Search, Bell, Settings, User, LogOut, Menu, X,
  Home, Users, Award, Calendar, BookOpen, Target
} from 'lucide-react';
import Link from 'next/link';

interface DashboardNavbarProps {
  user?: {
    name: string;
    email: string;
  };
  onLogout?: () => void;
}

export default function DashboardNavbar({ user, onLogout }: DashboardNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigationItems = [
    { name: 'Internships', href: '/internships', icon: Target, color: 'text-green-600' },
    { name: 'Jobs', href: '/jobs', icon: Users, color: 'text-blue-600' },
    { name: 'Competitions', href: '/competitions', icon: Award, color: 'text-purple-600' },
    { name: 'Mentorships', href: '/mentorships', icon: BookOpen, color: 'text-orange-600' },
    { name: 'Practice', href: '/practice', icon: Calendar, color: 'text-red-600' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                upsy
              </div>
              <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 ml-2 rounded-full"></div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                <item.icon size={20} className={item.color} />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search Opportunities"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Host Button */}
            <button className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Calendar size={16} />
              Host
            </button>

            {/* For Business Button */}
            <button className="hidden md:flex items-center gap-2 border border-gray-300 hover:border-blue-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
              For Business
            </button>

            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <User size={16} />
                    Profile
                  </Link>
                  
                  <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings size={16} />
                    Settings
                  </Link>
                  
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <div className="px-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search Opportunities"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Mobile Navigation Items */}
            <div className="space-y-2 px-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon size={20} className={item.color} />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="mt-4 px-4 space-y-2">
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors">
                <Calendar size={16} />
                Host
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-blue-300 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors">
                For Business
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
