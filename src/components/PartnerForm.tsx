'use client';

import React, { useState } from 'react';

interface Partner {
  name: string;
  logo: string;
  description: string;
  programs: string[];
  students: string;
  category: 'universities' | 'corporates' | 'platforms';
}

interface PartnerFormProps {
  onUploadSuccess: () => void;
}

const PartnerForm: React.FC<PartnerFormProps> = ({ onUploadSuccess }) => {
  const [formData, setFormData] = useState<Partner>({
    name: '',
    logo: '',
    description: '',
    programs: [],
    students: '',
    category: 'universities'
  });
  
  const [programInput, setProgramInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const categories = [
    { value: 'universities', label: 'University Partners' },
    { value: 'corporates', label: 'Corporate Partners' },
    { value: 'platforms', label: 'Learning Platform Partners' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addProgram = () => {
    if (programInput.trim() && !formData.programs.includes(programInput.trim())) {
      setFormData(prev => ({
        ...prev,
        programs: [...prev.programs, programInput.trim()]
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

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setSubmitMessage({ type: 'error', message: 'Partner name is required' });
      return false;
    }
    if (!formData.logo.trim()) {
      setSubmitMessage({ type: 'error', message: 'Logo URL is required' });
      return false;
    }
    if (!formData.description.trim()) {
      setSubmitMessage({ type: 'error', message: 'Description is required' });
      return false;
    }
    if (formData.programs.length === 0) {
      setSubmitMessage({ type: 'error', message: 'At least one program is required' });
      return false;
    }
    if (!formData.students.trim()) {
      setSubmitMessage({ type: 'error', message: 'Student count is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/partners/single', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({ type: 'success', message: 'Partner added successfully!' });
        setFormData({
          name: '',
          logo: '',
          description: '',
          programs: [],
          students: '',
          category: 'universities'
        });
        setProgramInput('');
        onUploadSuccess();
      } else {
        setSubmitMessage({ type: 'error', message: result.error || 'Failed to add partner' });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitMessage({ type: 'error', message: 'An error occurred while adding partner' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addProgram();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Partner</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Selection */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Partner Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Partner Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Partner Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Harvard University"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Logo URL */}
        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-2">
            Logo URL *
          </label>
          <input
            type="url"
            id="logo"
            name="logo"
            value={formData.logo}
            onChange={handleInputChange}
            placeholder="https://example.com/logo.png"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          {formData.logo && (
            <div className="mt-2">
              <img 
                src={formData.logo} 
                alt="Logo preview" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Brief description of the partner..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Programs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Programs *
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={programInput}
              onChange={(e) => setProgramInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter program name"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addProgram}
              className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          {formData.programs.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.programs.map((program, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {program}
                  <button
                    type="button"
                    onClick={() => removeProgram(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          {formData.programs.length === 0 && (
            <p className="text-sm text-gray-500">No programs added yet</p>
          )}
        </div>

        {/* Student Count */}
        <div>
          <label htmlFor="students" className="block text-sm font-medium text-gray-700 mb-2">
            Student Count *
          </label>
          <input
            type="text"
            id="students"
            name="students"
            value={formData.students}
            onChange={handleInputChange}
            placeholder="e.g., 2,500+"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {submitMessage && (
          <div className={`p-4 rounded-md ${
            submitMessage.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {submitMessage.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Adding Partner...' : 'Add Partner'}
        </button>
      </form>
    </div>
  );
};

export default PartnerForm;
