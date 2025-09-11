'use client';

import React, { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { useAppSelector } from '@/store';
import ATSResumeTemplate from './ATSResumeTemplate';
import { FileText, Download, Eye, Code } from 'lucide-react';

const ResumePreview: React.FC = () => {
  const { resumeData } = useAppSelector((state) => state.resume);
  const [mounted, setMounted] = useState(false);
  const [previewMode, setPreviewMode] = useState<'pdf' | 'data'>('pdf');

  // Prevent SSR issues with react-pdf
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  const hasBasicInfo = resumeData.personalInfo.fullName && 
                      resumeData.personalInfo.email && 
                      resumeData.personalInfo.phone;

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
          
          {/* Preview Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setPreviewMode('pdf')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                previewMode === 'pdf' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>PDF View</span>
            </button>
            <button
              onClick={() => setPreviewMode('data')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors ${
                previewMode === 'data' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Data View</span>
            </button>
          </div>
        </div>

        {/* Download Button */}
        {hasBasicInfo && (
          <PDFDownloadLink
            document={<ATSResumeTemplate data={resumeData} />}
            fileName={`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {({ loading }) =>
              loading ? (
                <span>Preparing...</span>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </>
              )
            }
          </PDFDownloadLink>
        )}
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-6">
        {!hasBasicInfo ? (
          /* Empty State */
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <FileText className="w-16 h-16 mx-auto mb-6 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Start Building Your Resume
              </h3>
              <p className="text-gray-600 mb-6">
                Fill in your personal information to see a live preview of your professional resume.
                The preview will update in real-time as you add your details.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>✓ ATS-friendly formatting</p>
                <p>✓ Professional styling</p>
                <p>✓ Industry-standard layout</p>
              </div>
            </div>
          </div>
        ) : previewMode === 'pdf' ? (
          /* PDF Preview */
          <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <PDFViewer 
              style={{ width: '100%', height: '100%', border: 'none' }}
              showToolbar={false}
            >
              <ATSResumeTemplate data={resumeData} />
            </PDFViewer>
          </div>
        ) : (
          /* Data View for debugging */
          <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-full overflow-y-auto p-6">
              <h4 className="text-lg font-semibold mb-4 text-gray-900">Resume Data Structure</h4>
              <pre className="text-xs text-gray-700 bg-gray-50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(resumeData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      {hasBasicInfo && (
        <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-600">
            <span>Sections completed: {getCompletedSections(resumeData)}/7</span>
            <span>•</span>
            <span>ATS Score: {calculateATSScore(resumeData)}%</span>
            <span>•</span>
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${hasBasicInfo ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-gray-600">
              {hasBasicInfo ? 'Ready for export' : 'Missing required information'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
function getCompletedSections(data: any): number {
  let completed = 0;
  
  // Personal Info
  if (data.personalInfo.fullName && data.personalInfo.email && data.personalInfo.phone) {
    completed++;
  }
  
  // Summary
  if (data.summary && data.summary.trim().length > 0) {
    completed++;
  }
  
  // Experience
  if (data.workExperience.length > 0) {
    completed++;
  }
  
  // Education
  if (data.education.length > 0) {
    completed++;
  }
  
  // Skills
  if (data.skills.length > 0) {
    completed++;
  }
  
  // Projects
  if (data.projects.length > 0) {
    completed++;
  }
  
  // Certifications
  if (data.certifications.length > 0) {
    completed++;
  }
  
  return completed;
}

function calculateATSScore(data: any): number {
  let score = 0;
  let maxScore = 0;
  
  // Basic contact information (20 points)
  maxScore += 20;
  if (data.personalInfo.fullName) score += 5;
  if (data.personalInfo.email) score += 5;
  if (data.personalInfo.phone) score += 5;
  if (data.personalInfo.location) score += 5;
  
  // Professional summary (15 points)
  maxScore += 15;
  if (data.summary && data.summary.length >= 50 && data.summary.length <= 150) {
    score += 15;
  } else if (data.summary) {
    score += 7;
  }
  
  // Work experience (25 points)
  maxScore += 25;
  if (data.workExperience.length > 0) {
    score += 10;
    if (data.workExperience.some((exp: any) => exp.achievements.length > 0)) {
      score += 15;
    }
  }
  
  // Education (15 points)
  maxScore += 15;
  if (data.education.length > 0) {
    score += 15;
  }
  
  // Skills (15 points)
  maxScore += 15;
  if (data.skills.length >= 5) {
    score += 15;
  } else if (data.skills.length > 0) {
    score += Math.floor((data.skills.length / 5) * 15);
  }
  
  // Additional sections (10 points)
  maxScore += 10;
  if (data.projects.length > 0) score += 5;
  if (data.certifications.length > 0) score += 5;
  
  return Math.round((score / maxScore) * 100);
}

export default ResumePreview;
