'use client';

import React from 'react';
import { useAppSelector } from '@/store';
import { FileText, Download, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const SimpleResumePreview: React.FC = () => {
  const { resumeData } = useAppSelector((state) => state.resume);

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatDateRange = (startDate: string, endDate?: string, isCurrent?: boolean) => {
    const start = formatDate(startDate);
    if (isCurrent) {
      return `${start} - Present`;
    }
    const end = endDate ? formatDate(endDate) : '';
    return end ? `${start} - ${end}` : start;
  };

  const hasBasicInfo = resumeData.personalInfo.fullName && 
                      resumeData.personalInfo.email && 
                      resumeData.personalInfo.phone;

  const calculateATSScore = (): number => {
    let score = 0;
    let maxScore = 0;
    
    // Basic contact information (20 points)
    maxScore += 20;
    if (resumeData.personalInfo.fullName) score += 5;
    if (resumeData.personalInfo.email) score += 5;
    if (resumeData.personalInfo.phone) score += 5;
    if (resumeData.personalInfo.location) score += 5;
    
    // Professional summary (15 points)
    maxScore += 15;
    if (resumeData.summary && resumeData.summary.length >= 50 && resumeData.summary.length <= 150) {
      score += 15;
    } else if (resumeData.summary) {
      score += 7;
    }
    
    // Work experience (25 points)
    maxScore += 25;
    if (resumeData.workExperience.length > 0) {
      score += 10;
      if (resumeData.workExperience.some((exp) => exp.achievements.length > 0)) {
        score += 15;
      }
    }
    
    // Education (15 points)
    maxScore += 15;
    if (resumeData.education.length > 0) {
      score += 15;
    }
    
    // Skills (15 points)
    maxScore += 15;
    if (resumeData.skills.length >= 5) {
      score += 15;
    } else if (resumeData.skills.length > 0) {
      score += Math.floor((resumeData.skills.length / 5) * 15);
    }
    
    // Additional sections (10 points)
    maxScore += 10;
    if (resumeData.projects.length > 0) score += 5;
    if (resumeData.certifications.length > 0) score += 5;
    
    return Math.round((score / maxScore) * 100);
  };

  if (!hasBasicInfo) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
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
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
          <div className={`px-2 py-1 text-xs rounded-full ${
            calculateATSScore() >= 80 ? 'bg-green-100 text-green-800' :
            calculateATSScore() >= 60 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            ATS Score: {calculateATSScore()}%
          </div>
        </div>
        
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Print Resume</span>
        </button>
      </div>

      {/* Resume Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* A4 Paper Simulation */}
          <div className="w-full aspect-[8.5/11] p-12 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
            
            {/* Header */}
            <div className="text-center border-b-2 border-black pb-4 mb-6">
              <h1 className="text-2xl font-bold text-black mb-2">
                {resumeData.personalInfo.fullName}
              </h1>
              <div className="text-black space-y-1">
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3" />
                    <span>{resumeData.personalInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{resumeData.personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{resumeData.personalInfo.location}</span>
                  </div>
                </div>
                {(resumeData.personalInfo.linkedIn || resumeData.personalInfo.website || resumeData.personalInfo.github) && (
                  <div className="flex items-center justify-center space-x-4 text-xs">
                    {resumeData.personalInfo.linkedIn && (
                      <div className="flex items-center space-x-1">
                        <ExternalLink className="w-3 h-3" />
                        <span>{resumeData.personalInfo.linkedIn}</span>
                      </div>
                    )}
                    {resumeData.personalInfo.website && (
                      <div className="flex items-center space-x-1">
                        <ExternalLink className="w-3 h-3" />
                        <span>{resumeData.personalInfo.website}</span>
                      </div>
                    )}
                    {resumeData.personalInfo.github && (
                      <div className="flex items-center space-x-1">
                        <ExternalLink className="w-3 h-3" />
                        <span>{resumeData.personalInfo.github}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            {resumeData.summary && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-black uppercase border-b border-black mb-2">
                  Professional Summary
                </h2>
                <p className="text-black text-justify leading-relaxed">
                  {resumeData.summary}
                </p>
              </div>
            )}

            {/* Work Experience */}
            {resumeData.workExperience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-black uppercase border-b border-black mb-2">
                  Professional Experience
                </h2>
                {resumeData.workExperience.map((experience) => (
                  <div key={experience.id} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-black">{experience.jobTitle}</h3>
                        <p className="text-black">{experience.company}</p>
                      </div>
                      <div className="text-right text-black text-sm">
                        <p>{formatDateRange(experience.startDate, experience.endDate, experience.isCurrentRole)}</p>
                        {experience.location && <p>{experience.location}</p>}
                      </div>
                    </div>
                    {experience.description && (
                      <p className="text-black text-sm mb-2">{experience.description}</p>
                    )}
                    {experience.achievements.length > 0 && (
                      <ul className="list-none space-y-1 ml-4">
                        {experience.achievements.map((achievement, index) => (
                          <li key={index} className="text-black text-sm flex items-start">
                            <span className="mr-2">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-black uppercase border-b border-black mb-2">
                  Education
                </h2>
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-black">{edu.degree}</h3>
                        <p className="text-black">{edu.institution}</p>
                        {edu.gpa && <p className="text-black text-sm">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-right text-black text-sm">
                        <p>{formatDate(edu.graduationDate)}</p>
                        {edu.location && <p>{edu.location}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-black uppercase border-b border-black mb-2">
                  Technical Skills
                </h2>
                {['technical', 'soft', 'language', 'certification'].map((category) => {
                  const categorySkills = resumeData.skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  const categoryName = {
                    technical: 'Technical',
                    soft: 'Soft Skills',
                    language: 'Languages',
                    certification: 'Certifications'
                  }[category];

                  return (
                    <div key={category} className="mb-2">
                      <span className="font-bold text-black">{categoryName}: </span>
                      <span className="text-black">
                        {categorySkills.map(skill => skill.name).join(', ')}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Projects */}
            {resumeData.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-black uppercase border-b border-black mb-2">
                  Key Projects
                </h2>
                {resumeData.projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="mb-4">
                    <h3 className="font-bold text-black">{project.name}</h3>
                    <p className="text-black text-sm mb-1">{project.description}</p>
                    {project.technologies.length > 0 && (
                      <p className="text-black text-sm mb-1">
                        <span className="font-bold">Technologies: </span>
                        {project.technologies.join(', ')}
                      </p>
                    )}
                    {project.achievements.length > 0 && (
                      <ul className="list-none space-y-1 ml-4">
                        {project.achievements.map((achievement, index) => (
                          <li key={index} className="text-black text-sm flex items-start">
                            <span className="mr-2">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Certifications */}
            {resumeData.certifications.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-black uppercase border-b border-black mb-2">
                  Certifications
                </h2>
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-black">{cert.name}</h3>
                        <p className="text-black text-sm">{cert.issuer}</p>
                        {cert.credentialId && (
                          <p className="text-black text-xs">Credential ID: {cert.credentialId}</p>
                        )}
                      </div>
                      <div className="text-right text-black text-sm">
                        <p>
                          {formatDate(cert.dateIssued)}
                          {cert.expirationDate && ` - ${formatDate(cert.expirationDate)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4 text-gray-600">
          <span>Sections completed: {getCompletedSections()}/7</span>
          <span>•</span>
          <span>ATS Score: {calculateATSScore()}%</span>
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
    </div>
  );

  function getCompletedSections(): number {
    let completed = 0;
    
    if (resumeData.personalInfo.fullName && resumeData.personalInfo.email && resumeData.personalInfo.phone) {
      completed++;
    }
    if (resumeData.summary && resumeData.summary.trim().length > 0) {
      completed++;
    }
    if (resumeData.workExperience.length > 0) {
      completed++;
    }
    if (resumeData.education.length > 0) {
      completed++;
    }
    if (resumeData.skills.length > 0) {
      completed++;
    }
    if (resumeData.projects.length > 0) {
      completed++;
    }
    if (resumeData.certifications.length > 0) {
      completed++;
    }
    
    return completed;
  }
};

export default SimpleResumePreview;
