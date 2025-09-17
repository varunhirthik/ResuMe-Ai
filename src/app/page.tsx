'use client';

import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { setActiveSection } from '@/store/resumeSlice';
import ResumeBuilder from '@/components/ResumeBuilder';
import ResumePreviewModal from '@/components/ResumePreviewModal';
import { FileText, User, Briefcase, GraduationCap, Award, Code, Settings, Download, Eye } from 'lucide-react';

const sections = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Award },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'analyzer', label: 'Job Analyzer', icon: Settings },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const { activeSection, resumeData } = useAppSelector((state) => state.resume);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleSectionChange = (sectionId: string) => {
    dispatch(setActiveSection(sectionId));
  };

  const openPreviewModal = () => {
    setIsPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setIsPreviewModalOpen(false);
  };

  const hasBasicInfo = resumeData.personalInfo.fullName && 
                      resumeData.personalInfo.email && 
                      resumeData.personalInfo.phone;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Intelligent Resume Builder</h1>
              <p className="text-sm text-gray-600">ATS-Optimized • Professional • AI-Powered</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={openPreviewModal}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                hasBasicInfo 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              disabled={!hasBasicInfo}
            >
              <Eye className="w-4 h-4" />
              <span>Generate Resume</span>
            </button>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar Navigation */}
        <aside
          className={`bg-white border-r border-gray-200 transition-all duration-300 ${
            isSidebarCollapsed ? 'w-16' : 'w-80'
          }`}
        >
          <div className="p-4">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                    {!isSidebarCollapsed && (
                      <span className="font-medium">{section.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>
            
            {!isSidebarCollapsed && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">ATS Score</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                  </div>
                  <span className="text-sm font-medium text-blue-700">75%</span>
                </div>
                <p className="text-xs text-blue-600 mt-1">Good match for current job</p>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          {/* Form Section */}
          <div className="bg-white h-full">
            <div className="h-full overflow-y-auto p-6">
              <ResumeBuilder />
            </div>
          </div>
        </main>
      </div>

      {/* Resume Preview Modal */}
      <ResumePreviewModal 
        isOpen={isPreviewModalOpen} 
        onClose={closePreviewModal} 
      />
    </div>
  );
}
