'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, Eye, AlertCircle } from 'lucide-react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { useAppSelector } from '@/store';
import ATSResumeTemplate from './preview/ATSResumeTemplate';

interface ResumePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumePreviewModal: React.FC<ResumePreviewModalProps> = ({ isOpen, onClose }) => {
  const { resumeData } = useAppSelector((state) => state.resume);
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Prevent SSR issues with react-pdf
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle modal animation states
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle animation end
  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  const hasBasicInfo = resumeData.personalInfo.fullName && 
                      resumeData.personalInfo.email && 
                      resumeData.personalInfo.phone;

  if (!mounted || (!isOpen && !isAnimating)) {
    return null;
  }

  const modalContent = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isOpen 
          ? 'bg-black bg-opacity-50 backdrop-blur-sm' 
          : 'bg-black bg-opacity-0 backdrop-blur-none'
      }`}
      onClick={onClose}
      onTransitionEnd={handleAnimationEnd}
    >
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-out ${
          isOpen 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Eye className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Resume Preview</h2>
              <p className="text-sm text-gray-600">Preview and download your professional resume</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Download Button */}
            {hasBasicInfo && (
              <PDFDownloadLink
                document={<ATSResumeTemplate data={resumeData} />}
                fileName={`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {({ loading }) =>
                  loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Preparing...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </>
                  )
                }
              </PDFDownloadLink>
            )}
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 h-full overflow-hidden">
          {!hasBasicInfo ? (
            /* Empty State */
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <AlertCircle className="w-16 h-16 mx-auto mb-6 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Complete Your Resume Information
                </h3>
                <p className="text-gray-600 mb-6">
                  Please fill in your basic information (name, email, and phone number) to generate and preview your resume.
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>✓ Personal Information Required</p>
                  <p>✓ Real-time PDF Generation</p>
                  <p>✓ Professional ATS-Friendly Format</p>
                </div>
              </div>
            </div>
          ) : (
            /* PDF Preview */
            <div className="h-full bg-gray-100">
              <div className="h-full rounded-lg overflow-hidden">
                <PDFViewer 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none',
                    borderRadius: '0.5rem'
                  }}
                  showToolbar={true}
                >
                  <ATSResumeTemplate data={resumeData} />
                </PDFViewer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at the end of body
  return createPortal(modalContent, document.body);
};

export default ResumePreviewModal;
