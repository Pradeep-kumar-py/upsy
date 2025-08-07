'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import PartnerForm from '@/components/PartnerForm';
import PartnersTable from '@/components/PartnersTable';

const UploadPartnerDataPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const handlePartnerAdded = () => {
    setRefreshTrigger(prev => prev + 1);
    setShowForm(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Partner Management</h1>
            <p className="text-gray-600">Add new partners and manage existing partner information</p>
          </div>
          
          <div className="flex justify-between items-center px-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Partners</h2>
            <button
              className={`px-4 py-2 rounded transition-colors ${
                showForm 
                  ? 'bg-gray-500 hover:bg-gray-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
              onClick={() => setShowForm(prev => !prev)}
            >
              {showForm ? 'Close Form' : 'Add New Partner'}
            </button>
          </div>

          {showForm && (
            <div className="mb-8">
              <PartnerForm onUploadSuccess={handlePartnerAdded} />
            </div>
          )}

          <PartnersTable refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </>
  );
};

export default UploadPartnerDataPage;
