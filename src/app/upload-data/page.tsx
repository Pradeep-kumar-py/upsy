'use client';

import React, { useState } from 'react';
import SubmissionForm from '@/components/SubmissionForm';
import SubmissionsTable from '@/components/SubmissionsTable';

const UploadDataPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const handleSubmissionSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
    setShowForm(false); // Hide form after successful submission
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Upsy Registration</h1>
          <p className="text-gray-600">Submit your information and view all submissions</p>
        </div>
        
        <div className="flex justify-between items-center px-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Submissions Details</h2>
          <button
            className={`px-4 py-2 rounded transition-colors ${showForm ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            onClick={() => setShowForm(prev => !prev)}
          >
            {showForm ? 'Close Form' : 'Add Data'}
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <SubmissionForm onSubmissionSuccess={handleSubmissionSuccess} />
          </div>
        )}

        <SubmissionsTable refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default UploadDataPage;