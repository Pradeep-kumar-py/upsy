'use client';

import React from 'react';
import { GraduationCap, CheckCircle } from 'lucide-react';
import SignupForm from '@/components/SignupForm';

export default function SignupPage() {
  const handleToggleMode = () => {
    window.location.href = '/auth/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-500 to-blue-600 items-center justify-center p-8">
        <div className="text-center text-white max-w-lg">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">upsy</h1>
            <div className="w-16 h-1 bg-white mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <GraduationCap size={40} className="text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Join Upsy</h2>
            <p className="text-white/90 text-lg">
              Unlock opportunities, learn, and apply for educational loans
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-4">
              <CheckCircle size={24} className="mx-auto mb-2" />
              <div>Secure Platform</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <CheckCircle size={24} className="mx-auto mb-2" />
              <div>Fast Approval</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 left-1/2 transform -translate-x-1/2">
          <h1 className="text-3xl font-bold text-gray-800">upsy</h1>
          <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full mt-2"></div>
        </div>

        <SignupForm onToggleMode={handleToggleMode} />
      </div>
    </div>
  );
}
