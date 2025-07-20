'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
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

  const totalSteps = 6; // 5 form steps + 1 success step

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    const steps = ['name', 'email', 'phone', 'college', 'purpose'] as const;
    const field = steps[step];

    if (field) {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    }

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

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 4) {
        // Last form step, submit the form
        handleSubmit();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitToDatabase(formData as FormData & { purpose: 'course' | 'trip' | 'exchange' | 'other' });
      setIsSubmitted(true);
      setCurrentStep(5); // Move to success step
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      e.preventDefault();
      handleNext();
    }
    if (e.key === 'Escape' && currentStep > 0) {
      e.preventDefault();
      handleBack();
    }
  };



  useEffect(() => {

    // Global keyboard listener for better UX
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === 'INPUT') return;

      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        if (currentStep < 5 && !isSubmitting) handleNext();
      }
      if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault();
        if (currentStep > 0) handleBack();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyPress);
    return () => document.removeEventListener('keydown', handleGlobalKeyPress);
  }, [currentStep, isSubmitting]);

  const renderProgressBar = () => {
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
      <div className="w-full max-w-md mx-auto mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {Math.min(currentStep + 1, 5)} of 5
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(Math.min(progress, 100))}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    );
  };

  const renderStep = () => {
    if (currentStep === 5) {
      return (
        <motion.div
          key="success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
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
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Another Response
          </motion.button>
        </motion.div>
      );
    }

    const steps = [
      {
        question: "What's your name?",
        placeholder: "Enter your full name",
        field: 'name' as keyof FormData,
        type: 'text'
      },
      {
        question: "What's your email address?",
        placeholder: "Enter your email",
        field: 'email' as keyof FormData,
        type: 'email'
      },
      {
        question: "What's your phone number?",
        placeholder: "Enter your phone number",
        field: 'phone' as keyof FormData,
        type: 'tel'
      },
      {
        question: "Which college do you attend?",
        placeholder: "Enter your college name",
        field: 'college' as keyof FormData,
        type: 'text'
      },
      {
        question: "What do you want Upsy for?",
        field: 'purpose' as keyof FormData,
        type: 'select'
      }
    ];

    const currentStepData = steps[currentStep];

    return (
      // <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg mx-auto"
      >
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
            {currentStepData.question}
          </h2>

          {currentStepData.type === 'select' ? (
            <div className="space-y-3 md:space-y-4">
              {purposeOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleInputChange('purpose', option.value)}
                  className={`w-full p-3 md:p-4 text-left rounded-lg border-2 transition-all ${formData.purpose === option.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-base md:text-lg font-medium">{option.label}</span>
                </motion.button>
              ))}
            </div>
          ) : (
            <input
              type={currentStepData.type}
              value={formData[currentStepData.field]}
              onChange={(e) => handleInputChange(currentStepData.field, e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentStepData.placeholder}
              className="w-full text-xl md:text-2xl p-3 md:p-4 border-b-2 border-gray-300 focus:border-blue-600 outline-none transition-colors bg-transparent"
              autoFocus
              aria-label={currentStepData.question}
              aria-describedby={errors[currentStepData.field] ? `error-${currentStepData.field}` : undefined}
            />
          )}

          {errors[currentStepData.field] && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 mt-4 font-medium text-sm md:text-base"
              id={`error-${currentStepData.field}`}
              role="alert"
            >
              {errors[currentStepData.field]}
            </motion.p>
          )}
        </div>
      </motion.div>
      // </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {currentStep < 5 && renderProgressBar()}

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 lg:p-12">
          {renderStep()}

          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
            >
              {submitError}
            </motion.div>
          )}

          {currentStep < 5 && (
            <div className="flex justify-between mt-8">
              <motion.button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`px-4 md:px-6 py-3 rounded-lg font-semibold transition-all ${currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
                whileHover={currentStep > 0 ? { scale: 1.02 } : {}}
                whileTap={currentStep > 0 ? { scale: 0.98 } : {}}
              >
                ← Back
              </motion.button>

              <motion.button
                onClick={handleNext}
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : currentStep === 4 ? 'Submit' : 'Next →'}
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
