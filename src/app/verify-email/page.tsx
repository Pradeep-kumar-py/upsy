"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Mail, ArrowRight } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!searchParams) return;

    const token = searchParams.get('token');
    const verified = searchParams.get('verified');
    const error = searchParams.get('error');

    if (verified === 'true') {
      setStatus('success');
      setMessage('Your email has been successfully verified! You can now log in to your account.');
      return;
    }

    if (error) {
      setStatus('error');
      switch (error) {
        case 'missing_token':
          setMessage('Verification token is missing. Please check your email for the correct link.');
          break;
        case 'invalid_token':
          setMessage('Invalid or expired verification token. Please request a new verification email.');
          break;
        case 'server_error':
          setMessage('Server error occurred. Please try again later.');
          break;
        default:
          setMessage('An error occurred during verification.');
      }
      return;
    }

    if (token) {
      verifyEmail(token);
    } else {
      setStatus('error');
      setMessage('Verification token is missing. Please check your email for the correct link.');
    }
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage(result.message);
      } else {
        setStatus('error');
        setMessage(result.error || 'Verification failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">upsy</h1>
            <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="mb-6">
            {status === 'loading' && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying your email...</h2>
                <p className="text-gray-600">Please wait while we verify your email address.</p>
              </div>
            )}

            {status === 'success' && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Email Verified!</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                
                <div className="space-y-3 w-full">
                  <a
                    href="/auth/login"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    Continue to Login
                    <ArrowRight size={20} />
                  </a>
                  <a
                    href="/"
                    className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center"
                  >
                    Go to Home
                  </a>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <XCircle size={32} className="text-red-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Verification Failed</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                
                <div className="space-y-3 w-full">
                  <a
                    href="/auth/signup"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    Sign Up Again
                    <ArrowRight size={20} />
                  </a>
                  <a
                    href="/auth/login"
                    className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center"
                  >
                    Try to Login
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Mail size={16} />
              <span>Check your email for verification instructions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
