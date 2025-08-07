'use client';

import React, { useEffect, useState } from 'react';

interface Partner {
  _id?: string;
  name: string;
  logo: string;
  description: string;
  programs: string[];
  students: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PartnerCategory {
  title: string;
  description: string;
  partners: Partner[];
}

interface PartnerCategories {
  universities?: PartnerCategory;
  corporates?: PartnerCategory;
  platforms?: PartnerCategory;
}

interface PartnersTableProps {
  refreshTrigger: number;
}

const PartnersTable: React.FC<PartnersTableProps> = ({ refreshTrigger }) => {
  const [partnerData, setPartnerData] = useState<PartnerCategories>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'universities' | 'corporates' | 'platforms'>('universities');

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/partners');
      const result = await response.json();

      if (response.ok) {
        setPartnerData(result.data || {});
      } else {
        setError(result.error || 'Failed to fetch partner data');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('An error occurred while fetching partner data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [refreshTrigger]);

  const getTabData = () => {
    return partnerData[activeTab];
  };

  const getTotalPartners = () => {
    return Object.values(partnerData).reduce((total, category) => {
      return total + (category?.partners?.length || 0);
    }, 0);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error</p>
          <p>{error}</p>
          <button
            onClick={fetchPartners}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const tabData = getTabData();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Partner Categories Data</h2>
          <div className="text-sm text-gray-600">
            Total Partners: <span className="font-semibold">{getTotalPartners()}</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {(['universities', 'corporates', 'platforms'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === category
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                {partnerData[category]?.partners?.length || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {tabData ? (
          <>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{tabData.title}</h3>
              <p className="text-gray-600">{tabData.description}</p>
            </div>

            {tabData.partners && tabData.partners.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tabData.partners.map((partner, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg mr-3">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'w-8 h-8 bg-blue-100 rounded flex items-center justify-center';
                            fallback.innerHTML = `<span class="text-blue-600 font-bold text-sm">${partner.name.charAt(0)}</span>`;
                            target.parentNode?.appendChild(fallback);
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{partner.name}</h4>
                        <p className="text-sm text-gray-600">{partner.students} students</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{partner.description}</p>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700">Programs:</p>
                      <div className="flex flex-wrap gap-1">
                        {partner.programs.slice(0, 3).map((program, i) => (
                          <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {program}
                          </span>
                        ))}
                        {partner.programs.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            +{partner.programs.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <p>No partners found in this category.</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No data available for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnersTable;
