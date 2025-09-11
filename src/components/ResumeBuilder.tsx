'use client';

import React from 'react';
import { useAppSelector } from '@/store';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SummaryForm from './forms/SummaryForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import JobAnalyzer from './JobAnalyzer';

const ResumeBuilder: React.FC = () => {
  const { activeSection } = useAppSelector((state) => state.resume);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'summary':
        return <SummaryForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'certifications':
        return <CertificationsForm />;
      case 'analyzer':
        return <JobAnalyzer />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="w-full h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 capitalize mb-2">
          {activeSection === 'personal' ? 'Personal Information' : activeSection}
        </h2>
        <p className="text-sm text-gray-600">
          {getSectionDescription(activeSection)}
        </p>
      </div>
      
      <div className="space-y-6">
        {renderActiveSection()}
      </div>
    </div>
  );
};

function getSectionDescription(section: string): string {
  const descriptions = {
    personal: 'Enter your basic contact information and professional links.',
    summary: 'Write a compelling professional summary that highlights your key strengths.',
    experience: 'Add your work experience with quantifiable achievements.',
    education: 'List your educational background and academic achievements.',
    skills: 'Showcase your technical and soft skills relevant to your target role.',
    projects: 'Highlight key projects that demonstrate your capabilities.',
    certifications: 'Include professional certifications and licenses.',
    analyzer: 'Analyze job descriptions to optimize your resume for ATS systems.',
  };
  
  return descriptions[section as keyof typeof descriptions] || '';
}

export default ResumeBuilder;
