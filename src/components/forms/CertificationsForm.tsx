'use client';

import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { addCertification, updateCertification, removeCertification } from '@/store/resumeSlice';
import { Certification } from '@/types/resume';
import { Award, Plus, Trash2, Calendar, ExternalLink } from 'lucide-react';

const CertificationsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { certifications } = useAppSelector((state) => state.resume.resumeData);

  const handleAddCertification = () => {
    dispatch(addCertification());
  };

  const handleUpdateCertification = (id: string, field: keyof Certification, value: any) => {
    dispatch(updateCertification({ id, data: { [field]: value } }));
  };

  const handleRemoveCertification = (id: string) => {
    dispatch(removeCertification(id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Award className="w-5 h-5 mr-2 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
        </div>
        <button
          onClick={handleAddCertification}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </button>
      </div>

      {/* Certification Items */}
      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={cert.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-semibold text-gray-900">
                Certification #{index + 1}
              </h4>
              <button
                onClick={() => handleRemoveCertification(cert.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certification Name *
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleUpdateCertification(cert.id, 'name', e.target.value)}
                  placeholder="AWS Certified Solutions Architect"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleUpdateCertification(cert.id, 'issuer', e.target.value)}
                  placeholder="Amazon Web Services"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Issue Date *
                </label>
                <input
                  type="month"
                  value={cert.dateIssued}
                  onChange={(e) => handleUpdateCertification(cert.id, 'dateIssued', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Expiration Date
                </label>
                <input
                  type="month"
                  value={cert.expirationDate || ''}
                  onChange={(e) => handleUpdateCertification(cert.id, 'expirationDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty if it doesn't expire</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credential ID
                </label>
                <input
                  type="text"
                  value={cert.credentialId || ''}
                  onChange={(e) => handleUpdateCertification(cert.id, 'credentialId', e.target.value)}
                  placeholder="ABC123DEF456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Verification URL
                </label>
                <input
                  type="url"
                  value={cert.url || ''}
                  onChange={(e) => handleUpdateCertification(cert.id, 'url', e.target.value)}
                  placeholder="https://verify.example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {certifications.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No certifications added</h3>
          <p className="text-gray-600 mb-4">Add your professional certifications to stand out.</p>
          <button
            onClick={handleAddCertification}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Certification
          </button>
        </div>
      )}

      {/* Tips Section */}
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="text-sm font-semibold text-yellow-900 mb-2">Certification Tips</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Include industry-relevant certifications only</li>
          <li>• List current certifications first</li>
          <li>• Include credential IDs for verification</li>
          <li>• Remove expired certifications unless still relevant</li>
          <li>• Popular certifications: AWS, Google Cloud, Microsoft, Cisco, PMP</li>
          <li>• Include technical certifications for IT roles</li>
        </ul>
      </div>
    </div>
  );
};

export default CertificationsForm;
