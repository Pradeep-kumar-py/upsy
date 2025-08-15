'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { FaUniversity, FaBuilding, FaGraduationCap, FaUser, FaEnvelope, FaPhone, FaGlobe, FaUsers, FaHandshake, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

interface PartnerFormData {
  organizationName: string;
  organizationType: 'university' | 'corporate' | 'platform' | 'other';
  contactPersonName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  establishedYear: string;
  numberOfStudents: string;
  programs: string[];
  description: string;
  partnershipGoals: string;
  currentPartnerships: string;
  additionalInfo: string;
}

interface FormErrors {
  [key: string]: string;
}

const organizationTypes = [
  { value: 'university', label: 'University/Educational Institution', icon: FaUniversity },
  { value: 'corporate', label: 'Corporate/Company', icon: FaBuilding },
  { value: 'platform', label: 'Learning Platform', icon: FaGraduationCap },
  { value: 'other', label: 'Other', icon: FaHandshake }
];

const popularPrograms = [
  'Computer Science', 'Business Administration', 'Data Science', 'Engineering', 
  'Digital Marketing', 'Artificial Intelligence', 'Finance', 'Healthcare',
  'Design', 'Project Management', 'Cybersecurity', 'Cloud Computing'
];

export default function PartnerFormPage() {
  const [formData, setFormData] = useState<PartnerFormData>({
    organizationName: '',
    organizationType: 'university',
    contactPersonName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    establishedYear: '',
    numberOfStudents: '',
    programs: [],
    description: '',
    partnershipGoals: '',
    currentPartnerships: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [programInput, setProgramInput] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    }

    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = 'Contact person name is required';
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Organization description is required';
    }

    if (!formData.partnershipGoals.trim()) {
      newErrors.partnershipGoals = 'Partnership goals are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof PartnerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addProgram = (program: string) => {
    if (program.trim() && !formData.programs.includes(program.trim())) {
      setFormData(prev => ({
        ...prev,
        programs: [...prev.programs, program.trim()]
      }));
      setProgramInput('');
    }
  };

  const removeProgram = (index: number) => {
    setFormData(prev => ({
      ...prev,
      programs: prev.programs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/partners/partnership-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setSubmitError(result.error || 'Failed to submit partnership request');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitError('An error occurred while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      organizationName: '',
      organizationType: 'university',
      contactPersonName: '',
      contactEmail: '',
      contactPhone: '',
      website: '',
      establishedYear: '',
      numberOfStudents: '',
      programs: [],
      description: '',
      partnershipGoals: '',
      currentPartnerships: '',
      additionalInfo: ''
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmitError('');
    setProgramInput('');
  };

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheckCircle className="text-4xl text-green-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Partnership Request Submitted!</h2>
                <p className="text-lg md:text-xl text-gray-600 mb-8 px-4">
                  Thank you for your interest in partnering with Upsy.
                  <br />
                  Our partnership team will review your application and get back to you within 2-3 business days.
                </p>
                <div className="space-y-4">
                  <motion.button
                    onClick={resetForm}
                    className="w-full sm:w-auto bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mr-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Another Request
                  </motion.button>
                  <Link 
                    href="/partners"
                    className="inline-block w-full sm:w-auto bg-gray-100 text-gray-700 px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    View Our Partners
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <Link 
                href="/partners"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
              >
                <FaArrowLeft className="mr-2" />
                Back to Partners
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Partner with Upsy
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Join our network of world-class educational institutions and help us make quality education accessible to students across India.
              </p>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Organization Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">Organization Information</h2>
                  
                  {/* Organization Name */}
                  <div className="space-y-2">
                    <label htmlFor="organizationName" className="block text-lg font-semibold text-gray-900">
                      Organization Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="organizationName"
                      type="text"
                      value={formData.organizationName}
                      onChange={(e) => handleInputChange('organizationName', e.target.value)}
                      placeholder="Enter your organization name"
                      className="w-full text-lg p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                    />
                    {errors.organizationName && (
                      <p className="text-red-600 text-sm font-medium">{errors.organizationName}</p>
                    )}
                  </div>

                  {/* Organization Type */}
                  <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-900">
                      Organization Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {organizationTypes.map((type) => (
                        <label
                          key={type.value}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.organizationType === type.value
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="organizationType"
                            value={type.value}
                            checked={formData.organizationType === type.value}
                            onChange={(e) => handleInputChange('organizationType', e.target.value)}
                            className="sr-only"
                          />
                          <type.icon className="text-2xl text-blue-600 mr-3" />
                          <span className="font-medium">{type.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Grid for smaller fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Website */}
                    <div className="space-y-2">
                      <label htmlFor="website" className="block text-lg font-semibold text-gray-900">
                        Website
                      </label>
                      <div className="relative">
                        <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://your-website.com"
                          className="w-full text-lg p-4 pl-12 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                        />
                      </div>
                    </div>

                    {/* Established Year */}
                    <div className="space-y-2">
                      <label htmlFor="establishedYear" className="block text-lg font-semibold text-gray-900">
                        Established Year
                      </label>
                      <input
                        id="establishedYear"
                        type="number"
                        min="1800"
                        max="2024"
                        value={formData.establishedYear}
                        onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                        placeholder="e.g., 1990"
                        className="w-full text-lg p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Number of Students */}
                  <div className="space-y-2">
                    <label htmlFor="numberOfStudents" className="block text-lg font-semibold text-gray-900">
                      Number of Students/Employees
                    </label>
                    <div className="relative">
                      <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="numberOfStudents"
                        type="text"
                        value={formData.numberOfStudents}
                        onChange={(e) => handleInputChange('numberOfStudents', e.target.value)}
                        placeholder="e.g., 5,000+ or 500-1000"
                        className="w-full text-lg p-4 pl-12 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label htmlFor="description" className="block text-lg font-semibold text-gray-900">
                      Organization Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your organization, its mission, and key offerings..."
                      rows={4}
                      className="w-full text-lg p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                    />
                    {errors.description && (
                      <p className="text-red-600 text-sm font-medium">{errors.description}</p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Contact Person Name */}
                    <div className="space-y-2">
                      <label htmlFor="contactPersonName" className="block text-lg font-semibold text-gray-900">
                        Contact Person <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="contactPersonName"
                          type="text"
                          value={formData.contactPersonName}
                          onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                          placeholder="Full name"
                          className="w-full text-lg p-4 pl-12 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                        />
                      </div>
                      {errors.contactPersonName && (
                        <p className="text-red-600 text-sm font-medium">{errors.contactPersonName}</p>
                      )}
                    </div>

                    {/* Contact Email */}
                    <div className="space-y-2">
                      <label htmlFor="contactEmail" className="block text-lg font-semibold text-gray-900">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="contactEmail"
                          type="email"
                          value={formData.contactEmail}
                          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                          placeholder="contact@organization.com"
                          className="w-full text-lg p-4 pl-12 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                        />
                      </div>
                      {errors.contactEmail && (
                        <p className="text-red-600 text-sm font-medium">{errors.contactEmail}</p>
                      )}
                    </div>

                    {/* Contact Phone */}
                    <div className="space-y-2">
                      <label htmlFor="contactPhone" className="block text-lg font-semibold text-gray-900">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          id="contactPhone"
                          type="tel"
                          value={formData.contactPhone}
                          onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                          placeholder="+91 12345 67890"
                          className="w-full text-lg p-4 pl-12 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                        />
                      </div>
                      {errors.contactPhone && (
                        <p className="text-red-600 text-sm font-medium">{errors.contactPhone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Programs/Services */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">Programs & Services</h2>
                  
                  {/* Popular Programs */}
                  <div className="space-y-2">
                    <label className="block text-lg font-semibold text-gray-900">
                      Select Popular Programs
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {popularPrograms.map((program) => (
                        <button
                          key={program}
                          type="button"
                          onClick={() => addProgram(program)}
                          disabled={formData.programs.includes(program)}
                          className={`p-3 text-sm rounded-lg border transition-all ${
                            formData.programs.includes(program)
                              ? 'bg-blue-100 border-blue-300 text-blue-700 cursor-not-allowed'
                              : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {program}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Program Input */}
                  <div className="space-y-2">
                    <label htmlFor="programInput" className="block text-lg font-semibold text-gray-900">
                      Add Custom Program
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="programInput"
                        type="text"
                        value={programInput}
                        onChange={(e) => setProgramInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProgram(programInput))}
                        placeholder="Enter program name"
                        className="flex-1 text-lg p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => addProgram(programInput)}
                        className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Selected Programs */}
                  {formData.programs.length > 0 && (
                    <div className="space-y-2">
                      <label className="block text-lg font-semibold text-gray-900">
                        Selected Programs ({formData.programs.length})
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {formData.programs.map((program, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium"
                          >
                            {program}
                            <button
                              type="button"
                              onClick={() => removeProgram(index)}
                              className="ml-2 text-blue-600 hover:text-blue-800 text-lg"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Partnership Details */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">Partnership Details</h2>
                  
                  {/* Partnership Goals */}
                  <div className="space-y-2">
                    <label htmlFor="partnershipGoals" className="block text-lg font-semibold text-gray-900">
                      Partnership Goals <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="partnershipGoals"
                      value={formData.partnershipGoals}
                      onChange={(e) => handleInputChange('partnershipGoals', e.target.value)}
                      placeholder="What do you hope to achieve through this partnership? How can we work together to benefit students?"
                      rows={4}
                      className="w-full text-lg p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                    />
                    {errors.partnershipGoals && (
                      <p className="text-red-600 text-sm font-medium">{errors.partnershipGoals}</p>
                    )}
                  </div>

                  {/* Current Partnerships */}
                  <div className="space-y-2">
                    <label htmlFor="currentPartnerships" className="block text-lg font-semibold text-gray-900">
                      Current Educational Partnerships
                    </label>
                    <textarea
                      id="currentPartnerships"
                      value={formData.currentPartnerships}
                      onChange={(e) => handleInputChange('currentPartnerships', e.target.value)}
                      placeholder="Tell us about your existing partnerships with other educational institutions or platforms..."
                      rows={3}
                      className="w-full text-lg p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                    />
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-2">
                    <label htmlFor="additionalInfo" className="block text-lg font-semibold text-gray-900">
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                      placeholder="Any additional information you'd like to share about your organization or partnership expectations..."
                      rows={3}
                      className="w-full text-lg p-4 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none transition-colors bg-transparent hover:border-gray-300"
                    />
                  </div>
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
                    {submitError}
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting Partnership Request...
                      </span>
                    ) : (
                      'Submit Partnership Request'
                    )}
                  </motion.button>
                </div>

                <div className="text-center text-gray-600">
                  <p className="text-sm">
                    By submitting this form, you agree to our partnership terms and conditions.
                    Our team will review your application and respond within 2-3 business days.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
