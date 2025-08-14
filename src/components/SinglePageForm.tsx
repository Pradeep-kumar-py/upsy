'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FormData, submitToDatabase, validateField } from '@/utils/formUtils';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  college?: string;
  purpose?: string;
}

const purposeOptions = [
  { value: 'course', label: '📚 Course' },
  { value: 'trip', label: '✈️ Trip' },
  { value: 'exchange', label: '🔄 Exchange' },
  { value: 'other', label: '💡 Other' }
];

const SinglePageForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    college: '',
    purpose: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const fields: (keyof FormData)[] = ['name', 'email', 'phone', 'college', 'purpose'];

    fields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitToDatabase(formData as FormData & { purpose: 'course' | 'trip' | 'exchange' | 'other' });
      setIsSubmitted(true);
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      college: '',
      purpose: ''
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmitError('');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-6xl mb-6">🎉</div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8 px-4">
                Your submission has been received successfully.
                <br />
                We'll get back to you soon!
              </p>
              <motion.button
                onClick={resetForm}
                className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Another Response
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Join Upsy Today
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Fill out the form below to get started with your journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-2"
              >
                <label htmlFor="name" className="block text-lg font-semibold text-gray-900">
                  What's your name? <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full text-lg md:text-xl p-3 md:p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                  aria-describedby={errors.name ? 'error-name' : undefined}
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm md:text-base font-medium"
                    id="error-name"
                    role="alert"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </motion.div>

              {/* Email and Phone Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-2"
                >
                  <label htmlFor="email" className="block text-lg font-semibold text-gray-900">
                    What's your email address? <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="w-full text-lg md:text-xl p-3 md:p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                    aria-describedby={errors.email ? 'error-email' : undefined}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm md:text-base font-medium"
                      id="error-email"
                      role="alert"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Phone Field */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-2"
                >
                  <label htmlFor="phone" className="block text-lg font-semibold text-gray-900">
                    What's your phone number? <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full text-lg md:text-xl p-3 md:p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                  />
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm md:text-base font-medium"
                      id="error-phone"
                      role="alert"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* College Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-2"
              >
                <label htmlFor="college" className="block text-lg font-semibold text-gray-900">
                  Which college do you attend? <span className="text-red-500">*</span>
                </label>
                <input
                  id="college"
                  type="text"
                  value={formData.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                  placeholder="Enter your college name"
                  className="w-full text-lg md:text-xl p-3 md:p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                  aria-describedby={errors.college ? 'error-college' : undefined}
                />
                {errors.college && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm md:text-base font-medium"
                    id="error-college"
                    role="alert"
                  >
                    {errors.college}
                  </motion.p>
                )}
              </motion.div>

              {/* Purpose Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-4"
              >
                <label className="block text-lg font-semibold text-gray-900">
                  What do you want Upsy for? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {purposeOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => handleInputChange('purpose', option.value)}
                      className={`p-3 md:p-4 text-left rounded-lg border-2 transition-all font-medium ${
                        formData.purpose === option.value
                          ? 'border-blue-600 bg-blue-50 text-blue-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    >
                      <span className="text-base md:text-lg">{option.label}</span>
                    </motion.button>
                  ))}
                </div>
                {errors.purpose && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-sm md:text-base font-medium"
                    role="alert"
                  >
                    {errors.purpose}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Error */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                >
                  {submitError}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="pt-4"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white text-lg md:text-xl font-semibold py-4 md:py-5 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Application'
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SinglePageForm;